import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { StoryChapter } from "@/components/StoryChapter";

async function getChapter({ storySlug, chapterNumber }) {
  const story = await db.story.findUnique({
    where: { slug: storySlug },
  });

  console.log("@== story", story);

  if (!story) {
    notFound();
  }

  const chapter = await db.chapter.findUnique({
    where: {
      storyId_chapterNumber: {
        storyId: story.id,
        chapterNumber: +chapterNumber,
      },
    },
  });

  if (!chapter) {
    notFound();
  }
  return { story, chapter };
}

const ChapterReaderPage = async ({ params }) => {
  const { slug, chapter: chapterNumber } = await params;
  const { story, chapter: currentChapter } = await getChapter({
    storySlug: slug,
    chapterNumber,
  });

  return (
    <StoryChapter
      story={story}
      currentChapter={currentChapter}
      initialChapterNumber={1}
    />
  );
};

export default ChapterReaderPage;
