import { createShortUrl } from "../services/urlService.js";

export const createUrl = async (req, res) => {
  try {
    const { url, custom } = req.body;
    const result = await createShortUrl(url, custom);
    console.log(custom?.trim() ? `Created custom URL` : `Short URL created`);
    res.status(201).json(result);
  } catch (error) {
    console.log(`URL creation failed: ${error}`);
    res.status(500).json({ message: "Failed to create URL" });
  }
};

export const testUrlRoute = (req, res) => {
  res.status(200).json({ message: "URL router works" });
};
