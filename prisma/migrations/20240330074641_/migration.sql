-- AlterTable
ALTER TABLE `EmegencyAlert` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `EmergencyReponse` ADD COLUMN `description` TEXT NULL,
    MODIFY `complete` BOOLEAN NOT NULL DEFAULT false;
