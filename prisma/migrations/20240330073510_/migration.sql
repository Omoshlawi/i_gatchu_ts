/*
  Warnings:

  - You are about to drop the column `status` on the `EmegencyAlert` table. All the data in the column will be lost.
  - You are about to drop the column `responseStatus` on the `EmergencyReponse` table. All the data in the column will be lost.
  - Added the required column `images` to the `EmegencyAlert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complete` to the `EmergencyReponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `EmergencyReponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `SupportService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `EmegencyAlert` DROP COLUMN `status`,
    ADD COLUMN `images` JSON NOT NULL;

-- AlterTable
ALTER TABLE `EmergencyReponse` DROP COLUMN `responseStatus`,
    ADD COLUMN `complete` BOOLEAN NOT NULL,
    ADD COLUMN `images` JSON NOT NULL;

-- AlterTable
ALTER TABLE `SupportService` ADD COLUMN `image` VARCHAR(191) NOT NULL;
