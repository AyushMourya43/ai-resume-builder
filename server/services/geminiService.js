const axios = require("axios");
const { model } = require("mongoose");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.getEnhancedText = async (prompt) => {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;

  const requestData = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const response = await axios.post(url, requestData, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";
  return text;
};

module.exports = {getEnhancedText}