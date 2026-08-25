import prisma from "../config/prisma.js";

export const recordClick = async (id) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  await prisma.clicks.upsert({
    where: {
      urlId_date: {
        urlId: id,
        date: today,
      },
    },
    update: {
      clicks: {
        increment: 1,
      },
    },
    create: {
      urlId: id,
      date: today,
      clicks: 1,
    },
  });
};
