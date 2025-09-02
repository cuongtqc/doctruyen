"use client";

import { displayTextDialog, truncateText, decodeHtml } from "@/lib/util";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const StoryCard = ({ story }) => {
  const router = useRouter();
  const [decodedContent, setDecodedContent] = useState({
    title: "",
    synopsis: "",
  });

  const handleNavigate = () => {
    router.push(`/story/${story.slug}`);
  };

  useEffect(() => {
    setDecodedContent({
      title: displayTextDialog(decodeHtml(story.title)),
      synopsis: displayTextDialog(decodeHtml(story.synopsis)),
    });
  }, []);
  return (
    <div
      onClick={handleNavigate}
      className="bg-stone-800/90 rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-300 transform-gpu cursor-pointer group flex flex-col h-full relative"
    >
      {/* Story Cover Image */}
      <div className="relative w-full h-40 sm:h-48 overflow-hidden">
        <img
          src={story.coverImage}
          alt={`Cover of ${story.title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* You could add a gradient or overlay here */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-50"></div> */}
      </div>

      {/* Story Details */}
      <div className="p-2 sm:p-4 flex-1 flex flex-col h-full max-h-full">
        <h3
          className="text-xs sm:text-sm font-bold text-white mb-2 leading-tight"
          title={decodedContent.title}
        >
          {truncateText(decodedContent.title, 34)}
        </h3>
        {/* <p className="text-sm sm:text-base text-stone-400 mb-3 leading-tight">
          By {story.author}
        </p> */}
        <p className="text-xs sm:text-sm text-stone-300 flex-1 mb-4 leading-tight">
          {truncateText(decodedContent.synopsis, 72)}
        </p>
      </div>
    </div>
  );
};
