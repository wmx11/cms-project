/*
  Warnings:

  - You are about to drop the column `published` on the `Template` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Component" ALTER COLUMN "schema" SET DEFAULT '[]';

-- AlterTable
ALTER TABLE "SitePageSchema" ALTER COLUMN "schema" SET DEFAULT '[]',
ALTER COLUMN "styles_schema" SET DEFAULT '[]';

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "published",
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "schema" SET DEFAULT '[]',
ALTER COLUMN "styles_schema" SET DEFAULT '[]';
