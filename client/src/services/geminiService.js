export const enhanceTextWithGemini = async (section, content) => {
  try {
    const res = await fetch("http://localhost:8000/api/enhance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ section, content }),
    });

    const data = await res.json();

    if (res.ok) return data.enhanced;
    else throw new Error(data.error || "Enhancement failed");
  } catch (err) {
    console.error("Enhance API error:", err);
    return null;
  }
};
