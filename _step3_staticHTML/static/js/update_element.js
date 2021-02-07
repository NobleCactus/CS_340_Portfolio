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

	Array.from(document.getElementsByClassName("updateButton")).forEach(function(element) {
		element.addEventListener("click", function(event) {
			document.getElementById("updateSuccessful").style.display = "block";
			setTimeout(function() {
				document.getElementById("updateSuccessful").style.display = "none"
			}, 1500);
		})
	});
}