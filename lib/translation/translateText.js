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

export async function translateTextStatic(
  textToTranslate,
  targetLanguage = "vi"
) {
  try {
    const text = JSON.stringify(textToTranslate.split("\n").filter((_) => !!_));
    console.log(text);
    const response = await fetch(
      "https://translate-pa.googleapis.com/v1/translateHtml",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,vi;q=0.8",
          "content-type": "application/json+protobuf",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "x-browser-channel": "stable",
          "x-browser-copyright":
            "Copyright 2025 Google LLC. All rights reserved.",
          "x-browser-validation": "XPdmRdCCj2OkELQ2uovjJFk6aKA=",
          "x-browser-year": "2025",
          "x-client-data":
            "CLK1yQEIkbbJAQimtskBCKmdygEIyPvKAQiVocsBCMajywEIhaDNAQj/g88B",
          "x-goog-api-key": "AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520",
        },
        body: `[[${text},"zh-TW","${targetLanguage}"],"te_lib"]`,
        method: "POST",
        mode: "cors",
        credentials: "omit",
      }
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("@== data", data);

    // Check if the response contains content
    if (data && data[0] && data[0]) {
      // The translated text is within the 'parts' of the first 'candidate'
      console.log("@== data[0]", data[0].join("\n"));
      return data[0].join("\n");
    } else {
      console.log("No content found in API response.");
      return "";
    }
  } catch (error) {
    console.error("Error during translation:", error);
    throw error;
  }
}

// Example usage:
const paragraph = `我拚了命的往後躲，可手被鎖在床上，這一方牢籠裏我根本無處可躲！

鋒利的刀刃從我眼前劃過，眼角被割開一條傷口，鮮血立刻湧了出來，沿著我的臉頰流淌。

“賤人！賤人！修瑾是我的，誰都不能搶走他！誰都不能！”

哈露更加瘋狂，握著匕首又再次向我的眼睛刺過來，我隻能蜷縮起來，用雙臂緊緊護著自己的臉。

“哧！”

刀刃狠狠刺在我的手臂上，鮮血淋漓，痛入骨髓！

“你還敢躲？賤人，把臉抬起來！”

哈露咒罵著，用力拽著我的頭發逼迫我抬起頭，另一隻手，握著水果刀再次向我眼睛刺了上來！`;

// translateTextStatic(paragraph)
//   .then((translatedText) => {
//     console.log(`Original: ${paragraph}`);
//     console.log(`Translated ${translatedText}`);
//   })
//   .catch((error) => {
//     console.error("Failed to translate:", error);
//   });
// translateWithGemini(paragraph, language)
//   .then(translatedText => {
//     console.log(`Original: ${paragraph}`);
//     console.log(`Translated (${language}): ${translatedText}`);
//   })
//   .catch(error => {
//     console.error('Failed to translate:', error);
//   });
