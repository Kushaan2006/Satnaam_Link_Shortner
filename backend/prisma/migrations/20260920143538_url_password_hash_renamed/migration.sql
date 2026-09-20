/*
  Warnings:
 // dev note: we renaming it
  - You are about to drop the column `password` on the `Url` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Url"
RENAME COLUMN "password" TO "passwordHash"; --we renaming it manually
