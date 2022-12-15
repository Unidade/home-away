/*
  Warnings:

  - You are about to drop the `_favoritesHomes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_favoritesHomes" DROP CONSTRAINT "_favoritesHomes_A_fkey";

-- DropForeignKey
ALTER TABLE "_favoritesHomes" DROP CONSTRAINT "_favoritesHomes_B_fkey";

-- DropTable
DROP TABLE "_favoritesHomes";

-- CreateTable
CREATE TABLE "_FavoritesHomes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesHomes_AB_unique" ON "_FavoritesHomes"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesHomes_B_index" ON "_FavoritesHomes"("B");

-- AddForeignKey
ALTER TABLE "_FavoritesHomes" ADD CONSTRAINT "_FavoritesHomes_A_fkey" FOREIGN KEY ("A") REFERENCES "Home"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesHomes" ADD CONSTRAINT "_FavoritesHomes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
