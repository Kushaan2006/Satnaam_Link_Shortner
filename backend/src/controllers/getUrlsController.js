import { getAllUrls } from "../services/getAllUrls.js";

export const getUrlsController = async (req, res) => {
  try {
    const urls = await getAllUrls(1);
    return res.status(200).json(urls);
  } catch (error) {
    console.error("Failed to fetch URLs: ", error);
    return res.status(500).json({
      message: "Failed to fetch urls",
    });
  }
};
