/*
  Warnings:

  - You are about to drop the column `pageId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `siteId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `siteId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `sitePageDataId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `hasAnalytics` on the `PaymentPlan` table. All the data in the column will be lost.
  - You are about to drop the column `hasCookies` on the `PaymentPlan` table. All the data in the column will be lost.
  - You are about to drop the column `hasCustomDomain` on the `PaymentPlan` table. All the data in the column will be lost.
  - You are about to drop the column `maxUploadSize` on the `PaymentPlan` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfPages` on the `PaymentPlan` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfSites` on the `PaymentPlan` table. All the data in the column will be lost.
  - You are about to drop the column `showBuiltWith` on the `PaymentPlan` table. All the data in the column will be lost.
  - You are about to drop the column `versionHistoryDuration` on the `PaymentPlan` table. All the data in the column will be lost.
  - You are about to drop the column `componentId` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `sitePageDataId` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `sitePageSchemaId` on the `SitePageData` table. All the data in the column will be lost.
  - You are about to drop the column `componentId` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paymentPlanId` on the `User` table. All the data in the column will be lost.
  - Added the required column `site_id` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `site_page_data_id` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `component_id` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `site_page_data_id` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `site_page_schema_id` to the `SitePageData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `component_id` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_pageId_fkey";

-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_siteId_fkey";

-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_userId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_siteId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_sitePageDataId_fkey";

-- DropForeignKey
ALTER TABLE "Site" DROP CONSTRAINT "Site_componentId_fkey";

-- DropForeignKey
ALTER TABLE "Site" DROP CONSTRAINT "Site_sitePageDataId_fkey";

-- DropForeignKey
ALTER TABLE "Site" DROP CONSTRAINT "Site_userId_fkey";

-- DropForeignKey
ALTER TABLE "SitePageData" DROP CONSTRAINT "SitePageData_sitePageSchemaId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_componentId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_paymentPlanId_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "pageId",
DROP COLUMN "siteId",
DROP COLUMN "userId",
ADD COLUMN     "page_id" TEXT,
ADD COLUMN     "site_id" TEXT,
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "published",
DROP COLUMN "siteId",
DROP COLUMN "sitePageDataId",
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "site_id" TEXT NOT NULL,
ADD COLUMN     "site_page_data_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentPlan" DROP COLUMN "hasAnalytics",
DROP COLUMN "hasCookies",
DROP COLUMN "hasCustomDomain",
DROP COLUMN "maxUploadSize",
DROP COLUMN "numberOfPages",
DROP COLUMN "numberOfSites",
DROP COLUMN "showBuiltWith",
DROP COLUMN "versionHistoryDuration",
ADD COLUMN     "has_custom_domain" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "max_upload_size" INTEGER,
ADD COLUMN     "number_of_pages" INTEGER,
ADD COLUMN     "number_of_sites" INTEGER;

-- AlterTable
ALTER TABLE "Site" DROP COLUMN "componentId",
DROP COLUMN "published",
DROP COLUMN "sitePageDataId",
DROP COLUMN "userId",
ADD COLUMN     "component_id" TEXT NOT NULL,
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "site_page_data_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SitePageData" DROP COLUMN "sitePageSchemaId",
ADD COLUMN     "site_page_schema_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "componentId",
ADD COLUMN     "component_id" TEXT NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
DROP COLUMN "paymentPlanId",
ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "payment_plan_id" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_payment_plan_id_fkey" FOREIGN KEY ("payment_plan_id") REFERENCES "PaymentPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_site_page_data_id_fkey" FOREIGN KEY ("site_page_data_id") REFERENCES "SitePageData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_site_page_data_id_fkey" FOREIGN KEY ("site_page_data_id") REFERENCES "SitePageData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SitePageData" ADD CONSTRAINT "SitePageData_site_page_schema_id_fkey" FOREIGN KEY ("site_page_schema_id") REFERENCES "SitePageSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
