// controllers/geminiController.js
const { getEnhancedText } = require("../services/geminiService");

const enhanceSection = async (req, res) => {
  try {
    const { section, data } = req.body;

    if (!section || !data) {
      return res.status(400).json({ error: "Missing section or data" });
    }

    const prompt = generatePrompt(section, data);
    console.log("🧠 Prompt being sent to Gemini:", prompt);

    const enhancedText = await getEnhancedText(prompt);

    // Just send raw text back for now
    res.status(200).json({ enhanced: enhancedText });
  } catch (err) {
    console.error("❌ Enhancement Error:", err.message || err);
    res.status(500).json({ error: "Something went wrong in enhanceSection" });
  }
};

const generatePrompt = (section, data) => {
  switch (section) {
    case "summary":
      return `You are a professional resume editor with expertise in writing concise, polished, and ATS-optimized resume summaries.

Instructions:
- Improve the following summary in a professional tone.
- Remove unnecessary words.
- Make it crisp (3-4 lines max).
- Do NOT include any brackets like [ ... ] or quotes.
- Do NOT wrap it in JSON or add 'summary:'.
- Just return the enhanced summary text as plain, clean output.

Summary to improve:
${data}`;

    case "skills":
      return `Improve this list of resume skills to look professional, clean, and ATS-friendly:\n${JSON.stringify(
        data
      )}`;
    case "experience":
      return `Enhance this resume experience (use bullet points if needed):\n${JSON.stringify(
        data
      )}`;
    case "education":
      return `Polish this education section to be grammatically correct and professional:\n${JSON.stringify(
        data
      )}`;
    default:
      return `Improve this resume section:\n${JSON.stringify(data)}`;
  }
};

module.exports = { enhanceSection };
