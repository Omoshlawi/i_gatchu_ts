-- DropForeignKey
ALTER TABLE `EmegencyAlert` DROP FOREIGN KEY `EmegencyAlert_supportServiceId_fkey`;

-- AlterTable
ALTER TABLE `EmegencyAlert` MODIFY `supportServiceId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `EmegencyAlert` ADD CONSTRAINT `EmegencyAlert_supportServiceId_fkey` FOREIGN KEY (`supportServiceId`) REFERENCES `SupportService`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
