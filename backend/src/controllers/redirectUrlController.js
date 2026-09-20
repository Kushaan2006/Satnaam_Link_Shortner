import { getOriginalUrl } from "../services/getOriginalUrl.js";

export const redirectUrl = async (req, res) => {
  try {
    const { shortLink } = req.params;
    const { password } = req.body;
    if (!shortLink?.trim()) {
      return res.status(400).json({ message: "ShortLink is missing" });
    }
    const originalUrl = await getOriginalUrl(shortLink, password);
    if (!originalUrl) {
      return res.status(404).json({ message: "Short URL not found ;-;" });
    }

    if (!originalUrl.passwordProtected) {
      console.log(`${shortLink} - REDIRECT PASSED!`);
    } else {
      console.log(
        `${shortLink} - Password protected, sent request for password`,
      );
    }

    return res.status(200).json(originalUrl);
  } catch (error) {
    console.log(`ERROR REDIRECTING: ${error}`);

    if (error.message === "Wrong Password") {
      return res.status(400).json({ message: error.message });
    }
    res
      .status(error.message === "URL Expired" ? 410 : 500)
      .json({ message: error.message ? error.message : "Redirect Failed" });
  }
};
