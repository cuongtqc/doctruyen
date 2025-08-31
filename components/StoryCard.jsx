"use client";

import { truncateText } from "@/lib/util";
import { useRouter } from "next/navigation";

export const StoryCard = ({ story }) => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/story/${story.slug}`);
  };
  return (
    <div className="bg-stone-800 rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-300 transform-gpu cursor-pointer group flex flex-col h-full relative">
      {/* Story Cover Image */}
      <div className="relative w-full h-48 sm:h-64 overflow-hidden">
        <img
          src={story.coverImage}
          alt={`Cover of ${story.title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* You could add a gradient or overlay here */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-50"></div> */}
      </div>

      {/* Story Details */}
      <div className="p-4 flex-1 flex flex-col h-full max-h-full">
        <h3
          className="text-md sm:text-sm font-bold text-white mb-2 leading-tight"
          title={story.title}
        >
          {truncateText(story.title, 34)}
        </h3>
        {/* <p className="text-sm sm:text-base text-stone-400 mb-3 leading-tight">
          By {story.author}
        </p> */}
        <p className="text-sm text-stone-300 flex-1 mb-4 leading-tight">
          {truncateText(story.synopsis, 60)}
        </p>
        <div className="mt-auto">
          <a
            onClick={handleNavigate}
            href="#"
            className="inline-block bg-white text-stone-900 font-semibold py-0 px-2 rounded-full text-sm hover:bg-stone-200 transition-colors duration-200"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};
