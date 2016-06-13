
var Note = function(title, content){
	this.id = "",
	this.title = title,
	this.content = content
}
var Notes;
var newNoteId;

function init(){
	if (!localStorage.notes) {
        localStorage.notes = "{}";
    }
    Notes = JSON.parse(localStorage.getItem("notes"));
}
function createAndSaveNote(title, content){
	if(!newNoteId){
	 	var oNote= new Note(title, content);
	 	newNoteId = oNote.id = $.now();
	 	Notes[oNote.id]=JSON.stringify(oNote);
	}else{
		saveExistingNote(title,content, newNoteId);
	}
}

function saveExistingNote(title, content, id){
	var oNote = JSON.parse(Notes[id]);
	oNote.title = title;
	oNote.content = content;
	Notes[oNote.id]=JSON.stringify(oNote);
}

function saveNote(title, content, id){
	if(id){
		saveExistingNote(title,content,id);
	}else{
		createAndSaveNote(title,content);
	}
	saveNotesToStorage();
}

function loadNotes(){
	var output="";
	if(Object.keys(Notes).length > 0){
		for (var key in Notes) {
			var value = JSON.parse(Notes[key]);
	    	output += "<li data-icon='false'><a href=#editnote  id=ag"+value.id +">"+value.title+"</a></li>";
		}
	}else{
		output = "<li data-icon='false'>No notes data</li>";
	}
	return output;
}

function deleteNote(id){
	delete(Notes[id]);
	saveNotesToStorage();
}

function getNoteById(id){
	return JSON.parse(Notes[id]);
}

function saveNotesToStorage(){
	localStorage.setItem("notes",JSON.stringify(Notes));
}

function isTitleEmpty(title){
	if(title == "Title..." || title==""){
		return true;
	}
	return false;
}

function resetNoteId(){
	newNoteId = null;
}