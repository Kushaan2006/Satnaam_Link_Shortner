import { getAnalysis } from "../services/getAnalysis.js";
import prisma from "../config/prisma.js";

export const getAnalytics = async (req, res) => {
  try {
    const urlId = Number(req.params.id);
    const url = await prisma.url.findFirst({
      where: {
        id: urlId,
        userId: req.user.id,
      },
    });

    if (!url) {
      return res.status(403).json({ message: "Forbidden Access" });
    }
    const analytics = await getAnalysis(urlId);
    res.status(200).json(analytics);
  } catch (error) {
    console.error(`Could not get analytics: ${error}`);
    res.status(500).json({ message: "Could not get analytics" });
  }
};
