document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons() {
	document.getElementById("selTitleSearch").addEventListener("click", function(event){
		document.getElementById("delDevSearch").style.display = "none";
		document.getElementById("delPlatSearch").style.display = "none";
		document.getElementById("delFranchiseSearch").style.display = "none";

		document.getElementById("delTitleSearch").style.display = "block";
	})

	document.getElementById("selDevSearch").addEventListener("click", function(event){
		document.getElementById("delTitleSearch").style.display = "none";
		document.getElementById("delPlatSearch").style.display = "none";
		document.getElementById("delFranchiseSearch").style.display = "none";

		document.getElementById("delDevSearch").style.display = "block";
	})

	document.getElementById("selPlatSearch").addEventListener("click", function(event){
		document.getElementById("delTitleSearch").style.display = "none";
		document.getElementById("delDevSearch").style.display = "none";
		document.getElementById("delFranchiseSearch").style.display = "none";

		document.getElementById("delPlatSearch").style.display = "block";
	})

	document.getElementById("selFranchiseSearch").addEventListener("click", function(event){
		document.getElementById("delTitleSearch").style.display = "none";
		document.getElementById("delDevSearch").style.display = "none";
		document.getElementById("delPlatSearch").style.display = "none";

		document.getElementById("delFranchiseSearch").style.display = "block";
	})
}