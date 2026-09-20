import { getOriginalUrl } from "../services/getOriginalUrl.js";

export const redirectUrl = async (req, res) => {
  try {
    const { shortLink } = req.params;
    if (!shortLink?.trim()) {
      return res.status(400).json({ message: "ShortLink is missing" });
    }
    const originalUrl = await getOriginalUrl(shortLink);
    if (!originalUrl) {
      return res.status(404).json({ message: "Short URL not found ;-;" });
    }
    console.log(`${shortLink} - REDIRECT PASSED!`);
    return res.status(200).json({ url: originalUrl });
  } catch (error) {
    console.log(`ERROR REDIRECTING: ${error}`);
    res
      .status(error.message === "URL Expired" ? 410 : 500)
      .json({ message: error.message ? error.message : "Redirect Failed" });
  }
};
