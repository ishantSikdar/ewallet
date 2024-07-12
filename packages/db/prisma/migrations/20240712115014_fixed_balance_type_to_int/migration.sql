/*
  Warnings:

  - You are about to alter the column `amount` on the `Balance` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `amount` on the `OnRampTransaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "amount" SET DATA TYPE INTEGER;
