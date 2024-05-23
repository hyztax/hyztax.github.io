document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    function addMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.style.background = 'rgb(79, 79, 79)'; // Add black background
        messageElement.style.padding = '10px'; // Add some padding
        messageElement.style.margin = '10px'; // Add some margin between messages
        messageElement.style.position = 'relative'; // To position the delete button correctly
        messageElement.style.maxWidth = '700px';
        messageElement.style.borderRadius = "12px" // Set a maximum width

        const messageText = document.createElement('span');
        messageText.className = 'message-text';
        messageText.innerText = message;
        messageText.style.color = 'white';
        messageText.style.whiteSpace = 'normal'; // Allow text to wrap to the next line
        messageText.style.wordWrap = 'break-word'; // Ensure words are wrapped if they are too long
        messageText.style.display = 'inline-block';
        messageText.style.width = 'calc(100% - 40px)';
        messageText.style.fontSize = "15px"; // Adjust width to account for padding and delete button

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerText = 'X';
        deleteButton.style.fontSize = "20px";
        deleteButton.style.position = 'absolute';
        deleteButton.style.right = '10px';
        deleteButton.style.top = '10px';
        deleteButton.style.backgroundColor = "transparent";
        deleteButton.style.border = "none";
        deleteButton.addEventListener('click', function () {
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



    messageInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const message = messageInput.value.trim();
            if (message !== '') {
                addMessage(message);
                saveMessage(message);
                messageInput.value = '';
            }
        }
    });


    loadMessages();
});


