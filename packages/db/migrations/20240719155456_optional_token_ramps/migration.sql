-- AlterTable
ALTER TABLE "OffRampTransaction" ALTER COLUMN "token" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "token" DROP NOT NULL;
