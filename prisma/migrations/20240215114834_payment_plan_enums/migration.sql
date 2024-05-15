/*
  Warnings:

  - Changed the type of `name` on the `PaymentPlan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentPlanName" AS ENUM ('early', 'free', 'basic', 'pro');

-- AlterTable
ALTER TABLE "PaymentPlan" DROP COLUMN "name",
ADD COLUMN     "name" "PaymentPlanName" NOT NULL;
