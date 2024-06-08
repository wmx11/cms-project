/*
  Warnings:

  - You are about to drop the column `payment_plan_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `PaymentPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UsagePlanName" AS ENUM ('early', 'free', 'basic', 'pro');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_payment_plan_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "payment_plan_id",
ADD COLUMN     "usage_plan_id" TEXT;

-- DropTable
DROP TABLE "PaymentPlan";

-- DropEnum
DROP TYPE "PaymentPlanName";

-- CreateTable
CREATE TABLE "UsagePlan" (
    "id" TEXT NOT NULL,
    "name" "UsagePlanName" NOT NULL,
    "price" INTEGER,
    "has_custom_domain" BOOLEAN NOT NULL DEFAULT false,
    "number_of_sites" INTEGER,
    "number_of_pages" INTEGER,
    "max_upload_size" INTEGER,
    "days_save_history" INTEGER,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsagePlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsagePlan_name_key" ON "UsagePlan"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_usage_plan_id_fkey" FOREIGN KEY ("usage_plan_id") REFERENCES "UsagePlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
