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
  requestAnimationFrame(OpenTiktok)

    transform = false;
function  ShowOnClick(Self) {
  const Logo = document.getElementById("Logo");
  transform = !transform;
    if (transform) {
      Self.style.right = "-20px";
      Logo.innerHTML = "&gt;";

    }
    else {
      Self.style.right = "-110px";
      Logo.innerHTML = "&lt;";
    }

  }

  const express = require('express');
  const bodyParser = require('body-parser');
  
  const app = express();
  const port = 8000;
  
  // Store votes
  let votes = {
      option1: 0,
      option2: 0,
      option3: 0
  };
  
  // Middleware to parse request body
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // Route for submitting votes
  app.post('/submit_vote', (req, res) => {
      const { vote } = req.body;
      
      // Increment vote count
      votes[vote]++;
  
      // Send updated votes as response
      res.json(votes);
  });
  
  // Start server
  app.listen(port, () => {
      console.log(`Server started on port ${port}`);
  });

  
  


