export default async function handler(req, res) {
  const apiKey = "sk-당신의-API키";

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
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

    // 예외처리 추가
    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ reply: "GPT 응답을 이해하지 못했어요 😢" });
    }

    return res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    return res.status(500).json({ reply: "서버 오류가 발생했어요. 잠시 후 다시 시도해주세요." });
  }
}
