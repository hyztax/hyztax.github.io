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
        menu.style.position = 'absolute';
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

    // Function to handle right-click event on the profile picture
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

    // Function to handle left-click event for inserting photo
    profilePic.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default behavior
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // Accept only image files
        fileInput.style.display = 'none';

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
        });

        // Trigger click event on the file input
        fileInput.click();
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


function showMainMenu() {
    var mainMenu = document.querySelector('.main_menu');
    var arrowIcon = document.querySelector('.arrow_out');
    mainMenu.style.display = 'block'; // Show main menu
    arrowIcon.style.display = 'none'; // Hide arrow icon
}

//make a code that connects the "friends" div that
// creates multiple profile for each person that creates an account


document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('search-input');

    // Add event listener for input event on search input
    searchInput.addEventListener('input', function () {
        var filter = this.value.trim().toLowerCase(); // Get the trimmed and lowercased search query
        var chatItems = document.querySelectorAll('.chat-list .chat-item'); // Select all chat items

        chatItems.forEach(function (item) {
            var name = item.querySelector('.message > div:first-child').textContent.trim().toLowerCase(); // Get the trimmed and lowercased name
            var message = item.querySelector('.message > div:last-child').textContent.trim().toLowerCase(); // Get the trimmed and lowercased message

            // Check if name or message contains the search query
            if (name.includes(filter) || message.includes(filter)) {
                item.style.display = ''; // Show the item
            } else {
                item.style.display = 'none'; // Hide the item
            }
        });
    });

    // Add click event listener to name elements to set search input value
    var nameElements = document.querySelectorAll('.name');
    nameElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var name = element.textContent.trim(); // Get the trimmed name
            searchInput.value = name; // Set the search input value
            searchInput.dispatchEvent(new Event('input')); // Trigger input event to filter chat items
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var arrowButton = document.querySelector('.arrow');
    var mainMenu = document.querySelector('.main_menu');

    // Add click event listener to arrow button
    arrowButton.addEventListener('click', function () {
        mainMenu.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll the main menu into view
    });
});




function bringChatBoxToFront() {
    const chatBox = document.getElementById('chat-box');
    chatBox.style.zIndex = '0';
}

function bringChatBoxToFront() {
    const chatBox = document.getElementById('chat-box');
    const mainMenu = document.querySelector('.main_menu');
    const arrowButton = document.querySelector('.arrow');
    
   
    chatBox.style.zIndex = '-2';
    
    mainMenu.style.display = 'none';
    
   
    arrowButton.style.zIndex = '10000';
}

function showMainMenu() {
    const mainMenu = document.querySelector('.main_menu');
    const arrowButton = document.querySelector('.arrow');
    
  
    mainMenu.style.display = 'block';
    
   
    arrowButton.style.zIndex = '1';
}

  // Function to show the main menu
  function showMainMenu() {
    const mainMenu = document.querySelector('.main_menu');
    const arrowButton = document.querySelector('.arrow');
    
    // Show the main menu
    mainMenu.style.display = 'block';
    
    // Set a lower z-index for the arrow button
    arrowButton.style.zIndex = '1';
    
    // Store the menu state in local storage
    localStorage.setItem('menuState', 'open');
}

// Function to hide the main menu
function hideMainMenu() {
    const mainMenu = document.querySelector('.main_menu');
    const arrowButton = document.querySelector('.arrow');
    
    // Hide the main menu
    mainMenu.style.display = 'none';
    
    // Set a higher z-index for the arrow button
    arrowButton.style.zIndex = '10000';
    
    // Store the menu state in local storage
    localStorage.setItem('menuState', 'closed');
}

// Function to initialize the menu state based on local storage
function initializeMenuState() {
    const menuState = localStorage.getItem('menuState');
    if (menuState === 'open') {
        showMainMenu();
    } else {
        hideMainMenu();
    }
}

// Call the initializeMenuState function when the page is loaded
window.onload = initializeMenuState;



//new code below here 


function updateCounter() {
    // Define the start time 3 weeks ago
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 21); // 3 weeks ago

    var now = new Date();
    var elapsedTime = now - startTime; // Difference in milliseconds

    // Convert milliseconds to different time units
    var seconds = Math.floor(elapsedTime / 1000); // Total seconds
    var minutes = Math.floor(seconds / 60); // Total minutes
    var hours = Math.floor(minutes / 60); // Total hours
    var days = Math.floor(hours / 24); // Total days
    var weeks = Math.floor(days / 7); // Total weeks

    // Calculate remaining days, hours, and minutes
    days = days % 7; // Days remaining after full weeks
    hours = hours % 24; // Hours remaining after full days
    minutes = minutes % 60; // Minutes remaining after full hours

    // Construct the time string
    var timeString;
    if (weeks > 0) {
        timeString = weeks + ' veckor';
    } else if (days > 0) {
        timeString = days + ' dagar';
    } else if (hours > 0) {
        timeString = hours + ' h';
    } else {
        timeString = minutes + ' min';
    }

    // Update the text content of the HTML element with class 'time'
    document.querySelector('.time').textContent = timeString;
}

// Update counter every second
setInterval(updateCounter, 1000);

// Initial update
updateCounter();


//göra en knapp i menyn som visar en pop up med bug fixes!

function showPopup() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('popup-overlay').style.display = 'block';
}

function hidePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}

function refreshPage() {
    location.reload();
}

function showLogsPopup() {
    var logsPopup = document.getElementById('logsPopup');
    logsPopup.style.display = 'block';
  }
  
  function closeLogsPopup() {
    var logsPopup = document.getElementById('logsPopup');
    logsPopup.style.display = 'none';
  }
  
  

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('emojiIcon').addEventListener('click', function() {
        var reactionsDiv = document.querySelector('.reactions');
        reactionsDiv.classList.toggle('hidden');
    });
});
