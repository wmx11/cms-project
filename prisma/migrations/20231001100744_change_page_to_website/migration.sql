/*
  Warnings:

  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_profile_id_fkey";

-- DropTable
DROP TABLE "Page";

-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,
    "icon" TEXT,
    "schema" JSONB,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Website_alias_key" ON "Website"("alias");

-- CreateIndex
CREATE INDEX "Website_alias_idx" ON "Website"("alias");

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
