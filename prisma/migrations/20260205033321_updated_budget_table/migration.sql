/*
  Warnings:

  - Added the required column `title` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "spent" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "title" TEXT NOT NULL;
