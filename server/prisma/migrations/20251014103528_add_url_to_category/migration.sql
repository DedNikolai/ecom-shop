/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Category_url_key" ON "public"."Category"("url");
