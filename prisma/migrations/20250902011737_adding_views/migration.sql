-- AlterTable
ALTER TABLE "public"."Chapter" ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Story" ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
