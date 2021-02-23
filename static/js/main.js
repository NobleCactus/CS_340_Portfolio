document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	document.getElementById("filterButton").addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		
		var payload = {"titleSearch": document.getElementById('titleSearch').value,
						"filterPlatform": document.getElementById('filterPlatform').value, 
						"fromDate": document.getElementById('fromDate').value, 
						"toDate": document.getElementById('toDate').value, 
						"genre": document.getElementById('filterGenre').value, 
						"franchise": document.getElementById('filterFranchise').value,
						"developer": document.getElementById('filterDev').value,
						"esrb": document.getElementById('filterESRB').value};

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
			}
		});

		req.send(JSON.stringify(payload));
	});
}