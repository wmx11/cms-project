-- AlterEnum
ALTER TYPE "AssetType" ADD VALUE 'thumbnail';

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "description" TEXT;
