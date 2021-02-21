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
		var req = new XMLHttpRequest();
		
		var title_plat = new Array();
		var i = 0;
		Array.from(document.getElementsByClassName("addTitlePlat")).forEach(function(element) {
			if (element.checked){
				title_plat[i] = element.value
				i++;
			}
		});

		var payload = {"action": "addTitle",
						"titleName": document.getElementById('addTitleName').value,
						"titlePlat": title_plat,
						"titleRelease": document.getElementById('addTitleDate').value, 
						"Genre": document.getElementById('addTitleGenre').value, 
						"Franchise": document.getElementById('addTitleFranchise').value,
						"Developer": document.getElementById('addTitleDev').value,
						"ESRB": document.getElementById('titleESRB').value};

		req.open('POST', '/add', false);
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(JSON.stringify(payload));
	});

	document.getElementById("addDevButon").addEventListener('click', function(event){
		var req = new XMLHttpRequest();

		var payload = {"action": "addDev",
						"devName": document.getElementById('addDevName').value,
						"devCountry": document.getElementById('addDevCountry').value,
						"devDate": document.getElementById('addDevDate').value};

		req.open('POST', '/add', false);
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(JSON.stringify(payload));
	});

	document.getElementById("addPlatButton").addEventListener('click', function(event){
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

		req.open('POST', '/add', false);
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(JSON.stringify(payload));
	});

	document.getElementById("addFranchiseButton").addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		
		var payload = {"action": "addFranchise",
						"franchiseName": document.getElementById('addFranchiseName').value,
						"franchiseDev": document.getElementById('addFranchiseDev').value};

		req.open('POST', '/add', false);
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(JSON.stringify(payload));
	});

	Array.from(document.getElementsByClassName("addButton")).forEach(function(element) {
		element.addEventListener("click", function(event) {
			document.getElementById("addSuccessful").style.display = "block";
			setTimeout(function() {
				document.getElementById("addSuccessful").style.display = "none"
			}, 1500);
		})
	});
}