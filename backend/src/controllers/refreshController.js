import { getSession } from "../services/sessionService.js";
import { generateAccessToken } from "../utils/generateTokens.js";
import prisma from "../config/prisma.js";

export const refreshController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        message: "No refresh session",
      });
    }
    const userId = await getSession(refreshToken);
    if (!userId) {
      return res.status(401).json({
        message: "Invalid or Session Expired",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const accessToken = generateAccessToken(Number(userId));

    return res.status(200).json({
      accessToken,
      user,
    });
  } catch (error) {
    console.error(`Refresh failed - ${error}`);
    return res.status(500).json({
      message: "Could not refresh the session",
    });
  }
};
