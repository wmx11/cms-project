/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Template` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Template_name_key";

-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Component" ALTER COLUMN "component" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Template_slug_key" ON "Template"("slug");
