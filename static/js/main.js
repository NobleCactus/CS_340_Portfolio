document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	document.getElementById("filterButton").addEventListener('click', function(event){
		var req = new XMLHttpRequest();

		var payload = {"action": "searchTitle",
			            "titleName": document.getElementById('searchTitleName').value,
			            "titlePlatID": document.getElementById('searchTitlePlat').value, 
			            "titleFromDate": document.getElementById('titleFromDate').value, 
			            "titleToDate": document.getElementById('titleToDate').value, 
			            "titleGenre": document.getElementById('titleGenre').value, 
			            "titleFranchiseID": document.getElementById('titleFranchise').value,
			            "titleDevID": document.getElementById('titleDev').value,
			            "titleESRB": document.getElementById('titleESRB').value};

		req.open('POST', '/', true);
		req.setRequestHeader('Content-Type', 'application/json');

		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status < 400) {
				// POST request successful, check response for query status
				res = JSON.parse(req.responseText);
				console.log(res);	// to show the elements of what comes back

				// if query successful,
					// use DOM to clear current table
					// use DOM to dynamically add query result table to webpage
					// reset filter fields?

				// if query unsuccessful (shouldn't happen if filter parameters are verified first)

			} else {
				console.log("Error in network request: " + req.statusText);
			}
		});
		req.send(JSON.stringify(payload));
	});
}