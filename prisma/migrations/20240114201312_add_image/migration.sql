-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "originalname" TEXT,
    "mimetype" TEXT,
    "size" INTEGER NOT NULL,
    "buffer" BYTEA NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");
