/* 

*/

//***** VARIABLES *******/
let savedNotes = [];

let exEditor = false;

//*QUILL OPTIONS
let toolbarOptions = [
    ['bold', 'italic', 'underline',],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    [{ 'header': [1, 2, 3, false] }],   
];



const main = document.querySelector("main");
const notePreview = document.querySelector(".preview-notes");

//*Detta är en editorn
let note = document.querySelector("#editor")

// const btnSave = document.querySelector(".save");
const btnAdd = document.querySelector(".add");
const btnPrint = document.querySelector(".print");

/************************/
//***** QUILL *******/
/************************/

//let editor = new Quill('#editor', options);
let options =  {
    modules: {
        toolbar: toolbarOptions,
    },
    placeholder: 'Compose an epic story...', //placeholder text 
    readOnly: false, // kan bara läsa texten om true, kanske är so preview?
    theme: 'bubble'
}
let editor = new Quill('#editor', options);



/************************/
//***** FUNCTIONS *******/
/************************/


if (!localStorage.getItem('savedNotes') || localStorage.getItem('savedNotes').length < 0) {
    savedNotes = [];
  } else {
    savedNotes = JSON.parse(localStorage.getItem('savedNotes'));
  }

//*Hämtar data från local storage
load = () => {
    let stored = JSON.parse(localStorage.getItem("savedNotes"))
    console.log(stored)
    
}

//*En function där våran note skapas
function createNote() {

    if(exEditor == true){
        let r = confirm("Save?")
        if(r == true){
            onSave();
            exEditor = false;
            createNote();
        }else{
            exEditor = false;
            createNote();

        }
    } else {
           
        let date = new Date()
        newNote = new Note("New note", date.getTime(), " ", note, false)

        exEditor = true;
    }
}


//*När man klickar save så sparas texten fast texten sparas i html format som förut.
//*Varje gång man sparar så sparas det en ny note, fast den borde overwrita den man är på (?).
onSave = () =>{
    const title = document.querySelector(".title")

    //*Såhär får vi ut text content i enbart text format
    let contentText = tinymce.activeEditor.getContent({format: 'text'});

    //*Ifall vi behöver text content i html form så finns det här
    let contentHtml = tinymce.activeEditor.getContent({format: 'raw'});
    console.log("Content: " + contentHtml)
    

    console.log("Saved btn clicked")

    newNote.title = title.value;
    newNote.text = contentText;  

    savedNotes.push(newNote)

    localStorage.setItem("savedNotes", JSON.stringify(savedNotes))
    
}

/************************/
//***** FUNCTIONS *******/
/************************/

//*Varje gången sidan refreshas eller besöks så körs "load" functionen
window.onload = load();


class Note {
    constructor(title, date, text, note, star) {
        this.title = title,
        this.date = date,
        this.text = text,
        this.note = note,
        this.star = star,
        this.id = Date.now()
    }

    save() {
            
    }

}

btnAdd.addEventListener("click", () => {
    createNote();
})





//*För att kunna spara() och Auto save
/*
// Store accumulated changes
var change = new Delta();
quill.on('text-change', function(delta) {
  change = change.compose(delta);
});

// Save periodically
setInterval(function() {
  if (change.length() > 0) {
    console.log('Saving changes', change);
    /* 
    Send partial changes
    $.post('/your-endpoint', { 
      partial: JSON.stringify(change) 
    });
    
    Send entire document
    $.post('/your-endpoint', { 
      doc: JSON.stringify(quill.getContents())
    });
    change = new Delta();
    */
   
   /*
}
}, 5*1000);

// Check for unsaved data
window.onbeforeunload = function() {
if (change.length() > 0) {
  return 'There are unsaved changes. Are you sure you want to leave?';
}
}


*/