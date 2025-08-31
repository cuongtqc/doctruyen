// Replace with your actual Gemini API Key
const GEMINI_API_KEY = "AIzaSyCbwLCRYxau8HGzmg4Wlvn0awAiQ3nORO4";

/**
 * Translates a given text to a target language using the Gemini API.
 * @param {string} textToTranslate The paragraph to translate.
 * @param {string} targetLanguage The language to translate the text into (e.g., 'fr' for French, 'es' for Spanish).
 * @returns {Promise<string>} The translated text.
 */
export async function translateText(
  textToTranslate,
  targetLanguage = "Vietnamese"
) {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  // const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Context: I am translating the story. Please don't give any suggestion or additional reply, just translate the text.
                Translate the following text to ${targetLanguage}: ${textToTranslate}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    // Check if the response contains content
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      // The translated text is within the 'parts' of the first 'candidate'
      console.log(data.candidates[0].content);
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No content found in API response.");
    }
  } catch (error) {
    console.error("Error during translation:", error);
    throw error;
  }
}

// Example usage:
const paragraph =
  "The quick brown fox jumps over the lazy dog. This is a classic example sentence used for testing.";
const language = "French";

// translateWithGemini(paragraph, language)
//   .then(translatedText => {
//     console.log(`Original: ${paragraph}`);
//     console.log(`Translated (${language}): ${translatedText}`);
//   })
//   .catch(error => {
//     console.error('Failed to translate:', error);
//   });
