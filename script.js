const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");

const messageInput = document.getElementById("message-input");

const name = prompt("Welcome, enter your name ");

appendMessage("You joined");
socket.emit("new-user", name);

socket.on("chat-message", data => {
  if (data) appendMessage(`${data.name}: ${data.message}`);
});
socket.on("user-connected", name => {
  if (name) appendMessage(`${name} connected`);
});
socket.on("user-disconnected", name => {
  if (name) appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  appendMessage(`You: ${message}`);
  messageInput.value = "";
});

function appendMessage(message) {
  let messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.appendChild(messageElement);
}
