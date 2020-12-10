let exEditor = false;
//*QUILL OPTIONS
let toolbarOptions = [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    [{ 'header': [1, 2, 3, false] }],
];


/* ============================== VARIABLES ============================== */

//Generates string for date. Mabye go with "localDateString" instead? 

//const printscreen = document.querySelector('.printscreen')
const notePreview = document.querySelector(".preview-notes");

//*Detta är en editorn
const note = document.querySelector("#editor")

const btnAdd = document.querySelector(".add");
const btnTemplate = document.querySelector(".template");
const btnPrint = document.querySelector(".print");
const template1Btn = document.querySelector(".template1");
const template2Btn = document.querySelector(".template2");

const titleInput = document.querySelector("#title-input")
const innerText = document.querySelector(".ql-editor")

const themesBtn = document.querySelector(".themes");

let checkIfTrue = false;

/* ============================== EVENT LISTENERS ============================== */
/* Themes button */
themesBtn.addEventListener('click', evt => {
    console.log(evt.target.value);
    changeTheme(evt.target.value);
});

////////////////////////////////////////////////////////////////////////////////////
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
    scrollingContainer: '#scrolling-container',
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
    console.log(stored);
}

/************************/
//**** NOTE KLASSEN *****/
/************************/
class Note {
    constructor(title, date, text, star, content = editor.getContents(), theme, tag) {
        this.title = title,
            this.date = date,
            this.text = text,
            this.star = star,
            this.content = content,
            this.tag = tag,
            this.theme = theme,
            this.id = Date.now()
    }

}



//////////////////////////////////////////// FUNKTIONER  //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changeTheme (themevalue) {
    if(themevalue == "0"){
        note.
        note.style.color = 'red';
    }
  /*   for (let i = 0; i < savedNotes.length; i++) {
        if (currentNoteId == savedNotes[i].id.toString()) {
            savedNotes[i].theme = themevalue;
        }
    } */
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    const datum = new Date();
    const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());

    titleInput.value = "New Note";
    let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents, null);
    savedNotes.push(newNote);
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    currentNote = newNote;
    currentNoteId = newNote.id;

    const preDiv = noteTemplate(newNote);
    notePreview.prepend(preDiv);

    editor.setText("");

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//om förändring sker reseta timer för autosave
//https://quilljs.com/docs/api/#editor-change

let autosave;

editor.on('editor-change', () => {
    clearTimeout(autosave)
    autosave = setTimeout(() => {

        //|| currentNoteId == undefined 
        //Checks if the array is empty or if CurrentNoteId is undefined. In those cases it creates a new note. Otherwise it uppdates the current one.
        if (savedNotes.length < 1 && checkIfTrue == false ) {
            const datum = new Date();
            const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());

            let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents);

            savedNotes.push(newNote);
            localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
           
            
            const preDiv = noteTemplate(newNote);
            
            notePreview.prepend(preDiv);

            currentNote = newNote;
            currentNoteId = newNote.id;


        } else {


            updateArrRebuild();
        }
    }, 5);
})


//*PRINT
btnPrint.addEventListener("click", () => {
    // https://benfrain.com/create-print-styles-using-css3-media-queries/
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
    button.innerHTML = `<i class="fas fa-star"></i>`;
    button.addEventListener('click', () => favourite(note))
    if (note.star == true) {
        button.classList.add('starClicked')
    }
    //skapa en container för våran preview samt en eventlister för klick som uppdaterar editor meoch sätt inn knappen som
    //vi skapade innan med tillhörande eventlisters, vi kan inte använda innerhtml/outerhtml
    //för då följer inte eventlister med som vi har bindat till knappen
    const preDiv = document.createElement("div");
    preDiv.innerHTML = `<h3>${note.title.substr(0, 25)}</h3>
    <div class="button">
    </div>
    <p>${note.text.substr(0, 70)} ...</p>
    <p class="pretime">${note.date}</p>
    <button class="trash"><i class="fas fa-trash"></i></button>`;
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
        //favList = savedNotes.filter(x => x.star)
        favList = searchNotes('', x => x.star)
    } else {
        favList = savedNotes;
    }
    notePreview.innerHTML = "";
    buildPreviewWind(favList)
}

notePreview.addEventListener('click', e => {



    if (e.target.classList.contains('fa-trash')) {
        // todo: kolla om vi är i favoritläget
        id = e.target.closest('div').id
        answer = confirm("Do you want to delete?")
        if(answer == true){
            checkIfTrue = true;
            removeNote(id)
            e.target.closest('div').remove()
            
        } else{
            return null;
        }
        
        setTimeout(() => {
            checkIfTrue = false;
        }, 10);
        

    } 
    if (e.target.closest(".preDiv")) {
        console.log(e.target.closest(".preDiv"))
        e.target.closest(".preDiv").classList.add("active")
    }

})


const removeNote = id => {
    index = savedNotes.findIndex(x => x.id == id)
    savedNotes.splice(index, 1)
    editor.setText("");
    titleInput.value = "New Note";
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
}

// ----------------------------------------------------------
// Sök funktion

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {

    let searchedWord = e.target.value;
    console.log(searchedWord);
    notePreview.innerHTML = "";
    if (searchedWord.length >= 1) {
        let foundNotes = searchNotes(searchedWord);
        buildPreviewWind(foundNotes);
    } else {
        // anv har tömt sökrutan
        buildPreviewWind(savedNotes)
    }

})

function searchNotes(str, func = function (note) { return note.title.toLowerCase().includes(str.toLowerCase()) || note.text.toLowerCase().includes(str.toLowerCase()) }) {
    // filtrera och returnera samtliga notes som innehåller str
    return savedNotes.filter(func)
}

// searchNotes('', (note) => note.star) -> alla starmarkerade
// searchNotes('hej') -> alla ntoes med hej i sig
// ---------------------------------------------------------------'
//annan version av auto save
//#region  
// Save periodically
// setInterval(function () {
//     if (change.length() > 0) {
//       if (savedNotes.length <= 0 || currentNoteId == undefined) {
//             let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents);

//             savedNotes.push(newNote);
//             localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

//             const preDiv = noteTemplate(newNote)
//             notePreview.prepend(preDiv);

//             currentNote = newNote;
//             currentNoteId = newNote.id;

//             if (pressedPreview == false) {
//                 currentNoteId = savedNotes[i].id;
//                     }
//                 } 
//                 else {

//                     updateArrRebuild();
//                 }
//         change = new Delta();
//     }
// }, 2 * 1000);
//#endregion

/* ====================TEMPLATES DROP DOWN start====================*/

//--------------------Variables--------------------
var btn1 = document.querySelector(".templates");
//--------------------Functions--------------------

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function templateFunc() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.templates')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
//--------------------Event listeners--------------------
btn1.addEventListener("click", templateFunc);

/* ====================TEMPLATES DROP DOWN end====================*/

/*

let clickedNote = event.target.closest(".preDiv");

    if(clickedNote.classList.contains("active-note")){
        console.log(clickedNote)
        clickedNote.classList.remove("active-note")
    } else{
        clickedNote.classList.add("active-note")
        console.log(clickedNote)
    }

*/