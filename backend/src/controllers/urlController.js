import { createShortUrl } from "../services/urlService.js";

export const createUrl = async (req, res) => {
  try {
    const { url, custom, expiry, hasPassword, password } = req.body;
    if (!url || !url.trim()) {
      return res.status(400).json({
        message: "URL is missing",
      });
    }

    let expiryDate = null;

    if (expiry) {
      expiryDate = new Date(expiry);

      if (Number.isNaN(expiryDate.getTime())) {
        return res.status(400).json({
          message: "Invalid expiry date",
        });
      }

      if (expiryDate <= new Date()) {
        return res.status(400).json({
          message: "Please enter a date in future",
        });
      }
    }

    if (hasPassword && !password) {
      return res.status(400).json({
        message: "No password detected",
      });
    }

    const result = await createShortUrl(
      url,
      custom,
      req.user.id,
      expiryDate,
      password,
    );
    console.log(custom?.trim() ? `Created custom URL` : `Short URL created`);
    res.status(201).json(result);
  } catch (error) {
    console.log(`URL creation failed: ${error}`);
    res.status(500).json({
      message: error.message ? error.message : "Failed to create URL",
    });
  }
};

export const testUrlRoute = (req, res) => {
  res.status(200).json({ message: "URL router works" });
};
