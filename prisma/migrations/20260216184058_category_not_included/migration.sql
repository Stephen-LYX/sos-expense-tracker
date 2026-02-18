/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Budget` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_categoryId_fkey";

-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "categoryId";
