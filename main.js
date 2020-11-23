/* 
Måste få in varje ny note i preview och spara de där.
Sen ska man kunna bläddra bland alla notes man skapat.

Klickar ny så cleares det gamla och laddar den man klickar på (?)

Typ fixat nya saker men måste kollar mer, är nog på rätt spår kanske :/

//*Spara html som skapas i aside i noteObj och sen spara det i local storage som vanligt
//*När sidan laddas så görs det en check ifall något finns i lokal storage och om det finns så tar den det
//*Och med html så addar den det till aside som vanligt.
*/

//***** ARRAYS *******/
let savedNotes = [];
let noteObjects = [];

let exEditor = false;

const main = document.querySelector("main");
const notePreview = document.querySelector(".preview-notes");

const note = document.querySelector(".wrapper");

const btnSave = document.querySelector(".save");
const btnAdd = document.querySelector(".add");
const btnPrint = document.querySelector(".print");

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
    
    //*Här skapas textarean som tiny behöver innan tiny skapas  
    let html = `
    <div class="prompt">
        <label>Title:</label>
        <input class="title" type="text">

        <label>Author:</label>
        <input class="author" type="text">
    </div>
    <textarea class="mytextarea">Text here</textarea>
    `;


    //*Här lägger vi till textarean i form
    note.innerHTML = html;


    //*TinyMCE initar först när vi klickar på ny note knappen, så den skapas när man klickar på knappen
    /* Tiny MCE */
    tinymce.init({
        selector: '.mytextarea',
        height: 600,
        menubar: true,
        plugins: 'save',
        toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | save',
        save_onsavecallback: "onSave"

    });

    //let content = tinymce.get("mytextarea").getContent()
    let date = new Date()
    newNote = new Note("New note", "No author", date.getTime(), "content", note, false)

    exEditor = true;
}
}
//console.log(exEditor);
//*När man klickar på save så savear man en ny titel man skriver och även authorn
onSave = () =>{
    const title = document.querySelector(".title")
    const author = document.querySelector(".author")

    newNote.title = title.value;
    newNote.author = author.value;  
        
    savedNotes.push(newNote)

    localStorage.setItem("savedNotes", JSON.stringify(savedNotes))
             
    //*Denna resetar text fieldsen
    note.reset();
    console.log("prompt clicked")
}

/************************/
//***** FUNCTIONS *******/
/************************/

//*Varje gången sidan refreshas eller besöks så körs "load" functionen
window.onload = load();


class Note {
    constructor(title, author, date, text, note, star) {
        this.title = title,
        this.author = author,
        this.date = date,
        this.text = text,
        this.note = note,
        this.id = Date.now(),
        this.star = star
    }

    save() {
        let content = tinymce.get("mytextarea").getContent()
        newNote.text = content;     
    }

}

btnAdd.addEventListener("click", () => {
    // if (exEditor = true){
    //     console.log("True")
    // }else{
    //     console.log("False")
        
    // }
        
    createNote();  
     
})

// btnPrint.addEventListener("click", () => {
//     note1.print()
// })

btnSave.addEventListener("click", () => {
    console.log("save")
    newNote.save();
})



// //*Måste göra om detta
    // previewHtml = `
    // <div>
    // <a href="#">
    //     <h3>Title</h3>    
    // </a>
    // </div> 
    // `;

    // noteObj = {
    //     note: newNote.id,
    //     previewSpot: previewHtml
    // }

    // notePreview.innerHTML += previewHtml;


    // noteObjects.push(noteObj)

    // localStorage.setItem("noteObjects", JSON.stringify(noteObjects))