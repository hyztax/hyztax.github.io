let Wait = false,
 Username = "",
 password = "",
 LogedIn = false,
Settings = false;


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
  else if (Output === "Close" && Wait) {
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
let Clicked = true;
function ShowSpotifyCont(Btn) {
  Clicked = !Clicked;
  const SPC = document.getElementById('spotifyContainer');
  if (Clicked) {
    SPC.style.display = "none";
  }
  else {
    SPC.style.display = "block";
  }
}
let Show = false;

function ShowPasword(btn, tag) {
  Show = !Show;
  if (tag === '1') {

    const passwordField = document.getElementById("LoginPassword");
    const togglePasswordButton = document.getElementById("togglePassword");
    if (!Show) {
      btn.style.backgroundImage = "url('bilder/ShowPass.png')";
      passwordField.type = "text";
    } else {
      btn.style.backgroundImage = "url('bilder/HidePass.png')";
      passwordField.type = "password";
      togglePasswordButton.textContent = "Show";
    }
  }
  else {

    const passwordField = document.getElementById("LoginPassword2");
    const togglePasswordButton = document.getElementById("togglePassword");
    if (Show) {
      btn.style.backgroundImage = "url('bilder/ShowPass.png')";
      passwordField.type = "text";
    } else {
      btn.style.backgroundImage = "url('bilder/HidePass.png')";
      passwordField.type = "password";
      togglePasswordButton.textContent = "Show";
    }
  }
}

window.addEventListener("DOMContentLoaded", function() {
  document.getElementById("OnlyLoggedOut").style.display = "block";
  document.getElementById("OnlyLoggedIn").style.display = "none";
});
function ShowLogin(Special) {
  const LoginBdy = document.getElementById("MainLoginBdy");
  Show = !Show;


  document.getElementById("Usrn").value = "";
  document.getElementById("LoginPassword2").value = "";
  document.getElementById("UsernameLogin").value = "";
  document.getElementById("LoginPassword").value = "";

  if (Show) {
    LoginBdy.style.display = "block";
  }
  else {
    LoginBdy.style.display = "none";
  }

  if (Special === "CreateNew") {
    document.getElementById("MainLoginBdy2").style.display = "block";
  }
  if (Special === "CloseNew") {
    Show = !Show;
    document.getElementById("MainLoginBdy2").style.display = "none";
    LoginBdy.style.display = "none";
  }
}
function CreateAccount(Special) {

  if (Special === "") {
    const Usnm = document.getElementById("Usrn").value;
    const Pswr = document.getElementById("LoginPassword2").value;
    if (Usnm === Username && Username != "") {
      Notification("Användarnamn Eller Lösenord Är Upptagen", "red", "2");
      document.getElementById("Usrn").value = "";
      document.getElementById("LoginPassword2").value = "";
    }
    else if (Usnm === "") {
      Notification("Vänligen fyll i rutorna", "orange", "2");
      document.getElementById("Usrn").value = "";
      document.getElementById("LoginPassword2").value = "";
    }
    else if (Pswr != "") {
      if (Usnm.length < 20 && Usnm.length > 5 && Pswr.length < 25 && Pswr.length > 8) {
        Notification("Konto Skapat!", "greenyellow", "2");
        password = Pswr;
        Username = Usnm;
        ChangeAccountNmaeDis('')
        LogedIn = true;
        document.getElementById("OnlyLoggedOut").style.display = "none";
        document.getElementById("OnlyLoggedIn").style.display = "block";
      }
      else if (Usnm.length > 20 | Pswr.length > 25) {
        Notification("Namn eller Lösenord är för kort", "orange", "2");
      }
      else if (Usnm.length < 5 | Pswr.length < 8) {
        Notification("Namn eller Lösenord är för kort", "orange", "2");
      }


    }
    else {
      Notification("Något Gick Fel", "red", "2");
      document.getElementById("Usrn").value = "";
      document.getElementById("LoginPassword2").value = "";
    }
  }
  if (Special === "Work") {
    const Usnm = document.getElementById("UsernameLogin").value;
    const Pswr = document.getElementById("LoginPassword").value;
    if (Usnm === Username && Pswr === password && Usnm != "" && Pswr != "") {

      Notification("Inloggning lyckades!", "greenyellow", "1");
      ChangeAccountNmaeDis('')
      LogedIn = true;
      document.getElementById("OnlyLoggedOut").style.display = "none";
      document.getElementById("OnlyLoggedIn").style.display = "block";
    }
    else if (Usnm === "" | Pswr === "") {
      Notification("Vänligen fyll i rutorna", "orange", "1");
    }
    else {
      Notification("Felaktig Användarnamn Eller Lösenord", "red", "1");
      document.getElementById("UsernameLogin").value = "";
      document.getElementById("LoginPassword").value = "";
    }
  }
  if (Special === "Delete") {
    if (!LogedIn) {
      alert("Något gick fel")
    }
    else {
      password = "";
      Username = "";
      ChangeAccountNmaeDis('delete');
      LogedIn = false;
      document.getElementById("OnlyLoggedOut").style.display = "block";
      document.getElementById("OnlyLoggedIn").style.display = "none";
    }
  }
}


function ChangeAccountNmaeDis(tag) {
  if (tag === '') {
    const d = new Date();
    DateCreated = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()
    document.getElementById("UsernameDis").innerText = Username;
    document.getElementById("KontoTimeDis").innerText = DateCreated;
  }

  if (tag === "delete") {
    document.getElementById("UsernameDis").innerText = "";
    document.getElementById("KontoTimeDis").innerText = "";
  }
}

function Notification(Message, color, id) {
  const ErrorMessage = document.getElementById("ErrorNotif" + id);
  ErrorMessage.innerText = Message;
  ErrorMessage.style.color = color;
  ErrorMessage.style.opacity = "100%";

  setTimeout(function () {
    ErrorMessage.style.opacity = "0%";
  }, 2000);
}

function ShowSettings() {

  const MainSettings = document.getElementById("Settings");
  Settings = !Settings;

  if (Settings) {
    MainSettings.style.display = "block";
  }
  else {
    MainSettings.style.display = "none";
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


let votes = {
  option1: 0,
  option2: 0,
  option3: 0
};


app.use(bodyParser.urlencoded({ extended: true }));


app.post('/submit_vote', (req, res) => {
  const { vote } = req.body;


  votes[vote]++;


  res.json(votes);
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


//new code here 

