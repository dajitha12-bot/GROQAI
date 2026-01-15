const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Show user message
  chatBox.innerHTML += `
    <div class="message user">
      <strong>YOU:</strong> ${message}
    </div>
  `;
  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Send to backend
  fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  })
    .then((res) => res.json())
    .then((data) => {
      chatBox.innerHTML += `
        <div class="message bot">
          <strong>BOT:</strong> ${data.reply}
        </div>
      `;
      chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(() => {
      chatBox.innerHTML += `
        <div class="message bot">
          <strong>BOT:</strong> ⚠️ Unable to connect to AI engine.
        </div>
      `;
      chatBox.scrollTop = chatBox.scrollHeight;
    });
}
