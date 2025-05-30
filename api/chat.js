export default async function handler(req, res) {
  const apiKey = "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";

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
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages
      })
    });

    const data = await response.json();

    // ✅ 응답 로그 확인용 출력
    console.log("GPT 응답 전체: ", JSON.stringify(data, null, 2));

    if (data.error) {
      return res.status(500).json({ reply: "GPT 오류: " + data.error.message });
    }

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ reply: "GPT 응답이 비어 있습니다." });
    }

    return res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    return res.status(500).json({ reply: "서버 오류: " + err.message });
  }
}