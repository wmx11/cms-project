/*
  Warnings:

  - A unique constraint covering the columns `[template_id]` on the table `Site` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "template_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Site_template_id_key" ON "Site"("template_id");

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;
