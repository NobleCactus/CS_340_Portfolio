document.addEventListener("DOMContentLoaded", bindButtons);


function bindButtons() {

	document.getElementById("selTitleSearch").addEventListener("click", function(event){
		document.getElementById("delDevSearch").style.display = "none";
		document.getElementById("delPlatSearch").style.display = "none";
		document.getElementById("delFranchiseSearch").style.display = "none";

		document.getElementById("delTitleSearch").style.display = "block";

		document.getElementById("delSuccessful").style.display = "none"
	});

	document.getElementById("selDevSearch").addEventListener("click", function(event){
		document.getElementById("delTitleSearch").style.display = "none";
		document.getElementById("delPlatSearch").style.display = "none";
		document.getElementById("delFranchiseSearch").style.display = "none";

		document.getElementById("delDevSearch").style.display = "block";

		document.getElementById("delSuccessful").style.display = "none"
	});

	document.getElementById("selPlatSearch").addEventListener("click", function(event){
		document.getElementById("delTitleSearch").style.display = "none";
		document.getElementById("delDevSearch").style.display = "none";
		document.getElementById("delFranchiseSearch").style.display = "none";

		document.getElementById("delPlatSearch").style.display = "block";

		document.getElementById("delSuccessful").style.display = "none"
	});

	document.getElementById("selFranchiseSearch").addEventListener("click", function(event){
		document.getElementById("delTitleSearch").style.display = "none";
		document.getElementById("delDevSearch").style.display = "none";
		document.getElementById("delPlatSearch").style.display = "none";

		document.getElementById("delFranchiseSearch").style.display = "block";

		document.getElementById("delSuccessful").style.display = "none"
	});

	Array.from(document.getElementsByClassName("delButton")).forEach(function(element) {
		element.addEventListener("click", function(event) {
		if (confirm('Are you sure you want delete this from the database?')) {
  		document.getElementById("delSuccessful").style.display = "block";
		setTimeout(function() {
		document.getElementById("delSuccessful").style.display = "none"
		}, 1500);
		} 
			;
		})
	});
}