/*
  Warnings:

  - Added the required column `color` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('GREEN', 'BLUE', 'YELLOW', 'PURPLE', 'CYAN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "color" "Color" NOT NULL;
