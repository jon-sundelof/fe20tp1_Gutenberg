let exEditor = false;
//*QUILL OPTIONS
let toolbarOptions = [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    [{ 'header': [1, 2, 3, false] }],
];



//Generear string för datum  (Snodde från Onur's kod <3 )
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
function getQuillHtml() { return editor.root.innerHTML; } //getQuillHtml() tar html texten från quill-editorn |Delta kan vara bättre
const getQuill = editor.root.innerHTML;



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
    constructor(title, date, text, star, tag) {
        this.title = title,
            this.date = date,
            this.text = text,
            this.star = star,
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
            textContent = getQuillHtml()
            savedNotes[i].title = titleInput.value;
            savedNotes[i].date = date;
            savedNotes[i].text = textContent;
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
    textContent = getQuill;
    let newNote = new Note(titleInput.value, date, textContent, false);
    savedNotes.push(newNote);
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));


    const preDiv = noteTemplate(savedNotes[savedNotes.length - 1])
    notePreview.prepend(preDiv);

    titleInput.value = "New Note";
    editor.setText("");

    currentNote = savedNotes[savedNotes.length - 1];
    currentNoteId = savedNotes[savedNotes.length - 1].id;


}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const previewDiv = document.querySelectorAll('.preDiv');

/* let previewDivArray = Array.from(previewDiv);
console.log(previewDivArray); */

let pressedPreview = false;
let thisDivIndex;
// previewDiv.forEach(item => {
//     item.addEventListener('click', event => {
//         //handle click
//         let thisDivId = event.target.closest('.preDiv').id;
//         console.log(thisDivId);
//         for (let i = 0; i < savedNotes.length; i++) {
//             if (thisDivId == savedNotes[i].id.toString()) {
//                 console.log(savedNotes[i].id.toString())
//                 editor.setText(savedNotes[i].text);
//                 titleInput.value = savedNotes[i].title;

//                 currentNoteId = thisDivId;
//                 console.log("Current note id: " + currentNoteId)
//                 pressedPreview = true;

//             }
//         }
//     });
// });



//Variabel för vilket id den aktiva noten har 
let currentNoteId;
let length = savedNotes.length;
let currentNote;

//om förändring sker reseta timer för autosave
//https://quilljs.com/docs/api/#editor-change

let autosave;
editor.on('editor-change', () => {
    clearTimeout(autosave)
    autosave = setTimeout(() => {

        if (pressedPreview == false) {
            // Kollar ifall arrayen är tome eller om noteId inte inte matchar senast skapta ID- I båda fallen skapar den ny note. 
            if (length <= 0 || savedNotes[savedNotes.length - 1].id !== currentNoteId) {
                textContent = getQuill;
                let newNote = new Note(titleInput.value, date, textContent, false);
                savedNotes.push(newNote);
                localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
                const preDiv = noteTemplate(savedNotes[savedNotes.length - 1])
                notePreview.prepend(preDiv);
                currentNote = savedNotes[savedNotes.length - 1];


            } else {
                updateArrRebuild();
            }

            if (pressedPreview == false) {
                currentNoteId = savedNotes[savedNotes.length - 1].id;
            }
        } else {

            updateArrRebuild();

        }

        length = savedNotes.length;
    }, 2000);
})



//*PRINT
btnPrint.addEventListener("click", () => {
    //window.print(delta);
    //content = JSON.stringify(quill.getContents());
    //console.log(getQuillHtml());
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

//flyttade ut mallen till en funktion så vi har samma mall överallt 
//blir enklare att styra och ändra för framtiden

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
            <p class="pretime">${note.date}</p>`;
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
    console.log(thisDivId);
    for (let i = 0; i < savedNotes.length; i++) {
        if (thisDivId == savedNotes[i].id.toString()) {
            console.log(savedNotes[i].id.toString())
            editor.root.innerHTML = (savedNotes[i].text);
            titleInput.value = savedNotes[i].title;

            currentNoteId = thisDivId;
            console.log("Current note id: " + currentNoteId)
            pressedPreview = true;

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