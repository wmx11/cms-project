/*
  Warnings:

  - A unique constraint covering the columns `[working_site_page_schema_id]` on the table `SitePageData` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SitePageData" ADD COLUMN     "working_site_page_schema_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "SitePageData_working_site_page_schema_id_key" ON "SitePageData"("working_site_page_schema_id");

-- AddForeignKey
ALTER TABLE "SitePageData" ADD CONSTRAINT "SitePageData_working_site_page_schema_id_fkey" FOREIGN KEY ("working_site_page_schema_id") REFERENCES "SitePageSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
