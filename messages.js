document.addEventListener("DOMContentLoaded", () => {
  const SHEET_URL = "https://script.google.com/macros/s/AKfycby_UpnF9puo7z81YV_VR2tGQF6Tga4LlQnxbIky3HAwEjT2N3SI2klsF2G4E-SA8xk/exec";
  const container = document.getElementById("messages-container");

  fetch(SHEET_URL)
    .then(response => response.json())
    .then(data => {
      container.innerHTML = ""; // Clear "Loading" text
      const messages = data.filter(row => row.Message && row.Message.trim() !== "");

      if (messages.length === 0) {
        container.innerHTML = "<p>No messages yet. Be the first to leave one!</p>";
        return;
      }

      messages.forEach((entry, index) => {
        const messageBox = document.createElement("div");
        messageBox.className = "message-box";

        const anon = document.createElement("p");
        anon.className = "anon-label";
        anon.textContent = `Guest ${index + 1} says:`;

        const msg = document.createElement("blockquote");
        msg.textContent = entry.Message;

        messageBox.appendChild(anon);
        messageBox.appendChild(msg);
        container.appendChild(messageBox);
      });
    })
    .catch(error => {
      container.innerHTML = "<p style='color:red;'>Failed to load messages. Please try again later.</p>";
      console.error("Error fetching messages:", error);
    });
});
