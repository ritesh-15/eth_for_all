/*
  Warnings:

  - You are about to alter the column `description` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `LongText`.

*/
-- AlterTable
ALTER TABLE `movie` MODIFY `description` LONGTEXT NOT NULL;
