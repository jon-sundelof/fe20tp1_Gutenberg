//Import fonts for quill
let Font = Quill.import('formats/font');
Font.whitelist = ['times-new-roman', 'arial', 'roboto', 'comic-neue'];
Quill.register(Font, true);

//*QUILL OPTIONS
let toolbarOptions = [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    [{ 'header': [1, 2, 3, false] }],
    [{ 'font': ['', 'times-new-roman', 'arial', 'roboto', 'comic-neue'] }],
    //['image']
];

//Generates string for date. Mabye go with "localDateString" instead? 
const datum = new Date();
const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());


//const printscreen = document.querySelector('.printscreen')
const notePreview = document.querySelector(".preview-notes");


//Variable for the editor. ()
const note = document.querySelector("#editor")
const innerText = document.querySelector(".ql-editor")

//Variables for the buttons
const btnAdd = document.querySelector(".add");
const btnPrint = document.querySelector(".print");

//Variable for the title input
const titleInput = document.querySelector("#title-input")

//Variabels for CurrentNoteId and currentNote
let currentNoteId;
let currentNote;


/************************/
//******** QUILL ********/
/************************/
let options = {
    modules: {
        toolbar: toolbarOptions,
    },
    placeholder: 'Compose an epic story...', //placeholder text 
    readOnly: false, // kan bara läsa texten om true, kanske är so preview?
    theme: 'bubble'
}

//var Delta = Quill.import('delta'); // provar delta
let editor = new Quill('#editor', options);
/* function getQuillHtml() { return editor.root.innerHTML; } //getQuillHtml() tar html texten från quill-editorn |Delta kan vara bättre */
const getQuillContents = editor.getContents();
const getQuillText = editor.getText();


//*En array där vi sparar våra notes
let savedNotes = [];

if (!localStorage.getItem('savedNotes') || localStorage.getItem('savedNotes').length < 0) {
    savedNotes = [];
} else {
    savedNotes = JSON.parse(localStorage.getItem('savedNotes'));

    buildPreviewWind();
}

//*Hämtar data från local storage
load = () => {

    let stored = JSON.parse(localStorage.getItem("savedNotes"));
    console.log(stored);

}



/************************/
//**** NOTE KLASSEN *****/
/************************/
class Note {
    constructor(title, date, text, star, content = editor.getContents(), tag) {
        this.title = title,
            this.date = date,
            this.text = text,
            this.star = star,
            this.content = content,
            this.tag = tag,
            this.id = Date.now()
    }
}

//////////////////////////////////////////// FUNKTIONER  //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function buildPreviewWind() {
    for (let i = 0; i < savedNotes.length; i++) {
        const preDiv = document.createElement("div");
        preDiv.innerHTML = `<h3>${savedNotes[i].title.substr(0, 15)}</h3><p>${savedNotes[i].text.substr(0, 60)}</p><p class="pretime">${savedNotes[i].date}</p>`;
        preDiv.setAttribute('class', 'preDiv');
        preDiv.setAttribute('id', savedNotes[i].id);
        notePreview.prepend(preDiv);
    }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateArrRebuild() {
    /* De-builds the preview-window so i can be built up again with regards to updated array */
    // for (var i = 0; i < previewDiv.length; i++) {
    //     //RIP QUILL :(
    //     previewDiv = TinyMCE(Quill.editor);

    //     //previewDiv[i].parentNode.removeChild(previewDiv[i]);
    // }

    for (let i = 0; i < savedNotes.length; i++) {
        if (currentNoteId == savedNotes[i].id.toString()) {

            savedNotes[i].title = titleInput.value;
            savedNotes[i].date = date;
            savedNotes[i].text = editor.getText();
            savedNotes[i].star = false;
            savedNotes[i].content = editor.getContents();

            let selectedDiv = document.getElementById(currentNoteId);

            console.log(selectedDiv);

            selectedDiv.innerHTML = `<h3>${savedNotes[i].title.substr(0, 15)}</h3><p>${savedNotes[i].text.substr(0, 60)}</p><p class="pretime">${savedNotes[i].date}</p>`;

        }
    }

    /*  savedNotes.push(newNote); */
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    /*  buildPreviewWind(); */
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createNewNote() {
    titleInput.value = "New Note";
    editor.setContents();

    let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents);

    const preDiv = document.createElement("div");
    preDiv.setAttribute('class', 'preDiv');
    preDiv.setAttribute('id', newNote.id);
    notePreview.prepend(preDiv);
    preDiv.innerHTML = `<h3>${titleInput.value}</h3>`;

    savedNotes.push(newNote);
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));


    currentNote = newNote;
    currentNoteId = newNote.id;

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Eventlistener for the preview-divs. On-click sets title of clicked id in editor. 

let previewDiv = document.querySelectorAll('.preDiv');


[...document.querySelectorAll('.preDiv')].forEach(function (item) {
    item.addEventListener('click', function () {
        console.log("Click")
        for (let i = 0; i < savedNotes.length; i++) {
            if (item.id == savedNotes[i].id.toString()) {

                editor.setContents(savedNotes[i].content);
                titleInput.value = savedNotes[i].title;

                currentNoteId = item.id;
                console.log("Current note id: " + currentNoteId)

            }
        }

    });
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
setInterval(() => {

    //Checks if the array is empty or if CurrentNoteId is undefined. In those cases it creates a new note. Otherwise it uppdates the current one.
    if (savedNotes.length <= 0 || currentNoteId == undefined) {
        let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents);

        const preDiv = document.createElement("div");
        preDiv.setAttribute('class', 'preDiv');
        preDiv.setAttribute('id', newNote.id);
        notePreview.prepend(preDiv);


        savedNotes.push(newNote);
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

        currentNote = newNote;
        currentNoteId = newNote.id;

        previewDiv = document.querySelectorAll('.preDiv');

    } else {
        //om inget värde i editor, spara inte note och preview
        updateArrRebuild();
    }

    console.log("SAVED")
}, 4000);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//*PRINT
btnPrint.addEventListener("click", () => {
    //window.print(delta);
    //content = JSON.stringify(quill.getContents());
    //console.log(getQuillHtml());
    content = getQuillContents;
    let divContents = content;
    let openWindow = window.open("", "", "width=700, height=900");
    openWindow.document.write('<html>');
    openWindow.document.write('<body>');
    openWindow.document.write(divContents);
    openWindow.document.write('</body></html>');
    openWindow.document.close();
    openWindow.print();
})

/* function printInfo(ele) {
  var openWindow = window.open("", "title", "attributes");
  openWindow.document.write(ele.previousSibling.innerHTML);
  openWindow.document.close();
  openWindow.focus();
  openWindow.print();
  openWindow.close();
} */


//*Varje gången sidan refreshas eller besöks så körs "load" functionen
window.onload = load();


btnAdd.addEventListener("click", () => {
    createNewNote();
})

//*LÄGGA TILL RADERA KNAPPEN I DENNA, DENNA ÄR LITE ÖVER
/*
preDiv.innerHTML =
    <button class="like ${noteToBeAdded.fav ? "liked" : ""}" data-id="${noteToBeAdded.id}">&#9733;</button>
    <button class="trash">&#10006;</button>
    <h3>${noteToBeAdded.textTitle.substr(0, 15)}</h3>
    <p>${noteToBeAdded.text.substr(0, 20)}...</p>
    <p>${noteToBeAdded.datum}</p>; //ger diven innehåll
    previewNotes.prepend(preDiv); // nya diven blir barn till <section class="preview-notes"> och blir synlig på sidan.
}
*/