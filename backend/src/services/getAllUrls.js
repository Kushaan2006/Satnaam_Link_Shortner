import prisma from "../config/prisma.js";

export const getAllUrls = async (userId) => {
  const urls = await prisma.url.findMany({
    where: {
      userId: userId,
    },
    include: {
      click: true,
    },
  });
  return urls.map((url) => ({
    id: url.id,
    url: url.url,
    shortUrl: url.shortUrl,
    dateTime: url.dateTime,
    totalClicks: url.click.reduce((sum, day) => sum + day.clicks, 0),
  }));
};
