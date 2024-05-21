let Wait = false;

function toggleColumnVisibility(Output) {
  var discordIframe = document.getElementById("discord-iframe");

  if (Output === '') {
    if (discordIframe.style.display === "none" || discordIframe.style.display === "") {
      discordIframe.style.display = "block";
    } else {
      discordIframe.style.display = "none";
    }
  }
  else if (Output === "Wait") {
    Wait = true;
  }
  else if (Output === "Close" && Wait){
    Wait = false;
    discordIframe.style.display = "none";
  }
}

let close1 = false;


function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  /*
  var isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
  if (isMobileDevice) {
    alert("This device do not meet the requirements to run this action");
  } else {
    
  }
  */
}



function OpenTiktok() {
  const popupDiv = document.getElementById("OpenTiktok");

  if (close1) {
    popupDiv.style.display = "block";
  }
  else {
    popupDiv.style.display = "none";
  }
  window.onclick = function (event) {
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
function ShowOnClick(Self) {
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





