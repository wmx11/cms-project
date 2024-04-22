-- DropForeignKey
ALTER TABLE "SitePageData" DROP CONSTRAINT "SitePageData_site_page_schema_id_fkey";

-- AddForeignKey
ALTER TABLE "SitePageData" ADD CONSTRAINT "SitePageData_site_page_schema_id_fkey" FOREIGN KEY ("site_page_schema_id") REFERENCES "SitePageSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
