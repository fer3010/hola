document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Función para añadir un mensaje al chat
    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatBox.appendChild(messageDiv);
        // Desplazarse hasta el último mensaje
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Función para enviar el mensaje del usuario al backend
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return; // No enviar mensajes vacíos

        addMessage('user', message); // Muestra el mensaje del usuario en el chat
        userInput.value = ''; // Limpia el input

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();
            addMessage('bot', data.response); // Muestra la respuesta del bot
        } catch (error) {
            console.error('Error al comunicarse con el chatbot:', error);
            addMessage('bot', 'Lo siento, no pude conectar con el servidor.');
        }
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});