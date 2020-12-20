// Good movies app
// By: Kevin Mitchell

// Initial values

var editScreen = false;
const apiURL = 'https://kevintmitchell.info:8080/api/v1/movies/';
// ----------



// Header bar transition

// --------

document.querySelector(".headerBar").style.transition = ".7s cubic-bezier(.11,.66,.29,1.02)";
document.querySelector(".headerBar").style.width = "100%";


// ---------

// Get all method 

// ----------

function getAll() {
fetch(apiURL).then(response => response.json()).then(data => extract(data))

function extract(data) {
	for (i = 0;i < data.data.length;i++) {
		var id = data.data[i].id;
		var title = data.data[i].title;
		var why = data.data[i].why;
		document.getElementById("collection").appendChild(createDiv(id,title,why));    
	}
	
	
}

function createDiv(id,title,why) {
	var div = document.createElement("div");
		div.className = "sample";
		div.id = "sample[" + id +"]";
		div.innerHTML = "<div class=\"buttons\"><img id=\"editButton\" class=\"editButton\" src=\"images/editButton.svg\" alt=\"Edit movie\" onmouseover=\"this.src='images/editHover.svg';\" onmouseout=\"this.src='images/editButton.svg';\" onclick=\"edits(this.parentElement.parentElement.id);\"><img id=\"deleteButton\" class=\"deleteButton\" src=\"images/deleteButton.svg\" alt=\"Delete movie\" onmouseover=\"this.src='images/deleteButtonhover.svg';\" onmouseout=\"this.src='images/deleteButton.svg'\" onclick=\"deletes(this.parentElement.parentElement.id);\"></div><div id=\"bodyInfo\"><h3>" + title + "</h3><b><h4>Why it is a good movie:</h4></b><p>" + why + "</p><input type=\"hidden\" id=\"id\" value=\"" + id + "\"></div>";

		return div;
}
}



function displayDeleteBox() {
	
}


// --------

// Add methods

// ----------

// Open add movie
function addScreen() {
	document.querySelector(".addBox").style.transition = "opacity .4s ease-out";
	document.querySelector(".addBox").style.display = "inline";
	document.querySelector(".addBox").style.opacity = "100";
	document.querySelector(".addBox").style.zIndex = "5";
	document.querySelector(".hider").style.display = "inline";
	document.body.className = "stop-scrolling";
}

// Confirm add new movie
function saveMovie() {
	var title = document.getElementById("movieTitle").value;
	var why = document.getElementById("movieWhy").value;
	var objectJ = {
		title: title,
		why: why
	}
	var jsonOb = JSON.stringify(objectJ);
	
	fetch(apiURL, {method: 'POST', body: jsonOb, headers: { 
		"Content-type": "application/json;charset=UTF-8"
	}}).then(function(){
		document.getElementById("collection").innerHTML = "";
				//restart page
				getAll();

				document.querySelector(".hider").style.display = "none";
				document.querySelector(".addBox").style.display = "none";
				document.querySelector(".hider").style.top = 0 + "px";
				document.getElementById("movieWhy").value = "";
				document.getElementById("movieTitle").value = "";
				document.getElementById("saveButton").className = "addButtonsDis";
				document.getElementById("saveButton").disabled = "true";
				document.getElementById("saveButton").setAttribute('onclick', '');
				document.querySelector(".addBox").style.transition = "none";
				document.querySelector(".addBox").style.display = "none";
				document.querySelector(".addBox").style.opacity = "0";
				document.querySelector(".addBox").style.zIndex = "-2";
				document.querySelector(".addBox").style.display = "inline";

				document.body.className = "";
	})
}

// Cancel Add movie
function cancelAdd() {
	document.querySelector(".hider").style.display = "none";
	document.querySelector(".addBox").style.transition = "none";
	document.querySelector(".addBox").style.display = "none";
	document.querySelector(".addBox").style.opacity = "0";
	document.querySelector(".addBox").style.zIndex = "-2";
	document.querySelector(".addBox").style.display = "inline";
	document.querySelector(".hider").style.top = 0 + "px";
	document.body.className = "";
}
// --------

// Edit methods

// ----------

// Open edit screen for movie by div id
function edits(id) {
	if (editScreen==false) {
		var movieID = document.getElementById(id).getElementsByTagName("INPUT")[0].value;
		var movieTitle = document.getElementById(id).getElementsByTagName("H3")[0].innerHTML;
		var movieWhy = document.getElementById(id).getElementsByTagName("P")[0].innerHTML;

		document.getElementById(id).querySelector("#bodyInfo").innerHTML = "<div class=\"fields\"><input type=\"hidden\" id=\"editMovieID\" value=\"" + movieID + "\"><label for=\"title\" class=\"editFormText\">Title:</label><br><input type=\"text\" name=\"title\" id=\"editMovieTitle\" class=\"editFormInputText\" onkeyup=\"validateEditForm();\" autocomplete=\"off\" value=\"" + movieTitle + "\"><br><label for=\"why\" class=\"editFormText\">Why is it a good movie?</label><br><textarea name=\"why\" id=\"editMovieWhy\" class=\"editFormTextArea\" onkeyup=\"validateEditForm();\">" + movieWhy + "</textarea></div><div class=\"editButtonsDiv\"><div id=\"saveEditButton\" class=\"editButtonsDis\" type=\"button\" value=\"Save\" onclick=\"\">Save</div><div id=\"cancelEditButton\" class=\"editButtons\" type=\"button\" value=\"Cancel\" onclick=\"cancelEdit();\">Cancel</div></div>";
		editScreen = true;
		validateEditForm();
	} 
}

// Confirm edit movie
function saveEdit() {
	var movieID = document.getElementById("editMovieID").value;
	var movieTitle = document.getElementById("editMovieTitle").value;
	var movieWhy = document.getElementById("editMovieWhy").value;
	var objectJ = {
		title: movieTitle,
		why: movieWhy
	}
	var jsonOb = JSON.stringify(objectJ);
	fetch(apiURL + movieID, {method: 'PUT', body: jsonOb, headers: { 
		"Content-type": "application/json;charset=UTF-8"
	}}).then(function(){
		document.getElementById("collection").innerHTML = "";
				//restart page
				document.getElementById("collection").innerHTML = "";
				editScreen = false;
				getAll();
	})
}

// Cancel edit movie
function cancelEdit() {
	document.getElementById("collection").innerHTML = "";
	editScreen = false;
	getAll();
}
//---------

// Delete methods

//-------

// Open delete screen for movie
function deletes(id) {
	if (editScreen==true) {
		return;
	}
	let movieName = document.getElementById(id).getElementsByTagName("H3")[0].innerHTML;
	document.querySelector(".deleteBox").getElementsByTagName("H3")[0].innerHTML = "Are you sure you want to delete the movie called \"" + movieName + "\"?";
	let c = document.documentElement.scrollTop;
	
	document.querySelector(".hider").style.display = "inline";
	document.querySelector(".deleteBox").style.display = "inline";
	var boxStyle = document.querySelector(".deleteBox").style;
	document.querySelector(".hider").style.top = c + "px";
	document.querySelector(".deleteBox").style.top = c + 150 + "px";
	document.body.className = "stop-scrolling";
	
	let appID = document.getElementById(id).getElementsByTagName("INPUT")[0].value;
	document.getElementById("movieToDelete").value = appID;
			
}

// Confirm delete movie
function deleteMovie(id) {
	fetch(apiURL + id, {method: 'DELETE'}).then(function() {
		document.getElementById("collection").innerHTML = "";
		getAll();
		document.querySelector(".hider").style.display = "none";
		document.querySelector(".deleteBox").style.display = "none";
		document.querySelector(".hider").style.top = 0 + "px";
		document.querySelector(".deleteBox").style.top = 75 + "px";
		document.body.className = "";
})}

// Cancel delete movie
function deleteNo() {
	document.querySelector(".hider").style.display = "none";
	document.querySelector(".deleteBox").style.display = "none";
	document.querySelector(".hider").style.top = 0 + "px";
	document.querySelector(".deleteBox").style.top = 75 + "px";
	document.body.className = "";
}

// Get Id of movie to delete

function getDeleteID() {
	return document.getElementById("movieToDelete").value;
}

// ----------

// Validators

// ---------

// Enables save button when both fields have at least one character. On Add screen

function validateForm() {
	var valid = false;

	if (!(document.getElementById("movieTitle").value=="") && !(document.getElementById("movieWhy").value=="")) {
		valid = true;
	}
	if (valid==true) {
		document.getElementById("saveButton").className = "saveButton";
		document.getElementById("saveButton").disabled = "false";
		document.getElementById("saveButton").setAttribute('onclick', 'saveMovie();');
	} else {
		document.getElementById("saveButton").className = "addButtonsDis";
		document.getElementById("saveButton").disabled = "true";
		document.getElementById("saveButton").setAttribute('onclick', '');
	}
}

// Enables save button when both fields have at least one character. On Edit screen

function validateEditForm() {
	var valid = false;

	if (!(document.getElementById("editMovieTitle").value=="") && !(document.getElementById("editMovieWhy").value=="")) {
		valid = true;
	}
	if (valid==true) {
		document.getElementById("saveEditButton").className = "editSaveButton";
		document.getElementById("saveEditButton").disabled = "false";
		document.getElementById("saveEditButton").setAttribute('onclick', 'saveEdit();');
	} else {
		document.getElementById("saveEditButton").className = "editButtonsDis";
		document.getElementById("saveEditButton").disabled = "true";
		document.getElementById("saveEditButton").setAttribute('onclick', '');
	}
}

// ------------

// Calls

// -----------

// Call read all on page startup

getAll();
