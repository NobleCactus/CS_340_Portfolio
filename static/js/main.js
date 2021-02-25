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
				res = JSON.parse(req.responseText);

				// clear out current elements in the search result table
				var prevTableRows = document.getElementsByClassName('searchResultRow');
				while (prevTableRows[0]) {
					prevTableRows[0].remove();
				}

				// add each new row into the search result table
				searchTable = document.getElementById('titlesTable');
				for (var i = 0; i < res.length; i++) {
					new_row = document.createElement('tr');
					new_row.setAttribute('class', 'searchResultRow');
					
					name_val = document.createElement('td');
					name_val.textContent = res[i][1];
					new_row.appendChild(name_val);

					// replace this with unordered list of platforms from TitlesPlatforms query
					plat_val = document.createElement('td');
					plat_val.textContent = "Platform List Query Results";
					new_row.appendChild(plat_val);

					release_val = document.createElement('td');
					release_val.textContent = res[i][2];
					new_row.appendChild(release_val);

					genre_val = document.createElement('td');
					genre_val.textContent = res[i][3];
					new_row.appendChild(genre_val);

					franchise_val = document.createElement('td');
					franchise_val.textContent = res[i][4];
					new_row.appendChild(franchise_val);

					dev_val = document.createElement('td');
					dev_val.textContent = res[i][5];
					new_row.appendChild(dev_val);

					esrb_val = document.createElement('td');
					esrb_val.textContent = res[i][6];
					new_row.appendChild(esrb_val);

					searchTable.appendChild(new_row);
				}

			} else {
				console.log("Error in network request: " + req.statusText);
			}
		});
		req.send(JSON.stringify(payload));
	});
}