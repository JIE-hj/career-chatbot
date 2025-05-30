export default async function handler(req, res) {
  const apiKey = "sk-당신의-API-키";

  if (req.method !== "POST") {
    return res.status(405).json({ error: "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" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ reply: "GPT 응답이 비어있습니다." });
    }

    return res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    return res.status(500).json({ reply: "서버 오류: " + err.message });
  }
}
