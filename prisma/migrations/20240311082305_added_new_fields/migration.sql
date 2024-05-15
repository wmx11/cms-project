/*
  Warnings:

  - Added the required column `name` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;
