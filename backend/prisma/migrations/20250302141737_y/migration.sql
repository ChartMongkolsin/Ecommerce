/*
  Warnings:

  - You are about to drop the column `cartItemId` on the `cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `cart_cartItemId_fkey`;

-- DropIndex
DROP INDEX `cart_cartItemId_fkey` ON `cart`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `cartItemId`;

-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `cartId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `cartitem` ADD CONSTRAINT `cartitem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
