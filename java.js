const Discord = document.getElementById("Discord-btn");
const Youtube = document.getElementById("Youtube-btn");
const Tiktok = document.getElementById("Tiktok-btn");

let OldBtn = "";
let DiscordStyle = {Transform: "", src: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png", width: 30, height: 20};
let YoutubeStyle = {Transform: "", src: "https://static.vecteezy.com/system/resources/thumbnails/023/986/704/small/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png", width: 40, height: 38};
let TiktokStyle = {Transform: "", src: "https://i.pinimg.com/originals/69/50/5f/69505fac2e3f272646db6cf81547d4c2.png", width: 47, height: 42};



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

  

  function OpenTiktok() {
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

    requestAnimationFrame(OpenTiktok)
  }
  requestAnimationFrame(Openk)





// Function to fetch live viewers count from server
async function fetchLiveViewers() {
  try {
    // Fetch the live viewers count from the server
    const response = await fetch('/api/live-viewers');
    if (!response.ok) {
      throw new Error('Failed to fetch live viewers count');
    }
    const data = await response.json();
    return data.liveViewers;
  } catch (error) {
    console.error(error);
    return 0; // Return 0 if there's an error
  }
}

// Function to update live viewers count on the webpage
async function updateLiveViewersCount() {
  const viewCountElement = document.getElementById('view-count');
  const liveViewers = await fetchLiveViewers();
  viewCountElement.textContent = liveViewers;
}

// Function to detect user agent information
function detectDevice() {
  const userAgent = navigator.userAgent;
  // Here, you can analyze the user agent string to detect the device, browser, etc.
  console.log("User Agent:", userAgent);
}

// Update count every second (1000 milliseconds)
setInterval(updateLiveViewersCount, 2000);

// Call detectDevice function to detect user agent information
detectDevice();
