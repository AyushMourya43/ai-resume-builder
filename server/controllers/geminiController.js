// controllers/geminiController.js
import { callGeminiAPI } from "../services/geminiService.js";

export const enhanceSection = async (req, res) => {
  try {
    const { section, data } = req.body;

    if (!section || !data) {
      return res.status(400).json({ error: "Missing section or data" });
    }

    const prompt = generatePrompt(section, data);
    const enhanced = await callGeminiAPI(prompt);

    res.json({ enhanced });
  } catch (err) {
    console.error("Enhancement Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const generatePrompt = (section, data) => {
  switch (section) {
    case "summary":
      return `Improve this resume summary:\n${data}`;
    case "skills":
      return `Rewrite this skills list in a professional tone:\n${data.join(", ")}`;
    case "experience":
      return `Enhance this experience:\n${data.map((e) => e.accomplishment.join("\n")).join("\n")}`;
    case "education":
      return `Polish this education info:\n${JSON.stringify(data)}`;
    default:
      return `Improve this resume section:\n${JSON.stringify(data)}`;
  }
};
