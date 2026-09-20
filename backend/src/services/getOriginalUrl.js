import prisma from "../config/prisma.js";
import redis from "../config/redis.js";
import bcrypt from "bcrypt";
import { recordClick } from "./recordClick.js";

export const getOriginalUrl = async (shortLink, password) => {
  const cacheKey = `url:${shortLink}`;
  const cachedUrl = await redis.get(cacheKey);

  if (cachedUrl) {
    if (cachedUrl.passwordHash) {
      console.log(`${cachedUrl.id} - url is password protected`);
      if (!password) {
        console.log(`${cachedUrl.id} - password req sent`);

        return {
          passwordProtected: true,
        };
      }
      const passCheck = await bcrypt.compare(
        password.trim(),
        cachedUrl.passwordHash,
      );

      console.log(`${cachedUrl.id} - password recieved`);

      if (!passCheck) {
        console.log(`${cachedUrl.id} - Wrong password`);

        throw Error("Wrong Password");
      }
    }

    recordClick(cachedUrl.id).catch(console.error);
    console.log(`${cachedUrl.id} click recorded, redirecting`);
    return { passwordProtected: false, url: cachedUrl.url };
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

  if (url.passwordHash) {
    if (!password) {
      return {
        passwordProtected: true,
      };
    }
    const checkPass = await bcrypt.compare(password.trim(), url.passwordHash);
    if (!checkPass) {
      throw new Error("Wrong Password");
    }
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
      passwordHash: url.passwordHash,
    },
    {
      ex: cacheTtl,
    },
  );

  recordClick(url.id).catch(console.error);

  return {
    passwordProtected: false,
    url: url.url,
  };
};
