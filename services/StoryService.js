import { db } from "@/lib/db";

// Function to increment chapter views
export async function incrementStoryViews(storySlug) {
  const story = await db.story.update({
    where: { slug: storySlug },
    data: {
      views: {
        increment: 1,
      },
    },
  });
  return story;
}
