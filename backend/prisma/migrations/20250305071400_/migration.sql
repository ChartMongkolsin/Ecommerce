/*
  Warnings:

  - You are about to drop the column `qty` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `deliveredAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `isDelivered` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddress` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the column `countInStock` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `numReview` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `product` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `cartitem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderStatus` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceTotal` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `orderitem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `orderitem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `qty`,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `deliveredAt`,
    DROP COLUMN `isDelivered`,
    DROP COLUMN `isPaid`,
    DROP COLUMN `name`,
    DROP COLUMN `paidAt`,
    DROP COLUMN `shippingAddress`,
    ADD COLUMN `orderStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `priceTotal` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `name`,
    DROP COLUMN `qty`,
    ADD COLUMN `productId` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `countInStock`,
    DROP COLUMN `numReview`,
    DROP COLUMN `rating`,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
