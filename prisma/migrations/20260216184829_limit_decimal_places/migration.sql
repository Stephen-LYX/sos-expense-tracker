/*
  Warnings:

  - You are about to alter the column `amountLimit` on the `Budget` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `spent` on the `Budget` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Budget" ALTER COLUMN "amountLimit" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "spent" SET DATA TYPE DECIMAL(10,2);
