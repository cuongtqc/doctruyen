import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { StoryChapter } from "@/components/StoryChapter";

async function getChapter({ storySlug, chapterNumber }) {
  const story = await db.story.findUnique({
    where: { slug: storySlug },
  });

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

  const nextChapter = await db.chapter.findUnique({
    where: {
      storyId_chapterNumber: {
        storyId: story.id,
        chapterNumber: +chapterNumber + 1,
      },
    },
  });

  if (!chapter) {
    notFound();
  }
  return { story, chapter, nextChapter };
}

const ChapterReaderPage = async ({ params }) => {
  const { slug, chapter: chapterNumber } = await params;
  const {
    story,
    chapter: currentChapter,
    nextChapter,
  } = await getChapter({
    storySlug: slug,
    chapterNumber,
  });

  return (
    <StoryChapter
      story={story}
      currentChapter={currentChapter}
      nextChapter={nextChapter}
    />
  );
};

export default ChapterReaderPage;
