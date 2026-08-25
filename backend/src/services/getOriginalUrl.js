import prisma from "../config/prisma.js";
import { recordClick } from "./recordClick.js";
export const getOriginalUrl = async (shortLink) => {
  const url = await prisma.url.findUnique({
    where: {
      shortUrl: shortLink,
    },
  });

  if (url) recordClick(url.id);

  return url?.url;
};
