document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons() {
  document.getElementById("selTitleSearch").addEventListener("click", function(event){
    document.getElementById("delDevSearch").style.display = "none";
    document.getElementById("delPlatSearch").style.display = "none";
    document.getElementById("delFranchiseSearch").style.display = "none";

    document.getElementById("delTitleSearch").style.display = "block";

    document.getElementById("delSuccessful").style.display = "none"
  });

  document.getElementById("selDevSearch").addEventListener("click", function(event){
    document.getElementById("delTitleSearch").style.display = "none";
    document.getElementById("delPlatSearch").style.display = "none";
    document.getElementById("delFranchiseSearch").style.display = "none";

    document.getElementById("delDevSearch").style.display = "block";

    document.getElementById("delSuccessful").style.display = "none"
  });

  document.getElementById("selPlatSearch").addEventListener("click", function(event){
    document.getElementById("delTitleSearch").style.display = "none";
    document.getElementById("delDevSearch").style.display = "none";
    document.getElementById("delFranchiseSearch").style.display = "none";

    document.getElementById("delPlatSearch").style.display = "block";

    document.getElementById("delSuccessful").style.display = "none"
  });

  document.getElementById("selFranchiseSearch").addEventListener("click", function(event){
    document.getElementById("delTitleSearch").style.display = "none";
    document.getElementById("delDevSearch").style.display = "none";
    document.getElementById("delPlatSearch").style.display = "none";

    document.getElementById("delFranchiseSearch").style.display = "block";

    document.getElementById("delSuccessful").style.display = "none"
  });

  document.getElementById("searchTitleButton").addEventListener("click", function(event) {
    var req = new XMLHttpRequest();
    
    var payload = {"action": "searchTitle",
            "titleName": document.getElementById('searchTitleName').value,
            "titlePlatID": document.getElementById('searchTitlePlatID').value, 
            "titleFromDate": document.getElementById('titleFromDate').value, 
            "titleToDate": document.getElementById('titleToDate').value, 
            "titleGenre": document.getElementById('titleGenre').value, 
            "titleFranchiseID": document.getElementById('titleFranchiseID').value,
            "titleDevID": document.getElementById('titleDevID').value,
            "titleESRB": document.getElementById('titleESRB').value};

    req.open('POST', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400) {
        // POST request successful, check response for query status

        // if query successful,
          // use DOM to dynamically add query result table to webpage
          // special consideration for how to add a list of platforms
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
    var payload = {"action": "searchFranchise",
            "franchiseName": document.getElementById('searchFranchiseName').value,
            "franchiseDev": document.getElementById('searchFranchiseDev').value};

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

  Array.from(document.getElementsByClassName("delButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
      console.log(event.target.value);
    	if (confirm('Are you sure you want to delete this from the database?')) {
  			document.getElementById("delSuccessful").style.display = "block";
      		setTimeout(function() {
        	document.getElementById("delSuccessful").style.display = "none"
      		}, 1500);
		  } 
    })
  });

  Array.from(document.getElementsByClassName("searchButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
      document.getElementById("searchResults").style.display = "block"
    })
  });
}