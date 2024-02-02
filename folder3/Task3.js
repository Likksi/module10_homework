const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const locationButton = document.getElementById('locationButton');
let locationSent = false; // Флаг для отслеживания отправки геолокации

sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    sendMessage(message, 'user');
    messageInput.value = '';
  }
});

locationButton.addEventListener('click', () => {
  if (!locationSent && 'geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const locationURL = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      sendMessage('Геолокация', 'user', true);
      locationSent = true;
    });
  } else if (locationSent) {
    alert('Геолокация уже отправлена.');
  } else {
    alert('Геолокация не поддерживается в вашем браузере.');
  }
});

function sendMessage(message, sender, isLocation = false) {
  const messageElement = document.createElement('div');
  if (isLocation) {
    messageElement.innerHTML = '<strong>' + message + '</strong>';
  } else {
    messageElement.textContent = message;
  }
  messageElement.classList.add(sender === 'user' ? 'user-message' : 'server-message');
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Отправка сообщения на сервер через WebSocket
  if (sender === 'user' && !isLocation) {
    socket.send(message);
  }
}

socket.addEventListener('message', (event) => {
  const message = event.data;
  sendMessage(message, 'server');
});
