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

function analyze() {
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) {
    alert("Please select a file to analyze!");
    return;
  }

  el("analyze-button").style.display = "none";
  el("loading-spinner").style.display="block";

  var xhr = new XMLHttpRequest();
  var loc = window.location;
  console.log(loc);
  var url = `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`;
  console.log(url);

  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);

  xhr.onerror = function() {
    alert(xhr.responseText);
    console.log("ERROR");
      el("analyze-button").style.display = "block";
      el("loading-spinner").style.display="none";
  };

  xhr.onload = function(e) {
    console.log("Ready state" + this.readyState)
    if (this.readyState === 4) {

      /* Hide the spinner */
      el("analyze-button").style.display = "block";
      el("loading-spinner").style.display="none";

      var response = JSON.parse(e.target.responseText);
      el("result-label").innerHTML = `Result = ${response["result"]}`;
    }
    el("analyze-button").innerHTML = "Analyze";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}

