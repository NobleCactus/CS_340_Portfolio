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

				var prevTableRows = document.getElementsByClassName('searchResultRow');
				// clear out current elements in the table
				for (var i = 0; i < prevTableRows.length; i++) {
					prevTableRows[i].remove();
				}

				// add each new row into the search result table
				searchTable = document.getElementById('titlesTable');
				for (var i = 0; i < res.length; i++) {
					name = res[i][1];
					release = res[i][2];
					genre = res[i][3];
					franchise = res[i][4];
					dev = res[i][5];
					esrb = res[i][6];

					new_row = document.createElement('tr');
					new_row.setAttribute('class', 'searchResultRow');
					
					name_val = document.createElement('td');
					name_val.textContent = name;
					new_row.appendChild(name_val);

					// replace this with unordered list of platforms from TitlesPlatforms query
					plat_val = document.createElement('td');
					plat_val.textContent = "Platform List Query Results";
					new_row.appendChild(plat_val);

					release_val = document.createElement('td');
					release_val.textContent = release;
					new_row.appendChild(plat_val);

					genre_val = document.createElement('td');
					genre_val.textContent = genre;
					new_row.appendChild(genre_val);

					franchise_val = document.createElement('td');
					franchise_val.textContent = franchise;
					new_row.appendChild(franchise_val);

					dev_val = document.createElement('td');
					dev_val.textContent = dev;
					new_row.appendChild(dev_val);

					esrb_val = document.createElement('td');
					esrb_val.textContent = esrb;
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