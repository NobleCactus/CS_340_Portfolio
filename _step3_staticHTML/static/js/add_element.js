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

	Array.from(document.getElementsByClassName("addButton")).forEach(function(element) {
		element.addEventListener("click", function(event) {
			document.getElementById("addSuccessful").style.display = "block"
		})
	});
}