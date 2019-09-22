var el = x => document.getElementById(x);

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

function tryagain () {

  el("analyze-button").style.display="inline-block";
  el("try-again-button").style.display="none";
  el("result-label").innerHTML = "";

  el("upload-label").innerHTML = "No file chosen";
  el("image-picked").className = "no-display";

  el("choose-file-button").visibility = "hidden";
}

function analyze() {
  var uploadFiles = el("file-input").files;
  
   if (uploadFiles.length !== 1) {
    alert("Please select a file to analyze!");
    return;
  }

  // Hide the loading spinner, the analyze button, and the choose file button
  el("loading-spinner").style.display="none";
  el("analyze-button").style.display="none";
  el("choose-file-button").visibility = "";

  // Analyze the image
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  var url = `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);

  xhr.onerror = function() {
    alert(xhr.responseText);
    console.log("ERROR");
      el("analyze-button").style.display = "inline-block";
      el("loading-spinner").style.display="none";
  };

  xhr.onload = function(e) {
    console.log("Ready state" + this.readyState)
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);

      if (response["result"] == "spam") {
        el("result-label").innerHTML = "This is SPAM";
      } 
      else {
        el("result-label").innerHTML = "You're safe! No spam here."
      }

      // Show the try again button after a short timeout
      setTimeout (() => {
        el("try-again-button").style.display="inline-block";
      }, 1000);
    }
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}

