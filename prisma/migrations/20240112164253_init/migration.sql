-- CreateTable
CREATE TABLE "MyFavoriteList" (
    "id" TEXT NOT NULL,
    "ceatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MyFavoriteList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MyFavorite" (
    "id" TEXT NOT NULL,
    "ceatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "myFavoriteListId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "MyFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "ceatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lable" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MyFavorite" ADD CONSTRAINT "MyFavorite_myFavoriteListId_fkey" FOREIGN KEY ("myFavoriteListId") REFERENCES "MyFavoriteList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyFavorite" ADD CONSTRAINT "MyFavorite_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
