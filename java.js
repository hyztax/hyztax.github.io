


function toggleColumnVisibility() {
    var discordIframe = document.getElementById("discord-iframe");
  
    if (discordIframe.style.display === "none" || discordIframe.style.display === "") {
      discordIframe.style.display = "block";
    } else {
      discordIframe.style.display = "none";
    }
  }
  
  
  function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  let close1 = false;
  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  
  // Close the modal if the user clicks outside the modal content
  window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }

  }
  
  function openModal() {
    var isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
    if (isMobileDevice) {
      alert("This device do not meet the requirements to run this action");
    } else {
      var modal = document.getElementById("myModal");
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
  
    }

    requestAnimationFrame(Openk)
  }
  requestAnimationFrame(Openk)


  


 
  
    
  