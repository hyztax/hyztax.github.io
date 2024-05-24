document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    let currentContextMenu = null; // Track the currently open context menu
    let currentReportPopup = null; // Track the currently open report popup

    function addMessage(message) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        messageContainer.style.display = 'flex';
        messageContainer.style.justifyContent = 'flex-end';
        messageContainer.style.margin = '10px'; // Add some margin between messages
        messageContainer.style.marginRight = '-10px';

        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.style.background = 'rgb(79, 79, 79)'; // Add black background
        messageElement.style.padding = '10px'; // Add some padding
        messageElement.style.borderRadius = "12px"; // Set a maximum width
        messageElement.style.wordWrap = 'break-word'; // Ensure words are wrapped if they are too long
        messageElement.style.whiteSpace = 'normal'; // Allow text to wrap to the next line

        const messageText = document.createElement('span');
        messageText.className = 'message-text';
        messageText.innerText = message;
        messageText.style.color = 'white';
        messageText.style.display = 'inline-block';
        messageText.style.fontSize = "12px"; // Adjust width to account for padding and delete button

        messageElement.appendChild(messageText);
        messageContainer.appendChild(messageElement);

        chatBox.appendChild(messageContainer);

        // Add padding top to chatBox
        chatBox.style.paddingTop = '100px';

        // Calculate and set height
        const messageContainerHeight = messageContainer.offsetHeight;
        chatBox.style.height = `${chatBox.offsetHeight + messageContainerHeight}px`;

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;

        // Add event listener for right-click context menu to each message
        messageElement.addEventListener('contextmenu', function (event) {
            event.preventDefault(); // Prevent default context menu
            if (!currentContextMenu) { // Check if there's no open context menu
                currentContextMenu = createContextMenu(message, messageContainer, event.clientX, event.clientY);
            }
        });
    }

    function createContextMenu(message, messageContainer, x, y) {
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.innerHTML = `
            <div class="alternative" data-action="remove">Radera</div>
            <div class="alternative" data-action="copy">Kopiera</div>
            <div class="alternative" data-action="report">Rapportera</div>
        `;
        menu.style.position = 'fixed';
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;

        // Add event listeners to context menu options
        menu.querySelectorAll('.alternative').forEach(option => {
            option.addEventListener('click', function () {
                const action = option.getAttribute('data-action');
                handleContextMenuAction(action, message, messageContainer);
                closeContextMenu();
            });
        });

        // Close the menu when clicking outside of it
        document.addEventListener('click', closeMenuListener);

        document.body.appendChild(menu);
        return menu;
    }

    function closeContextMenu() {
        if (currentContextMenu) {
            currentContextMenu.remove();
            currentContextMenu = null;
            document.removeEventListener('click', closeMenuListener);
        }
    }

    function closeMenuListener(event) {
        if (!currentContextMenu.contains(event.target)) {
            closeContextMenu();
        }
    }

    function handleContextMenuAction(action, message, messageContainer) {
        if (action === 'remove') {
            removeMessage(message, messageContainer);
        } else if (action === 'copy') {
            copyMessage(message);
        } else if (action === 'report') {
            openReportPopup(message);
        }
    }

    function removeMessage(message, messageContainer) {
        messageContainer.remove();
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        const index = messages.indexOf(message);
        if (index !== -1) {
            messages.splice(index, 1);
            localStorage.setItem('chatMessages', JSON.stringify(messages));
        }
    }

    function copyMessage(message) {
        navigator.clipboard.writeText(message)
            .then(() => {
                console.log('Message copied to clipboard');
                showCopyMessage(); // Show "Kopierade text" message
            })
            .catch(err => console.error('Could not copy message: ', err));
    }

    function showCopyMessage() {
        const copyMessageElement = document.createElement('div');
        copyMessageElement.innerText = 'Kopierade text';
        copyMessageElement.className = 'copy-message';
        document.body.appendChild(copyMessageElement);

        // Remove the message after a short delay
        setTimeout(() => {
            copyMessageElement.remove();
        }, 2000); // 2 seconds delay
    }

    function openReportPopup(message) {
        const reportPopup = document.createElement('div');
        reportPopup.className = 'report-popup';
        reportPopup.innerHTML = `
            <div class="popup-content">
                <h3>Rapportera Meddelande</h3>
                <p>${message}</p>
                <textarea placeholder="Beskriv varför du vill rapportera detta meddelande..."></textarea>
                <button onclick="submitReport()">Skicka</button>
                <button onclick="closeReportPopup()">Avbryt</button>
            </div>
        `;
        document.body.appendChild(reportPopup);
        currentReportPopup = reportPopup;
    }

    function closeReportPopup() {
        if (currentReportPopup) {
            currentReportPopup.remove();
            currentReportPopup = null;
        }
    }

    function submitReport() {
        // Placeholder function for submitting the report
        console.log('Report submitted');
        closeReportPopup();
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

document.addEventListener("DOMContentLoaded", function() {
    var profilePic = document.getElementById("profilePic");
    var storedPic = localStorage.getItem("profilePicData");

    // Set the background image from local storage if available
    if (storedPic) {
        profilePic.style.backgroundImage = "url('" + storedPic + "')";
    }

    // Function to handle click event on the profile picture
    profilePic.addEventListener("contextmenu", function(event) {
        event.preventDefault(); // Prevent default context menu
        var contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';
        contextMenu.innerHTML = `
            <div class="alternative" data-action="remove">Remove Image</div>
            <div class="alternative" data-action="change">Change Image</div>
        `;
        contextMenu.style.position = 'fixed';
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY}px`;

        // Add event listeners to context menu options
        contextMenu.querySelectorAll('.alternative').forEach(option => {
            option.addEventListener('click', function () {
                const action = option.getAttribute('data-action');
                if (action === 'remove') {
                    removeImage();
                } else if (action === 'change') {
                    changeImage();
                }
                contextMenu.remove();
            });
        });

        // Close the menu when clicking outside of it
        document.addEventListener('click', closeMenuListener);

        // Append the context menu to the document body
        document.body.appendChild(contextMenu);
    });

    // Function to remove the profile picture
    function removeImage() {
        profilePic.style.backgroundImage = "";
        localStorage.removeItem("profilePicData");
    }

    // Function to handle changing the profile picture
    function changeImage() {
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // Accept only image files
        fileInput.style.display = 'none';

        // Append the file input to the document body
        document.body.appendChild(fileInput);

        // Trigger click event on the file input
        fileInput.click();

        // Listen for changes in the file input
        fileInput.addEventListener('change', function() {
            var file = fileInput.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    // Set the background of the profile picture div to the uploaded image
                    profilePic.style.backgroundImage = "url('" + e.target.result + "')";
                    // Store the picture data in local storage
                    localStorage.setItem("profilePicData", e.target.result);
                }
                reader.readAsDataURL(file);
            }
            // Remove the file input from the document body
            document.body.removeChild(fileInput);
        });
    }

    // Close the context menu when clicking outside of it
    function closeMenuListener(event) {
        if (!contextMenu.contains(event.target)) {
            contextMenu.remove();
            document.removeEventListener('click', closeMenuListener);
        }
    }
});



// Function to change the user's name
function changeName() {
    var newName = prompt("Enter your new name:");
    if (newName !== null && newName !== "") {
        localStorage.setItem("userName", newName);
        document.querySelector(".user_name").textContent = newName;
    }
}

// Check if the user's name is stored in local storage and update the content
document.addEventListener("DOMContentLoaded", function() {
    var storedName = localStorage.getItem("userName");
    if (storedName) {
        document.querySelector(".user_name").textContent = storedName;
    }
});

// Function to change the user's name
function changeName() {
    var newName = prompt("Enter your new name (up to 10 characters):");
    if (newName !== null && newName !== "") {
        if (newName.length > 10) {
            alert("Name must be 10 characters or less.");
            return;
        }
        localStorage.setItem("userName", newName);
        document.querySelector(".user_name").textContent = newName;
    }
}

// Check if the user's name is stored in local storage and update the content
document.addEventListener("DOMContentLoaded", function() {
    var storedName = localStorage.getItem("userName");
    if (storedName) {
        document.querySelector(".user_name").textContent = storedName;
    }
});
