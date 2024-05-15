/*
  Warnings:

  - You are about to drop the column `siteAssetId` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the `SiteAsset` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[domain]` on the table `Site` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `componentId` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('image', 'video', 'font');

-- DropForeignKey
ALTER TABLE "Site" DROP CONSTRAINT "Site_siteAssetId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_paymentPlanId_fkey";

-- AlterTable
ALTER TABLE "Site" DROP COLUMN "siteAssetId";

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "componentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "paymentPlanId" DROP NOT NULL;

-- DropTable
DROP TABLE "SiteAsset";

-- DropEnum
DROP TYPE "SiteAssetType";

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "AssetType" NOT NULL,
    "size" INTEGER NOT NULL,
    "userId" TEXT,
    "siteId" TEXT,
    "pageId" TEXT,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Component_alias_idx" ON "Component"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Site_domain_key" ON "Site"("domain");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_paymentPlanId_fkey" FOREIGN KEY ("paymentPlanId") REFERENCES "PaymentPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
