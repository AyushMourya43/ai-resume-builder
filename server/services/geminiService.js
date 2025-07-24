// services/geminiService.js
const axios = require("axios");

/**
 * Send enhancement prompt to Gemini AI via OpenRouter
 * @param {string} prompt
 * @returns {string} enhanced text (raw string)
 */
const getEnhancedText = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          {
            role: "system",
            content: "You are a professional resume editor. Return improved resume content only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`, // ✅ Make sure it's in your .env
        },
      }
    );

    const aiText = response.data.choices?.[0]?.message?.content;
    return aiText || "❌ Error: No response from Gemini AI";
  } catch (err) {
    console.error("❌ Gemini API error:", err.response?.data || err.message);
    throw new Error("Failed to get response from Gemini");
  }
};

module.exports = { getEnhancedText };
