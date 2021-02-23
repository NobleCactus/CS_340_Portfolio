document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons() {
	document.getElementById("selTitleAdd").addEventListener("click", function(event){
		document.getElementById("addDev").style.display = "none";
		document.getElementById("addPlat").style.display = "none";
		document.getElementById("addFranchise").style.display = "none";

		document.getElementById("addTitle").style.display = "block";

		document.getElementById("addSuccessful").style.display = "none"
	});

	document.getElementById("selDevAdd").addEventListener("click", function(event){
		document.getElementById("addTitle").style.display = "none";
		document.getElementById("addPlat").style.display = "none";
		document.getElementById("addFranchise").style.display = "none";

		document.getElementById("addDev").style.display = "block";

		document.getElementById("addSuccessful").style.display = "none"
	});

	document.getElementById("selPlatAdd").addEventListener("click", function(event){
		document.getElementById("addTitle").style.display = "none";
		document.getElementById("addDev").style.display = "none";
		document.getElementById("addFranchise").style.display = "none";

		document.getElementById("addPlat").style.display = "block";

		document.getElementById("addSuccessful").style.display = "none"
	});

	document.getElementById("selFranchiseAdd").addEventListener("click", function(event){
		document.getElementById("addTitle").style.display = "none";
		document.getElementById("addDev").style.display = "none";
		document.getElementById("addPlat").style.display = "none";

		document.getElementById("addFranchise").style.display = "block";

		document.getElementById("addSuccessful").style.display = "none"
	});

	document.getElementById("addTitleButton").addEventListener('click', function(event){
		// get an array of checked platforms
		var title_plat = new Array();
		var i = 0;
			Array.from(document.getElementsByClassName("addTitlePlat")).forEach(function(element) {
				if (element.checked){
					title_plat[i] = element.value
					i++;
				}
			});
		
		// verify not NULL parameters have values
		if (document.getElementById('addTitleName').value == "" ||
			document.getElementById('addTitleDate').value == "" ||
			document.getElementById('addTitleDev').value == "" ||
			title_plat.length == 0) {
			if (document.getElementById('addTitleName').value == "") {
				document.getElementById('noTitleName').style.display = "inline";
			}
			if (document.getElementById('addTitleDate').value == "") {
				document.getElementById('noTitleDate').style.display = "inline";
			}
			if (document.getElementById('addTitleDev').value == "") {
				document.getElementById('noTitleDev').style.display = "inline";
			}
			if (title_plat.length == 0) {
				document.getElementById('noTitlePlat').style.display = "inline";
			}
		} else {
			var req = new XMLHttpRequest();

			var payload = {"action": "addTitle",
							"titleName": document.getElementById('addTitleName').value,
							"titlePlat": title_plat,
							"titleRelease": document.getElementById('addTitleDate').value, 
							"titleGenre": document.getElementById('addTitleGenre').value, 
							"titleFranchise": document.getElementById('addTitleFranchise').value,
							"titleDev": document.getElementById('addTitleDev').value,
							"titleESRB": document.getElementById('titleESRB').value};

			req.open('POST', '/add', true);
			req.setRequestHeader('Content-Type', 'application/json');

			req.addEventListener('load', function(){
				if (req.status >= 200 && req.status < 400) {
					// POST request successful, check response for query status
					res = JSON.parse(req.responseText);
					console.log(res);	// to show the elements of what comes back

					// if query successful
						document.getElementById("addSuccessful").style.display = "block";
						setTimeout(function() {
							document.getElementById("addSuccessful").style.display = "none"
						}, 1500);


					// if query unsuccessful (find out what is sent for a failed query)
						/* show add failed message and delayed disappear
						
						document.getElementById("addFailed").style.display = "block";
						setTimeout(function() {
							document.getElementById("addFailed").style.display = "none"
						}, 1500);

						*/
				} else {
					console.log("Error in network request: " + req.statusText);
			}});
			req.send(JSON.stringify(payload));

			document.getElementById('noTitleName').style.display = "none";
			document.getElementById('noTitleDate').style.display = "none";
			document.getElementById('noTitleDev').style.display = "none";
			document.getElementById('noTitlePlat').style.display = "none";
		}
	});

	document.getElementById("addDevButton").addEventListener('click', function(event){
		// verify not NULL parameters have values
		if (document.getElementById('addDevName').value == "" ||
			document.getElementById('addDevCountry').value == "" ||
			document.getElementById('addDevDate').value == "") {
			if (document.getElementById('addDevName').value == "") {
				document.getElementById('noDevName').style.display = "inline";
			}
			if (document.getElementById('addDevCountry').value == "") {
				document.getElementById('noDevCountry').style.display = "inline";
			}
			if (document.getElementById('addDevDate').value == "") {
				document.getElementById('noDevDate').style.display = "inline";
			}
		} else {
			var req = new XMLHttpRequest();

			var payload = {"action": "addDev",
							"devName": document.getElementById('addDevName').value,
							"devCountry": document.getElementById('addDevCountry').value,
							"devDate": document.getElementById('addDevDate').value};

			req.open('POST', '/add', true);
			req.setRequestHeader('Content-Type', 'application/json');

			req.addEventListener('load', function(){
				if (req.status >= 200 && req.status < 400) {
					// POST request successful, check response for query status
					res = JSON.parse(req.responseText);
					console.log(res);	// to show the elements of what comes back

					// if query successful
						document.getElementById("addSuccessful").style.display = "block";
						setTimeout(function() {
							document.getElementById("addSuccessful").style.display = "none"
						}, 1500);

					// if query unsuccessful
						/* show add failed message and delayed disappear
						
						document.getElementById("addFailed").style.display = "block";
						setTimeout(function() {
							document.getElementById("addFailed").style.display = "none"
						}, 1500);

						*/
				} else {
					console.log("Error in network request: " + req.statusText);
			}});

			req.send(JSON.stringify(payload));

			document.getElementById('noDevName').style.display = "none";
			document.getElementById('noDevCountry').style.display = "none";
			document.getElementById('noDevDate').style.display = "none";
		}
	});

	document.getElementById("addPlatButton").addEventListener('click', function(event){
		// verify not NULL parameters have values
		var inProdCheck = Array.from(document.getElementsByClassName("addPlatInProd"));
			if (inProdCheck[0].checked) {
				inProdCheck = "Yes";
			} else if (inProdCheck[1].checked) {
				inProdCheck = "No";
			} else {
				inProdCheck = "";
			}

		if (document.getElementById('addPlatName').value == "" ||
			document.getElementById('addPlatDate').value == "" ||
			document.getElementById('addPlatDev').value == "" ||
			inProdCheck == "") {
			if (document.getElementById('addPlatName').value == "") {
				console.log("FOUND AN EMPTY PARAMETER");
				document.getElementById('noPlatName').style.display = "inline";
			}
			if (document.getElementById('addPlatDate').value == "") {
				document.getElementById('noPlatDate').style.display = "inline";
			}
			if (document.getElementById('addPlatDev').value == "") {
				document.getElementById('noPlatDev').style.display = "inline";
			}
			if (inProdCheck == "") {
				document.getElementById('noPlatInProd').style.display = "inline";
			}
		} else {
			var req = new XMLHttpRequest();

			var inProdCheck = Array.from(document.getElementsByClassName("addPlatInProd"));
			if (inProdCheck[0].checked) {
				inProdCheck = 1;
			} else if (inProdCheck[1].checked) {
				inProdCheck = 0;
			} else {
				inProdCheck = "";
			}

			var payload = {"action": "addPlat",
							"platName": document.getElementById('addPlatName').value,
							"platDate": document.getElementById('addPlatDate').value,
							"platDev": document.getElementById('addPlatDev').value,
							"platInProd": inProdCheck};

			req.open('POST', '/add', true);
			req.setRequestHeader('Content-Type', 'application/json');

			req.addEventListener('load', function(){
				if (req.status >= 200 && req.status < 400) {
					// POST request successful, check response for query status
					res = JSON.parse(req.responseText);
					console.log(res);	// to show the elements of what comes back

					// if query successful
						document.getElementById("addSuccessful").style.display = "block";
						setTimeout(function() {
							document.getElementById("addSuccessful").style.display = "none"
						}, 1500);

					// if query unsuccessful
						/* show add failed message and delayed disappear
						
						document.getElementById("addFailed").style.display = "block";
						setTimeout(function() {
							document.getElementById("addFailed").style.display = "none"
						}, 1500);

						*/
				} else {
					console.log("Error in network request: " + req.statusText);
			}});

			req.send(JSON.stringify(payload));

			document.getElementById('noPlatName').style.display = "none";
			document.getElementById('noPlatDate').style.display = "none";
			document.getElementById('noPlatDev').style.display = "none";
			document.getElementById('noPlatInProd').style.display = "none";
		}
	});

	document.getElementById("addFranchiseButton").addEventListener('click', function(event){
		// verify not NULL parameters have values
		if (document.getElementById('addFranchiseName').value == "" ||
			document.getElementById('addFranchiseDev').value == "") {
			if (document.getElementById('addFranchiseName').value == "") {
				document.getElementById('noFranchiseName').style.display = "inline";
			}
			if (document.getElementById('addFranchiseDev').value == "") {
				document.getElementById('noFranchiseDev').style.display = "inline";
			}
		} else {
			var req = new XMLHttpRequest();
			
			var payload = {"action": "addFranchise",
							"franchiseName": document.getElementById('addFranchiseName').value,
							"franchiseDev": document.getElementById('addFranchiseDev').value};

			req.open('POST', '/add', true);
			req.setRequestHeader('Content-Type', 'application/json');

			req.addEventListener('load', function(){
				if (req.status >= 200 && req.status < 400) {
					// POST request successful, check response for query status
					res = JSON.parse(req.responseText);
					console.log(res);	// to show the elements of what comes back

					// if query successful
						show add successful message and delayed disappear
						
						document.getElementById("addSuccessful").style.display = "block";
						setTimeout(function() {
							document.getElementById("addSuccessful").style.display = "none"
						}, 1500);

					// if query unsuccessful
						/* show add failed message and delayed disappear
						
						document.getElementById("addFailed").style.display = "block";
						setTimeout(function() {
							document.getElementById("addFailed").style.display = "none"
						}, 1500);

						*/
				} else {
					console.log("Error in network request: " + req.statusText);
			}});

			req.send(JSON.stringify(payload));

			document.getElementById('noFranchiseName').style.display = "none";
			document.getElementById('noFranchiseDev').style.display = "none";
		}
	});
}