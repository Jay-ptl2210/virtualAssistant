import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;

    const prompt = `
You are a helpful virtual assistant named ${assistantName}, created by ${userName}.

⚠️ You are NOT Google or a chatbot.
⚠️ You should NEVER suggest a Google search unless the user specifically says "search on Google" or "Google for...".

Your job is to answer clearly, directly, and only in JSON format. Return EXACTLY this format:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "linkedin_open" | "google_maps_open" | "weather_show" | "whatsapp_open" | "telegram_open" | "WAbusiness_open" | "snapchat_open" | "spotify_open" | "spotify_play" | "youtube_open",
  "userInput": "<query if needed>",
  "response": "<clear spoken response>"
}

✅ Rules:
- If the user says something factual like "What is AI?", return:
  {
    "type": "general",
    "response": "<give the answer directly>"
  }

- Only use "google_search" if user says:
    • "search on Google"
    • "Google for..."
    • Or if it's an extremely vague query and you're unsure what it means.

- Do not default to "google_search" or "youtube_search" unless the user specifically says so.

- If the user asks for current date/time/day/month, return:
  • "type": "get_date", "get_time", "get_day", or "get_month"
  • Leave response empty. The backend will fill the correct time info.

- If the user says "play [song name]", assume YouTube unless they mention Spotify.
- Do NOT wrap anything in quotes, markdown, or code blocks.
- Return only plain JSON — no explanation, no extra text.

Now respond to this user input: "${command}"
`;
;



    const result = await axios.post(apiUrl, {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const responseText =
      result?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      throw new Error("Gemini returned an empty or invalid response");
    }

    // ✅ Clean extra formatting like ```json or ```
    const cleanedText = responseText
      .replace(/^```json\s*/i, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();

    return cleanedText;
  } catch (error) {
    console.error("❌ Gemini API Error:", error?.response?.status, error?.message);

    return JSON.stringify({
      type: "error",
      userInput: command,
      response:
        "Sorry, I couldn't process your request right now. Please try again later.",
    });
  }
};

export default geminiResponse;