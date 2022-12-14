-- CreateTable
CREATE TABLE "_favoritesHomes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favoritesHomes_AB_unique" ON "_favoritesHomes"("A", "B");

-- CreateIndex
CREATE INDEX "_favoritesHomes_B_index" ON "_favoritesHomes"("B");

-- AddForeignKey
ALTER TABLE "_favoritesHomes" ADD CONSTRAINT "_favoritesHomes_A_fkey" FOREIGN KEY ("A") REFERENCES "Home"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoritesHomes" ADD CONSTRAINT "_favoritesHomes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
