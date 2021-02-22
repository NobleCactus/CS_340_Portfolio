document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons() {
  document.getElementById("selTitleSearch").addEventListener("click", function(event){
    document.getElementById("updateDevSearch").style.display = "none";
    document.getElementById("updatePlatSearch").style.display = "none";
    document.getElementById("updateFranchiseSearch").style.display = "none";

    document.getElementById("updateTitleSearch").style.display = "block";

    document.getElementById("updateSuccessful").style.display = "none"
  });

  document.getElementById("selDevSearch").addEventListener("click", function(event){
    document.getElementById("updateTitleSearch").style.display = "none";
    document.getElementById("updatePlatSearch").style.display = "none";
    document.getElementById("updateFranchiseSearch").style.display = "none";

    document.getElementById("updateDevSearch").style.display = "block";

    document.getElementById("updateSuccessful").style.display = "none"
  });

  document.getElementById("selPlatSearch").addEventListener("click", function(event){
    document.getElementById("updateTitleSearch").style.display = "none";
    document.getElementById("updateDevSearch").style.display = "none";
    document.getElementById("updateFranchiseSearch").style.display = "none";

    document.getElementById("updatePlatSearch").style.display = "block";

    document.getElementById("updateSuccessful").style.display = "none"
  });

  document.getElementById("selFranchiseSearch").addEventListener("click", function(event){
    document.getElementById("updateTitleSearch").style.display = "none";
    document.getElementById("updateDevSearch").style.display = "none";
    document.getElementById("updatePlatSearch").style.display = "none";

    document.getElementById("updateFranchiseSearch").style.display = "block";

    document.getElementById("updateSuccessful").style.display = "none"
  });

  document.getElementById("searchTitleButton").addEventListener("click", function(event) {
    var req = new XMLHttpRequest();

    var payload = {"action": "searchTitle",
            "titleName": document.getElementById('searchTitleName').value,
            "titlePlat": document.getElementById('searchTitlePlat').value, 
            "titleFromDate": document.getElementById('searchTitleFromDate').value, 
            "titleToDate": document.getElementById('searchTitleToDate').value, 
            "titleGenre": document.getElementById('searchTitleGenre').value, 
            "titleFranchise": document.getElementById('searchTitleFranchise').value,
            "titleDev": document.getElementById('searchTitleDev').value,
            "titleESRB": document.getElementById('searchTitleESRB').value};

    req.open('POST', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400) {
        // POST request successful, check response for query status

        // if query successful,
          // use DOM to dynamically add query result table to webpage
          // reset filter fields?

        // if query unsuccessful (shouldn't happen if filter parameters are verified first)

      } else {
        console.log("Error in network request: " + req.statusText);
    }});

    req.send(JSON.stringify(payload));
  });

  document.getElementById("searchDevButton").addEventListener("click", function(event) {
    var req = new XMLHttpRequest();

    var payload = {"action": "searchDev",
            "devName": document.getElementById('searchDevName').value,
            "devCountry": document.getElementById('searchDevCountry').value, 
            "devFromDate": document.getElementById('searchDevFromDate').value, 
            "devToDate": document.getElementById('searchDevToDate').value};

    req.open('POST', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400) {
        // POST request successful, check response for query status

        // if query successful,
          // use DOM to dynamically add query result table to webpage
          // reset filter fields?

        // if query unsuccessful (shouldn't happen if filter parameters are verified first)

      } else {
        console.log("Error in network request: " + req.statusText);
    }});

    req.send(JSON.stringify(payload));
  });

  document.getElementById("searchPlatButton").addEventListener("click", function(event) {
    var req = new XMLHttpRequest();

    var platInProd = Array.from(document.getElementsByClassName("searchPlatInProd"));
    if (platInProd[0].checked) {
      platInProd = "Yes";
    } else if (platInProd[1].checked) {
      platInProd = "No";
    } else {
      platInProd = "";
    }

    var payload = {"action": "searchPlat",
            "platName": document.getElementById('searchPlatName').value,
            "platFromDate": document.getElementById('searchPlatFromDate').value, 
            "platToDate": document.getElementById('searchPlatToDate').value, 
            "platDev": document.getElementById('searchPlatDev').value,
            "platInProd": platInProd};

    req.open('POST', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400) {
        // POST request successful, check response for query status

        // if query successful,
          // use DOM to dynamically add query result table to webpage
          // reset filter fields?

        // if query unsuccessful (shouldn't happen if filter parameters are verified first)

      } else {
        console.log("Error in network request: " + req.statusText);
    }});

    req.send(JSON.stringify(payload));
  });

  document.getElementById("searchFranchiseButton").addEventListener("click", function(event) {
    var req = new XMLHttpRequest();

    var payload = {"action": "searchFranchise",
            "franchiseName": document.getElementById('searchFranchiseName').value,
            "franchiseDev": document.getElementById('searchFranchiseDev').value};

    req.open('POST', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400) {
        // POST request successful, check response for query status

        // if query successful,
          // use DOM to dynamically add query result table to webpage
          // reset filter fields?

        // if query unsuccessful (shouldn't happen if filter parameters are verified first)

      } else {
        console.log("Error in network request: " + req.statusText);
    }});

    req.send(JSON.stringify(payload));
  });

  // delete these after connecting to DB and running queries successfully
  Array.from(document.getElementsByClassName("updateButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
      document.getElementById("updateSuccessful").style.display = "block";
      setTimeout(function() {
        document.getElementById("updateSuccessful").style.display = "none"
      }, 1500);
    })
  });
  Array.from(document.getElementsByClassName("searchButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
      document.getElementById("searchResults").style.display = "block"
    })
  });
}