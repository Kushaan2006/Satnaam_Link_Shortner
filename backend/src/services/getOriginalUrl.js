import prisma from "../config/prisma.js";
import redis from "../config/redis.js";
import { recordClick } from "./recordClick.js";

export const getOriginalUrl = async (shortLink) => {
  const cacheKey = `url:${shortLink}`;
  const cachedUrl = await redis.get(cacheKey);

  if (cachedUrl) {
    recordClick(cachedUrl.id).catch(console.error);
    return cachedUrl.url;
  }

  const url = await prisma.url.findUnique({
    where: {
      shortUrl: shortLink,
    },
  });

  if (!url) return null;

  if (url.expiresAt && new Date() >= url.expiresAt) {
    throw new Error("URL Expired");
  }

  let cacheTtl = 60 * 60 * 6;

  if (url.expiresAt) {
    const secondsUntilExpiry = Math.floor(
      (url.expiresAt.getTime() - Date.now()) / 1000,
    );

    cacheTtl = Math.min(cacheTtl, secondsUntilExpiry);
  }

  await redis.set(
    cacheKey,
    {
      id: url.id,
      url: url.url,
    },
    {
      ex: cacheTtl,
    },
  );

  recordClick(url.id).catch(console.error);

  return url?.url;
};
