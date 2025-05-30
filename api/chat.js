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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    return res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
}