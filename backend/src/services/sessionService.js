import redis from "../config/redis.js";

import {
  generateRefreshToken,
  hashRefreshToken,
} from "../utils/generateTokens.js";

const SESSION_EXPIRY = 60 * 60 * 24 * 30;
export const createSession = async (userId) => {
  const refreshToken = generateRefreshToken();
  const tokenHash = hashRefreshToken(refreshToken);
  await redis.set(`session:${tokenHash}`, userId, {
    ex: SESSION_EXPIRY,
  });
  return refreshToken;
};

export const getSession = async (refreshToken) => {
  const tokenHash = hashRefreshToken(refreshToken);

  return await redis.get(`session:${tokenHash}`);
};

export const deleteSession = async (refreshToken) => {
  const tokenHash = hashRefreshToken(refreshToken);

  await redis.del(`session:${tokenHash}`);
};
