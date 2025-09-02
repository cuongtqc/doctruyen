import { db } from "@/lib/db";

// Function to increment chapter views
async function incrementChapterViews(chapterId) {
  const chapter = await db.chapter.update({
    where: { id: chapterId },
    data: {
      views: {
        increment: 1,
      },
    },
  });
  return chapter;
}
