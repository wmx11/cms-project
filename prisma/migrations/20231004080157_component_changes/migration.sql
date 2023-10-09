/*
  Warnings:

  - You are about to drop the column `props` on the `Component` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Component" DROP COLUMN "props",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "schema" JSONB;
