/*
  Warnings:

  - Changed the type of `status` on the `OffRampTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `OnRampTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RampStatus" AS ENUM ('Pending', 'Success', 'Failure');

-- AlterTable
ALTER TABLE "OffRampTransaction" DROP COLUMN "status",
ADD COLUMN     "status" "RampStatus" NOT NULL;

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "status",
ADD COLUMN     "status" "RampStatus" NOT NULL;

-- DropEnum
DROP TYPE "OnRampStatus";
