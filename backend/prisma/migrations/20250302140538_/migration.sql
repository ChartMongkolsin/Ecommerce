/*
  Warnings:

  - You are about to drop the column `image` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `cartitem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `cart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `image`,
    DROP COLUMN `name`,
    DROP COLUMN `price`;

-- AlterTable
ALTER TABLE `product` MODIFY `rating` DOUBLE NULL,
    MODIFY `numReview` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `cart_userId_key` ON `cart`(`userId`);
