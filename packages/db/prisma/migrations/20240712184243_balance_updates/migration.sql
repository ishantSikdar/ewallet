/*
  Warnings:

  - You are about to drop the column `amount` on the `Balance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "amount",
ADD COLUMN     "reason" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "totalBalance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "transactionAmt" INTEGER NOT NULL DEFAULT 0;
