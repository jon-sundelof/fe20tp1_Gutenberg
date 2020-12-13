/***************************************************************************/
/* ================================ QUILL ================================ */ 
/***************************************************************************/

//*QUILL OPTIONS
let toolbarOptions = [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    [{ 'header': [1, 2, 3, false] }],
];

let options = {
    modules: {
        toolbar: toolbarOptions,
    },
    scrollingContainer: '#scrolling-container',
    placeholder: 'Compose an epic story...', //placeholder text 
    readOnly: false, // kan bara läsa texten om true, kanske är so preview?
    theme: 'bubble'
}

//*Creates a instance of quill
let editor = new Quill('#editor', options);

const getQuill = editor.root.innerHTML;
const getQuillContents = editor.getContents();
const getQuillText = editor.getText();
function getQuillHtml() { return editor.root.innerHTML; }


/***************************************************************************/
/* ============================== VARIABLES ============================== */ 
/***************************************************************************/

const notePreview = document.querySelector(".preview-notes");

//*Detta är editorn
const note = document.querySelector("#editor")

//*Buttons
const btnAdd = document.querySelector(".add");
const btnTemplate = document.querySelector(".template");
const btnPrint = document.querySelector(".print");
const template1Btn = document.querySelector(".template1");
const template2Btn = document.querySelector(".template2");
const themesBtn = document.querySelector('.themes');
const formalBtn = document.querySelector('.theme-formal');
const playfulBtn = document.querySelector('.theme-playful');
const defaultBtn = document.querySelector('.theme-default');
const xmasBtn = document.querySelector('.theme-xmas');

const titleInput = document.querySelector("#title-input");
const innerText = document.querySelector(".ql-editor");

const favInput = document.querySelector(".checkbox-fav")
const els = document.getElementsByClassName('preDiv active');

let checkIfTrue = false;

//Variabels for CurrentNoteId and currentNote
let currentNoteId;
let currentNote;

//*En array där vi sparar våra notes
let savedNotes = [];

if (!localStorage.getItem('savedNotes') || localStorage.getItem('savedNotes').length < 0) {
    savedNotes = [];
} else {
    savedNotes = JSON.parse(localStorage.getItem('savedNotes'));
    buildPreviewWind(savedNotes);
}

//*Hämtar data från local storage
function load(){

    if(savedNotes.length > 0){
        editor.setContents(savedNotes[savedNotes.length -1].content);
        titleInput.value = savedNotes[savedNotes.length -1].title;
        
        currentNoteId = savedNotes[savedNotes.length -1 ].id;
        currentNote = savedNotes[savedNotes.length -1];

        //Kolla om noten som laddas har ett theme-värde. Isåfall, kör den aktuella theme-funktionen
        changeTheme(savedNotes[savedNotes.length -1 ].theme);
    }

}

/************************/
//**** NOTE KLASSEN *****/
/************************/
class Note {
    constructor(title, date, text, star, content = editor.getContents(), theme = 0, tag) {
        this.title = title,
        this.date = date,
        this.text = text,
        this.star = star,
        this.content = content,
        this.theme = theme,
        this.tag = tag,
        this.id = Date.now()
    }
}

/***************************************************************************/
/* ============================ FUNCTIONS ================================ */ 
/***************************************************************************/


/* Removes the "active" class from preDiv when called*/
function removeClassActive() {
  while (els[0]) {
    els[0].classList.remove('active')
  }
}

/****************************************************************************/
function buildPreviewWind(renderedList) {
    for (let i = 0; i < renderedList.length; i++) {
        const preDiv = noteTemplate(renderedList[i])
        notePreview.prepend(preDiv);
    }
}

/*****************************************************/
function updateArrRebuild() {
    for (let i = 0; i < savedNotes.length; i++) {
        if (currentNoteId == savedNotes[i].id.toString()) {
            savedNotes[i].title = titleInput.value;
            savedNotes[i].text = editor.getText();
            savedNotes[i].content = editor.getContents();
            savedNotes[i].star = savedNotes[i].star;

        }
    }

    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    let nodes = document.querySelectorAll(".preDiv");
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].parentNode.removeChild(nodes[i]);
    }
    buildPreviewWind(savedNotes);
}

/*****************************************************/

function createNote() {
    const datum = new Date();
    const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());

    titleInput.value = "New Note";
    let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents, 0);
    savedNotes.push(newNote);
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    currentNote = newNote;
    currentNoteId = newNote.id;

    const preDiv = noteTemplate(newNote);
    notePreview.prepend(preDiv);
 
    editorTheme.setAttribute('id', '');
    editor.setText("");
}


//Kontrollerar ändring i Titeln och sparar
titleInput.addEventListener("input", updateArrRebuild)

//om förändring sker reseta timer för autosave
//https://quilljs.com/docs/api/#editor-change

let autosave;
editor.on('editor-change', () => {
    clearTimeout(autosave)
    autosave = setTimeout((eventName) => {

        

        //|| currentNoteId == undefined  
        //Checks if the array is empty or if CurrentNoteId is undefined. In those cases it creates a new note. Otherwise it uppdates the current one.
        if (savedNotes.length < 1 && checkIfTrue == false ) {
            const datum = new Date();
            const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());

            let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents, 0);

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

//*Varje gången sidan refreshas

window.addEventListener('DOMContentLoaded', () => {
    load()
});

btnAdd.addEventListener("click", () => {
    removeClassActive();
    createNote();

})

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
    preDiv.innerHTML = `<h3>${note.title.substr(0, 20)}</h3>
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
    
    if (currentNoteId == note.id){
        preDiv.classList.add("active")
    }

    preDiv.setAttribute('id', note.id);
    return preDiv;
}

const favourite = note => {
    note.star = !note.star;
    updateArrRebuild();
}
const pushToEditor = event => {
    //handle click
    let thisDivId = event.target.closest('.preDiv').id;
    for (let i = 0; i < savedNotes.length; i++) {
        if (thisDivId == savedNotes[i].id.toString()) {

            editor.setContents(savedNotes[i].content);
            titleInput.value = savedNotes[i].title;
            
            currentNoteId = thisDivId;
            currentNote = savedNotes[i];

            //Kolla om noten som laddas har ett theme-värde. Isåfall, kör den aktuella theme-funktionen
            changeTheme(savedNotes[i].theme);
        }
    }
}


favInput.addEventListener("click", () => {
    if(favInput.checked === true){
        filterFav(true)
    } else {
        filterFav(false)
    }
})

const filterFav = onoff => {
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
});


const removeNote = id => {
    index = savedNotes.findIndex(x => x.id == id)
    savedNotes.splice(index, 1)
    editor.setText("");
    titleInput.value = "New Note";
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
}



// ----------------------------------------------------------
// Sök funktion

function searchNotes(str, func = function (note) { return note.title.toLowerCase().includes(str.toLowerCase()) || note.text.toLowerCase().includes(str.toLowerCase()) }) {
    // filtrera och returnera samtliga notes som innehåller str
    return savedNotes.filter(func)
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', e => {
    
    let searchedWord = e.target.value;
    notePreview.innerHTML = "";
    if (searchedWord.length >= 1) {
        let foundNotes = searchNotes(searchedWord);

        const rankedSearch = foundNotes.map(noteObj => {

            let points = 0;

            if (noteObj.text.includes(searchedWord)) {
                points += 4;
            }
            if (noteObj.text.startsWith(searchedWord)) {
                points += 3;
            }
            if (noteObj.title.includes(searchedWord)) {
                points += 2;
            }
            if (noteObj.title.startsWith(searchedWord)) {
                points += 1;
            }
            return {...noteObj, points};
        }).sort((a, b) => b.points - a.points);

        buildPreviewWind(rankedSearch);
    } else {
        // anv har tömt sökrutan
        buildPreviewWind(savedNotes)
    }
})
// -----------------sök-funktion-SLUT--------------------------------




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
