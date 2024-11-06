document.getElementById('send-btn').addEventListener('click', sendMessage);

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message === '') return;

    displayMessage(message, 'user-message');
    userInput.value = '';

    // Send the message to the API endpoint
    fetch('https://api.example.com/getResponse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            displayMessage('Error: ' + data.error, 'bot-message');
        } else {
            displayMessage(data.response, 'bot-message');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage('Sorry, there was an error processing your request.', 'bot-message');
    });
}

function displayMessage(text, className) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
