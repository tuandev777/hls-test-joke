-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postlocale" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "postId" INTEGER NOT NULL,
    "languageKey" TEXT NOT NULL,

    CONSTRAINT "postlocale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action" (
    "id" SERIAL NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,
    "dislike" INTEGER NOT NULL DEFAULT 0,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "postlocale_slug_key" ON "postlocale"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "postlocale_languageKey_postId_key" ON "postlocale"("languageKey", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "action_postId_key" ON "action"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "language_key_key" ON "language"("key");

-- AddForeignKey
ALTER TABLE "postlocale" ADD CONSTRAINT "postlocale_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postlocale" ADD CONSTRAINT "postlocale_languageKey_fkey" FOREIGN KEY ("languageKey") REFERENCES "language"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action" ADD CONSTRAINT "action_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
