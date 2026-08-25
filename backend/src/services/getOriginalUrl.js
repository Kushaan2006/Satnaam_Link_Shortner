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

  await redis.set(
    cacheKey,
    {
      id: url.id,
      url: url.url,
    },
    {
      ex: 60 * 60 * 6,
    },
  );

  recordClick(url.id).catch(console.error);

  return url?.url;
};
