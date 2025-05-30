<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>진로 GPT 챗봇</title>
  <style>
    body { font-family: sans-serif; padding: 40px; }
    #chat { border: 1px solid #ccc; height: 400px; overflow-y: scroll; padding: 10px; margin-bottom: 10px; }
    input { width: 70%; padding: 10px; }
    button { padding: 10px 20px; }
  </style>
</head>
<body>
  <h2>진로 추천 GPT 챗봇</h2>
  <div id="chat"></div>
  <input id="input" placeholder="메시지를 입력하세요">
  <button onclick="sendMessage()">전송</button>

  <script>
    const chatHistory = [
      { role: "system", content: "너는 중3·고2 학생에게 진로를 추천하는 GPT 챗봇이야. MBTI, 가치관, 흥미에 따라 RIASEC 기반으로 직업을 추천해줘." }
    ];

    async function sendMessage() {
      const input = document.getElementById("input").value;
      if (!input) return;

      chatHistory.push({ role: "user", content: input });
      document.getElementById("chat").innerHTML += `<p><strong>나:</strong> ${input}</p>`;
      document.getElementById("input").value = "";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      const data = await res.json();
      const reply = data.reply;
      chatHistory.push({ role: "assistant", content: reply });
      document.getElementById("chat").innerHTML += `<p><strong>GPT:</strong> ${reply}</p>`;
    }
  </script>
</body>
</html>
