import prisma from "../config/prisma.js";

export async function generateUniqueShortCode() {
  while (true) {
    const code = Math.random().toString(36).substring(2, 9);

    const existingUrl = await prisma.url.findUnique({
      where: { shortUrl: code },
    });

    if (!existingUrl) return code;
  }
}
