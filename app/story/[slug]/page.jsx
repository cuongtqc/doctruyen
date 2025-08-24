// /app/story/[slug]/page.jsx
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

/**
 * @param {{ params: { slug: string } }} props
 * @returns {Promise<import('next').Metadata>}
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await db.story.findUnique({ where: { slug } });
  if (!story) {
    return { title: "Not Found" };
  }
  return {
    title: story.title,
    description: story.synopsis.substring(0, 160),
  };
}

async function getStory(slug) {
  const story = await db.story.findUnique({
    where: { slug },
    include: {
      chapters: {
        orderBy: { chapterNumber: "asc" },
        select: { chapterNumber: true, title: true },
      },
    },
  });

  if (!story) {
    notFound();
  }
  return story;
}

export default async function StoryDetailPage({ params }) {
  const { slug } = await params;
  const story = await getStory(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row gap-8 mb-8">
        <img
          src={story.coverImage || "/placeholder.png"}
          alt={story.title}
          className="w-48 h-auto object-cover rounded-md"
        />
        <div>
          <h1 className="text-4xl font-bold">{story.title}</h1>
          <p className="text-xl text-muted-foreground">{story.author}</p>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Synopsis</h2>
        <p className="text-muted-foreground">{story.synopsis}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Chapters</h2>
        <ul>
          {story.chapters.map((chap) => (
            <li key={chap.chapterNumber}>
              <a
                href={`/story/${story.slug}/${chap.chapterNumber}`}
                className="block p-2 hover:bg-muted rounded"
              >
                Chapter {chap.chapterNumber}: {chap.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
