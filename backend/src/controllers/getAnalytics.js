import { getAnalysis } from "../services/getAnalysis.js";

export const getAnalytics = async (req, res) => {
  try {
    const analytics = await getAnalysis(Number(req.params.id));
    res.status(200).json(analytics);
  } catch (error) {
    console.error(`Could not get analytics: ${error}`);
    res.status(500).json({ message: "Could not get analytics" });
  }
};
