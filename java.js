


function toggleColumnVisibility() {
    var discordIframe = document.getElementById("discord-iframe");
  
    if (discordIframe.style.display === "none" || discordIframe.style.display === "") {
      discordIframe.style.display = "block";
    } else {
      discordIframe.style.display = "none";
    }
  }
  
  let close1 = false;

  
  function openModal() {
    var modal = document.getElementById("myModal");

    var isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
    if (isMobileDevice) {
      alert("This device do not meet the requirements to run this action");
    } else {
      modal.style.display = "block";
    }
  }

  

  function Openk() {
    const popupDiv = document.getElementById("OpenTiktok");

    if (close1) {
      popupDiv.style.display = "block";
    }
    else {
      popupDiv.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == popupDiv) {
        popupDiv.style.display = "none";
        close1 = !close1;
      }
      var modal = document.getElementById("myModal");
      if (event.target == modal) {
        modal.style.display = "none";
      }
  
    }

    requestAnimationFrame(Openk)
  }
  requestAnimationFrame(Openk)





// Function to update live viewers count
function updateLiveViewersCount() {
  const viewCountElement = document.getElementById('view-count');
  let count = localStorage.getItem('viewCount') || 0; // Get count from local storage, default to 0
  if (!localStorage.getItem('visited')) { // If user hasn't visited before
    count++; // Increment count
    localStorage.setItem('visited', true); // Set visited flag in local storage
    localStorage.setItem('viewCount', count); // Update count in local storage
  }
  viewCountElement.textContent = count; // Update count displayed on the page
}

// Update count when the page loads
updateLiveViewersCount();

// Update count every second (1000 milliseconds)
setInterval(updateLiveViewersCount, 1000);
