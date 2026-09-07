import prisma from "../config/prisma.js";
import { generateUniqueShortCode } from "../utils/generateShortCode.js";

export const createShortUrl = async (url, custom, userId) => {
  const trimmedCustom = custom?.trim();

  let customUrlExists;

  if (trimmedCustom) {
    customUrlExists = await prisma.url.findUnique({
      where: {
        shortUrl: trimmedCustom,
      },
    });
  }

  if (trimmedCustom && customUrlExists)
    throw new Error("The short link already exists");

  const shortCode = trimmedCustom
    ? trimmedCustom
    : await generateUniqueShortCode();

  return await prisma.url.create({
    data: {
      url: url,
      shortUrl: shortCode,
      userId: userId,
    },
  });
};
