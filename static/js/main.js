document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	document.getElementByid("filterButton").addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		
		var payload = {"titleSearch": document.getElementById('titleSearch').value,
						"filterPlatform": document.getElementById('filterPlatform').value, 
						"fromDate": document.getElementById('fromDate').value, 
						"toDate": document.getElementById('toDate').value, 
						"Genre": document.getElementById('filterGenre').value, 
						"Franchise": document.getElementById('filterFranchise').value,
						"Developer": document.getElementById('filterDev').value,
						"ESRB": document.getElementById('filterESRB').value};

		req.open('POST', '/', false);
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(JSON.stringify(payload));
	});
}