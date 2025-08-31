// /lib/actions/importer.js
"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import * as cheerio from "cheerio";
import { translateText } from "@/lib/translation/translateText.js";
import { convertString } from "@/lib/util";

// Updated schema to accept a book ID URL
const ImportSchema = z.object({
  url: z.string().url({
    message:
      "Please enter a valid book URL, e.g., https://www.69shu.tw/book/21.html",
  }),
});

/**
 * @param {FormData} formData
 */
export async function importStory(formData) {
  // const session = await auth();
  // // @ts-ignore
  // if (session?.user?.role !== 'ADMIN') {
  //   return { error: 'Unauthorized' };
  // }

  const validatedFields = ImportSchema.safeParse({
    url: formData.get("url"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid URL provided." };
  }

  const { url } = validatedFields.data;

  // Extract the book ID from the URL (e.g., from 'https://www.69shu.tw/book/21.html')
  const bookIdMatch = url.match(/\/book\/(\d+)\.html$/);
  if (!bookIdMatch) {
    return { error: "URL must be a valid book page URL with a numeric ID." };
  }
  const bookId = bookIdMatch[1];

  // Construct the URL for the chapter list page
  const chapterListUrl = `https://www.69shu.tw/book/${bookId}/`;

  // Define selectors based on the new structure
  const selectors = {
    bookTitle: ".novel_info_title h1",
    bookSynopsis: "#info .intro",
    chapterLink: "#ul_all_chapters li a",
    chapterContent: "#article",
    coverImage: ".novel_info_main img",
  };

  try {
    // Fetch the book page to get the title and synopsis
    const bookResponse = await fetch(url);
    const bookHtml = await bookResponse.text();
    const $ = cheerio.load(bookHtml);

    const title = $(selectors.bookTitle).text().trim();
    const synopsis = $(selectors.bookSynopsis).text().trim();
    const coverImage = $(selectors.coverImage).attr("src");

    if (!title || !synopsis) {
      return {
        error: "Failed to extract story title or synopsis from the book page.",
      };
    }

    // Fetch the chapter list page
    const chapterListResponse = await fetch(chapterListUrl);
    const chapterListHtml = await chapterListResponse.text();
    const $$ = cheerio.load(chapterListHtml);

    const chapterLinks = [];
    $$(selectors.chapterLink).each((_, el) => {
      chapterLinks.push({
        href: new URL($$(el).attr("href"), chapterListUrl).toString(),
        text: $$(el).text(),
      });
    });

    if (chapterLinks.length === 0) {
      return { error: "Failed to extract chapter list." };
    }

    // Check if a story with this providerStoryId already exists
    const existingStory = await db.story.findFirst({
      where: {
        providerStoryId: bookId,
      },
    });

    // --- Translation and Database Operations (as in the original function) ---
    const [translatedTitle, translatedSynopsis] = await Promise.all([
      translateText(title),
      translateText(synopsis),
    ]);

    // If the story exists, return a message and skip the import process
    let story;
    if (!existingStory) {
      story = await db.story.create({
        data: {
          title: translatedTitle,
          coverImage: coverImage,
          providerStoryId: bookId,
          providerUrl: url,
          synopsis: translatedSynopsis,
          slug: convertString(translatedTitle),
          status: "DRAFT",
          genres: [],
        },
      });
    } else {
      story = existingStory;
    }

    const existingChapters = await db.chapter.findMany({
      where: {
        providerStoryId: bookId,
      },
      select: {
        providerChapterId: true,
      },
    });

    // Convert the result to a Set for efficient lookup
    const processedChapterIds = new Set(
      existingChapters.map((chap) => chap.providerChapterId)
    );

    for (let i = 0; i < chapterLinks.length; i++) {
      // NOTICE: ONLY LOOP 10 CHAPTERS FOR NOW
      if (i === 10) break;

      const link = chapterLinks[i];
      const providerChapterId = extractChapterFromUrl(link.href);

      // Skip the chapter if it has already been processed
      if (processedChapterIds.has(providerChapterId)) {
        console.log(`Chapter ${providerChapterId} already exists. Skipping.`);
        continue; // Jumps to the next iteration of the loop
      }

      const chapResponse = await fetch(link.href);
      const chapHtml = await chapResponse.text();
      const $$$ = cheerio.load(chapHtml);

      // Chapter title is now the same as the link text, which we already have.
      const originalTitle = link.text;
      let originalContent = "";
      $$$(selectors.chapterContent).each((_, p) => {
        originalContent += $$$(p).text().trim() + "\n\n";
      });

      const [translatedChapterTitle, translatedChapterContent] =
        await Promise.all([
          translateText(originalTitle),
          translateText(originalContent),
        ]);

      await db.chapter.create({
        data: {
          storyId: story.id,
          providerStoryId: bookId,
          providerChapterId: providerChapterId,
          chapterNumber: i + 1,
          title: translatedChapterTitle,
          content: originalContent,
          translatedContent: translatedChapterContent,
        },
      });
      await new Promise((res) => setTimeout(res, 15_000));
    }

    return {
      success: `Story "${translatedTitle}" imported successfully as a draft!`,
    };
  } catch (e) {
    console.error(e);
    return { error: "An unexpected error occurred during import." };
  }
}

function extractChapterFromUrl(url) {
  try {
    // A regular expression to find a sequence of digits
    // located between a slash and ".html" at the end of the string.
    // The parentheses `()` create a "capturing group" for the digits.
    const regex = /\/(\d+)\.html$/;

    // The match() method returns an array.
    // Index 0 is the full match, and subsequent indices are captured groups.
    const match = url.match(regex);

    // If a match is found and the captured group exists, return it.
    if (match && match[1]) {
      return match[1];
    }

    // If no match is found, return null.
    return null;
  } catch (error) {
    console.error("An error occurred during URL parsing:", error);
    return null;
  }
}
