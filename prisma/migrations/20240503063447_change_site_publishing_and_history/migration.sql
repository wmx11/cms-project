/*
  Warnings:

  - You are about to drop the column `is_published` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `is_published` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `site_page_schema_id` on the `SitePageData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[published_site_page_schema_id]` on the table `SitePageData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SitePageData" DROP CONSTRAINT "SitePageData_site_page_schema_id_fkey";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "is_published";

-- AlterTable
ALTER TABLE "Site" DROP COLUMN "is_published";

-- AlterTable
ALTER TABLE "SitePageData" DROP COLUMN "site_page_schema_id",
ADD COLUMN     "published_site_page_schema_id" TEXT;

-- AlterTable
ALTER TABLE "SitePageSchema" ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "site_page_data_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "SitePageData_published_site_page_schema_id_key" ON "SitePageData"("published_site_page_schema_id");

-- AddForeignKey
ALTER TABLE "SitePageData" ADD CONSTRAINT "SitePageData_published_site_page_schema_id_fkey" FOREIGN KEY ("published_site_page_schema_id") REFERENCES "SitePageSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SitePageSchema" ADD CONSTRAINT "SitePageSchema_site_page_data_id_fkey" FOREIGN KEY ("site_page_data_id") REFERENCES "SitePageData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
