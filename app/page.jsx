// /app/page.jsx
import { db } from "@/lib/db";
import { StoryCard } from "@/components/StoryCard";

// Dummy fetching functions - implement real logic here
/** @returns {Promise<import('@prisma/client').Story[]>} */
async function getTrendingStories() {
  return db.story.findMany({
    where: { status: { not: "DRAFT" } },
    take: 10,
    orderBy: { updatedAt: "desc" },
  });
}
/** @returns {Promise<import('@prisma/client').Story[]>} */
async function getHighestRatedStories() {
  return db.story.findMany({
    where: { status: { not: "DRAFT" } },
    take: 10,
    orderBy: { createdAt: "desc" },
  });
}

export default async function HomePage() {
  const [trending, highestRated] = await Promise.all([
    getTrendingStories(),
    getHighestRatedStories(),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* <section className="mb-12">
        <h1 className="text-4xl font-bold">Welcome to NovelNest</h1>
      </section> */}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Nổi bật</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 xl:grid-cols-7 gap-4">
          {trending.map((story) => (
            <StoryCard key={`trending-${story.id}`} story={story} /> // Replace with <StoryCard />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Đánh giá cao</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 xl:grid-cols-7 gap-4">
          {highestRated.map((story) => (
            <StoryCard key={`rated-${story.id}`} story={story} /> // Replace with <StoryCard />
          ))}
        </div>
      </section>
    </main>
  );
}

export const revalidate = 3600;
