let exEditor = false;
//*QUILL OPTIONS
let toolbarOptions = [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    [{ 'header': [1, 2, 3, false] }],
];



//Generates string for date. Mabye go with "localDateString" instead? 
const datum = new Date();
const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());


//const printscreen = document.querySelector('.printscreen')
const notePreview = document.querySelector(".preview-notes");


//*Detta är en editorn
const note = document.querySelector("#editor")

const btnAdd = document.querySelector(".add");
const btnPrint = document.querySelector(".print");

const titleInput = document.querySelector("#title-input")
const innerText = document.querySelector(".ql-editor")

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
const getQuill = editor.root.innerHTML;
const getQuillContents = editor.getContents();
const getQuillText = editor.getText();
function getQuillHtml() { return editor.root.innerHTML; } //getQuillHtml() tar html texten från quill-editorn |Delta kan vara bättre
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//*En array där vi sparar våra notes
let savedNotes = [];

if (!localStorage.getItem('savedNotes') || localStorage.getItem('savedNotes').length < 0) {
    savedNotes = [];
} else {
    savedNotes = JSON.parse(localStorage.getItem('savedNotes'));

    buildPreviewWind(savedNotes);
}

//*Hämtar data från local storage
load = () => {
    let stored = JSON.parse(localStorage.getItem("savedNotes"))
    console.log(stored)
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

function buildPreviewWind(renderedList) {
    for (let i = 0; i < renderedList.length; i++) {
        const preDiv = noteTemplate(renderedList[i])
        notePreview.prepend(preDiv);
    }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateArrRebuild() {
    for (let i = 0; i < savedNotes.length; i++) {
        if (currentNoteId == savedNotes[i].id.toString()) {
            savedNotes[i].title = titleInput.value;
            savedNotes[i].date = date;
            savedNotes[i].text = editor.getText();
            savedNotes[i].content = editor.getContents();
            savedNotes[i].star = savedNotes[i].star;

        }
    }

    /*  savedNotes.push(newNote); */
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    let nodes = document.querySelectorAll(".preDiv");
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].parentNode.removeChild(nodes[i]);
    }

    buildPreviewWind(savedNotes);

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createNote() {
    titleInput.value = "New Note";
    let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents);
    savedNotes.push(newNote);
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    const preDiv = noteTemplate(newNote);
    notePreview.prepend(preDiv);

    editor.setText("");

    currentNote = newNote;
    currentNoteId = newNote.id;

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//om förändring sker reseta timer för autosave
//https://quilljs.com/docs/api/#editor-change

let autosave;
editor.on('editor-change', () => {
    clearTimeout(autosave)
    autosave = setTimeout(() => {

        //Checks if the array is empty or if CurrentNoteId is undefined. In those cases it creates a new note. Otherwise it uppdates the current one.
        if (savedNotes.length <= 0 || currentNoteId == undefined) {
            let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents);

            savedNotes.push(newNote);
            localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

            const preDiv = noteTemplate(newNote)
            notePreview.prepend(preDiv);

            currentNote = newNote;
            currentNoteId = newNote.id;

            if (pressedPreview == false) {
                currentNoteId = savedNotes[savedNotes.length - 1].id;
            }
        } else {

            updateArrRebuild();
        }
    }, 2000);
})



//*PRINT
btnPrint.addEventListener("click", () => {
    content = getQuillHtml();
    let divContents = content;
    let openWindow = window.open("", "", "width=700, height=900");
    openWindow.document.write('<html>');
    openWindow.document.write('<body>');
    openWindow.document.write(divContents);
    openWindow.document.write('</body></html>');
    openWindow.document.close();
    openWindow.print()
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
    createNote();
})

//*LÄGGA TILL RADERA KNAPPEN I DENNA, DENNA ÄR LITE ÖVER


function noteTemplate(note) {

    //skapa favorit knapp med tillhörande class och eventlisters
    //ge den klassen starClicked om den har blivit favoriserad innan
    const button = document.createElement('button');
    button.classList.add('star');
    button.innerHTML = `&#9733;`;
    button.addEventListener('click', () => favourite(note))
    if (note.star == true) {
        button.classList.add('starClicked')
    }
    //skapa en container för våran preview samt en eventlister för klick som uppdaterar editor meoch sätt inn knappen som
    //vi skapade innan med tillhörande eventlisters, vi kan inte använda innerhtml/outerhtml
    //för då följer inte eventlister med som vi har bindat till knappen
    const preDiv = document.createElement("div");
    preDiv.innerHTML = `<h3>${note.title}</h3>
    <div class="button">
    </div>
    <p>${note.text}</p>
    <p class="pretime">${note.date}</p>
    <button class="trash"><i class="far fa-trash-alt delete trash"></i></button>`;
    preDiv.querySelector('.button').append(button)
    preDiv.setAttribute('class', 'preDiv');
    preDiv.addEventListener('click', event => {
        pushToEditor(event);
    });

    preDiv.setAttribute('id', note.id);
    return preDiv;
}
function favourite(note) {
    note.star = !note.star;
    updateArrRebuild();
}
function pushToEditor(event) {
    //handle click

    let thisDivId = event.target.closest('.preDiv').id;
    for (let i = 0; i < savedNotes.length; i++) {
        if (thisDivId == savedNotes[i].id.toString()) {

            editor.setContents(savedNotes[i].content);
            titleInput.value = savedNotes[i].title;

            currentNoteId = thisDivId;
        }
    }
}

document.querySelector('.button.favorit').addEventListener('click', () => { filterFav(true) })
document.querySelector('.button.all').addEventListener('click', () => { filterFav(false) })

function filterFav(onoff) {
    let favList;
    if (onoff) {
        favList = savedNotes.filter(x => x.star == true)
    } else {
        favList = savedNotes;
    }
    notePreview.innerHTML = "";
    buildPreviewWind(favList)
}

notePreview.addEventListener('click', e => {

    if (e.target.classList.contains('trash')) {
        id = e.target.closest('div').id
        removeNote(id)
        e.target.closest('div').remove()
    }

})

function removeNote(id) {
    index = savedNotes.findIndex(x => x.id == id)
    savedNotes.splice(index, 1)
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    console.log(savedNotes)
}  
