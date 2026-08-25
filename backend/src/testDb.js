import prisma from "./config/prisma.js";

const users = await prisma.user.findMany();

console.log(users);

await prisma.$disconnect();
