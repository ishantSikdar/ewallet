-- AlterEnum
ALTER TYPE "AuthType" ADD VALUE 'Credentials';

-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "auth_type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authProvider" "AuthType";
