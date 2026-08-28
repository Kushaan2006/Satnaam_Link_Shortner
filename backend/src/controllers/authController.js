import { userLogin, userSignUp } from "../services/authService.js";
import { createSession, deleteSession } from "../services/sessionService.js";
import { generateAccessToken } from "../utils/generateTokens.js";

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await userSignUp(name, email, password);
    return res.status(201).json(result);
  } catch (error) {
    console.error(`Signup Failed ;-; - ${error}`);
    return res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userLogin(email, password);
    const accessToken = generateAccessToken(Number(result.user.id));
    const refreshToken = await createSession(Number(result.user.id));
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    return res.status(200).json({
      ...result,
      accessToken,
    });
  } catch (error) {
    console.error(`Login Failed ;-; - ${error}`);
    return res.status(400).json({ message: error.message });
  }
};

export const logoutController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) await deleteSession(refreshToken);
    res.clearCookie("refreshToken");
    return res.status(200).json({
      message: "Logged Out",
    });
  } catch (error) {
    console.error(`Logout Failed -_- ${error}`);
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};
