document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    function addMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        
        const messageText = document.createElement('span');
        messageText.className = 'message-text';
        messageText.innerText = message;
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click', function() {
            removeMessage(messageElement, message);
        });
        
        messageElement.appendChild(messageText);
        messageElement.appendChild(deleteButton);
        
        chatBox.appendChild(messageElement);
    }

    function removeMessage(messageElement, message) {
        messageElement.remove();
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        const index = messages.indexOf(message);
        if (index !== -1) {
            messages.splice(index, 1);
            localStorage.setItem('chatMessages', JSON.stringify(messages));
        }
    }

    function saveMessage(message) {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push(message);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.forEach(message => addMessage(message));
    }

    sendButton.addEventListener('click', function() {
        const message = messageInput.value.trim();
        if (message !== '') {
            addMessage(message);
            saveMessage(message);
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

  
    loadMessages();
});
