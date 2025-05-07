/*
  Warnings:

  - You are about to drop the column `image` on the `orderitem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `cartitem_productId_fkey`;

-- DropIndex
DROP INDEX `cartitem_productId_key` ON `cartitem`;

-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `image`;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
