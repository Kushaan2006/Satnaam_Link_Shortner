import prisma from "../config/prisma.js";
import { generateUniqueShortCode } from "../utils/generateShortCode.js";

export const createShortUrl = async (url, custom) => {
  const shortCode = custom?.trim()
    ? custom.trim()
    : await generateUniqueShortCode();
  return await prisma.url.create({
    data: {
      url: url,
      shortUrl: shortCode,
      userId: 1,
    },
  });
};
