export const getAnalysis = async (urlId) => {
  const analytics = await prisma.clicks.findMany({
    where: {
      urlId,
    },
    orderBy: {
      date: "asc",
    },
  });
  return analytics;
};
