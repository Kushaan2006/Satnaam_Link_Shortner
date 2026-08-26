import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateTokens.js";
export const userSignUp = async (name, email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const passHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      passwordHash: passHash,
      loginType: "EMAIL",
    },
  });

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const userLogin = async (email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) throw new Error("User Doesnt Exist");

  if (existingUser.loginType !== "EMAIL") {
    throw new Error(`Please proceed with ${existingUser.loginType} Login`);
  }

  const proceed = await bcrypt.compare(password, existingUser.passwordHash);

  if (!proceed) throw new Error("Wrong Password");

  const token = generateToken(existingUser.id);

  return {
    user: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    },
    token,
  };
};
