"use client";

import { decodeHtml, displayTextDialog } from "@/lib/util";
import { useEffect, useState } from "react";

export const StoryContent = ({ content, fontSize }) => {
  const [decodedContent, setDecodedContent] = useState();
  useEffect(() => {
    setDecodedContent(displayTextDialog(decodeHtml(content)));
  }, []);
  return (
    <div
      className="leading-relaxed whitespace-pre-wrap text-stone-200"
      style={{ fontSize: `${fontSize}px` }}
    >
      {decodedContent}
    </div>
  );
};
