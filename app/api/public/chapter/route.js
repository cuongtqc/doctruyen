import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const chapterId = searchParams.get("chapterId");

  if (!chapterId) {
    return NextResponse.json(
      { error: "Missing chapterId query parameter" },
      { status: 400 }
    );
  }

  try {
    const chapter = await db.chapter.findUnique({
      where: { id: chapterId },
      select: {
        id: true,
        storyId: true,
        chapterNumber: true,
        title: true,
        translatedContent: true,
      },
    });

    return NextResponse.json({ chapter });
  } catch (error) {
    console.error("Error fetching chapter by ID:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
