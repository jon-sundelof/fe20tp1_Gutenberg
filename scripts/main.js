/***************************************************************************/
/* ================================ QUILL ================================ */
/***************************************************************************/

//*QUILL OPTIONS
let toolbarOptions = [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    [{ 'header': [1, 2, 3, false] }],
    ['image'],
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
let btn1 = document.querySelector(".templates");
const body = document.querySelector("body");
const notePreview = document.querySelector(".preview-notes");

//*Detta är editorn
const note = document.querySelector("#editor")

//*Buttons
const btnAdd = document.querySelector(".add");
const btnTemplate = document.querySelector(".template");
const btnPrint = document.querySelector(".print");
const themesBtn = document.querySelector('.themes');
const formalBtn = document.querySelector('.theme-formal');
const playfulBtn = document.querySelector('.theme-playful');
const defaultBtn = document.querySelector('.theme-default');
const xmasBtn = document.querySelector('.mode');
const darkBtn = document.querySelector("#dark");
const lightBtn = document.querySelector("#light");
const statsBtn = document.querySelector('.statistics');
const exitStatsBtn = document.querySelector('.exit-stats');
const trashNavBtn = document.querySelector('.trash-nav');
const delAllNotesBtn = document.querySelector('#delAllNotesBtn');

//Rensa LC-knapp
const clearLC = document.querySelector(".clear-lc");

const tagInput = document.querySelector('#tag-input');
const titleInput = document.querySelector("#title-input");
const innerText = document.querySelector(".ql-editor");

const favInput = document.querySelector(".checkbox-fav")
const favInputChecked = document.querySelector("input:checked")



const els = document.getElementsByClassName('preDiv active');

//Eventlisteners-----
document.querySelector('.recyc-del button:last-child').addEventListener("click", permanentlyRemoveNote)
document.querySelector('.recyc-del button:first-child').addEventListener("click", restoreDeletedNote)

//Eventlisteners-Slut----

let checkIfTrue = false;
let deleted = false;
//Variabels for CurrentNoteId and currentNote
let currentNoteId;
let currentNote;

//*En array där vi sparar våra notes
let savedNotes = [];
let deletedNotes = [];
let favList = [];

if (!localStorage.getItem('savedNotes') || localStorage.getItem('savedNotes').length < 0) {
    savedNotes = [];
} else {
    savedNotes = JSON.parse(localStorage.getItem('savedNotes'));

    buildPreviewWind(savedNotes);
}


if (!localStorage.getItem('deletedNotes') || localStorage.getItem('deletedNotes').length < 0) {
    deletedNotes = [];
} else {
    deletedNotes = JSON.parse(localStorage.getItem('deletedNotes'));
}

function load() {

    buildPreviewWind(savedNotes)

    if (savedNotes.length > 0) {
        editor.setContents(savedNotes[savedNotes.length - 1].content);
        titleInput.value = savedNotes[savedNotes.length - 1].title;
        tagInput.value = savedNotes[savedNotes.length - 1].tag;

        currentNoteId = savedNotes[savedNotes.length - 1].id;
        currentNote = savedNotes[savedNotes.length - 1];

        //Kolla om noten som laddas har ett theme-värde. Isåfall, kör den aktuella theme-funktionen
        changeTheme(savedNotes[savedNotes.length - 1].theme);
    }
}

const themes = {
    xmas: {
        '--primarycolor': '#ffffff',
        '--secondarycolor': '#000000',
        '--color2orange': '#ee0909',
        '--visblogo': 'none',
        '--xmasvisblogo': 'block',
        '--hovercolor': '#f32f2f',
    },
    dark: {
        '--primarycolor': '#222831',
        '--secondarycolor': '#ffffff',
        '--color2orange': '#f96d00',
        '--visblogo': 'block',
        '--xmasvisblogo': 'none',
        '--hovercolor': '#5e5e7e',
        /* '--hovercolor': '#393e46' */

    },
    deletehide: {
        '--delhidetop': 'none',
        '--delhide': 'block'
    },
    deleteshow: {
        '--delhidetop': 'block',
        '--delhide': 'none'
    },
    light: {
        '--primarycolor': '#ffffff',
        '--secondarycolor': '#000000',
        '--color2orange': '#f96d00',
        '--visblogo': 'block',
        '--xmasvisblogo': 'none',
        '--hovercolor': '#f0f0f0',
    },

};
[...document.querySelectorAll('.mode')].forEach(el => {
    el.addEventListener('click', () => {
        const theme = themes[el.dataset.theme];
        for (var variable in theme) {
            document.documentElement.style.setProperty(variable, theme[variable]);
        };
    });
});

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
/* ============================ EVENTLISTENERS! ===========================*/
/***************************************************************************/

statsBtn.addEventListener('click', () => {
    let statsCon = document.querySelector('.stats-container');

    statsCon.classList.add('show-stats')

    document.querySelector('#total-notes-stat').innerHTML = savedNotes.length;
    document.querySelector('#total-notes-ever-stat').innerHTML = savedNotes.length + deletedNotes.length;
    document.querySelector('#data-stat').innerHTML = localStorageSpace();
    document.querySelector('#characters-stat').innerHTML = allText();
    document.querySelector('#words-writen-stat').innerHTML = avrWords();
    document.querySelector('#avr-words-stat').innerHTML = avrWordsNote();


});
exitStatsBtn.addEventListener('click', () => {
    let statsCon = document.querySelector('.stats-container');

    statsCon.classList.remove('show-stats')
});

trashNavBtn.addEventListener('click', () => {
    if (deletedNotes.length <= 0) {
        let warSpan = document.createElement('span');
        warSpan.setAttribute('class', 'no-notes-warning')
        warSpan.innerHTML = " No Notes";
        trashNavBtn.append(warSpan);
        setTimeout(function () {
            trashNavBtn.removeChild(warSpan);
        }, 3000);
        return;
    } else {
        buildPreviewWindDel(deletedNotes);
        const theme = themes[trashNavBtn.dataset.theme];
        for (var variable in theme) {
            document.documentElement.style.setProperty(variable, theme[variable]);
        };
        deleted = true;
        favInput.checked = false;
    }
});

delAllNotesBtn.addEventListener('click', () => {
    /*   notePreview.innerHTML = ""; */
    /* buildPreviewWind(savedNotes); */
    const theme = themes[delAllNotesBtn.dataset.theme];
    for (var variable in theme) {
        document.documentElement.style.setProperty(variable, theme[variable]);
    };
    deleted = false;
    notePreview.innerHTML = "";
    buildPreviewWind(savedNotes);
    /* updateArrRebuild() */
})




titleInput.addEventListener("input", updateArrRebuild);
tagInput.addEventListener("input", updateArrRebuild);

btnPrint.addEventListener("click", () => {
    window.print();
});

window.addEventListener('DOMContentLoaded', () => {
    load()
});

btnAdd.addEventListener("click", () => {
    createNote();
    removeClassActive();
});

tagInput.addEventListener("input", suggestionList);

favInput.addEventListener("click", () => {

    if (favInput.checked === true) {
        filterFav(true)
    } else {
        filterFav(false)
    }
});

notePreview.addEventListener('click', e => {
    if (e.target.classList.contains('fa-trash')) {
        // todo: kolla om vi är i favoritläget
        id = e.target.closest('div').id
        answer = confirm("Are you sure you want to delete this note?")
        if (answer == true) {
            checkIfTrue = true;
            removeNote(id)

            e.target.closest('div').remove()
            if (savedNotes.length > 0)
                pushToEditor(savedNotes[(savedNotes.length - 1)].id)

            //
        } else {
            return null;
        }

        setTimeout(() => {
            checkIfTrue = false;
        }, 10);
    }
});

// Close the dropdown menu if the user clicks outside of it
window.addEventListener('click', event => {
    if (!event.target.matches('.templates')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
})

btn1.addEventListener("click", templateFunc);

/***************************************************************************/
/* ============================ FUNCTIONS ================================ */
/***************************************************************************/

/* Clear LC */
clearLC.addEventListener('click', () => {
    answer = confirm("Clear local storage? This will permanently remove all your saved notes.")
    if (answer == true) {
        localStorage.clear();
        document.location.reload();
    } else {
        return null;
    }
})

/* Removes the "active" class from preDiv when called*/
function removeClassActive() {
    while (els[0]) {
        els[0].classList.remove('active')
    }
}

function buildPreviewWind(renderedList) {

    for (let i = 0; i < renderedList.length; i++) {
        const preDiv = noteTemplate(renderedList[i])
        notePreview.prepend(preDiv);
    }
}

function updateArrRebuild() {
    // console.log("updateArrrebuild")
    savedNotes.sort((a, b) => a.id - b.id);
    for (let i = 0; i < savedNotes.length; i++) {
        if (currentNoteId == savedNotes[i].id.toString()) {
            savedNotes[i].title = titleInput.value;
            savedNotes[i].text = editor.getText();
            savedNotes[i].content = editor.getContents();
            savedNotes[i].star = savedNotes[i].star;
            savedNotes[i].tag = tagInput.value;
        }
    }

    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    let nodes = document.querySelectorAll(".preDiv");
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].parentNode.removeChild(nodes[i]);
    }

    if (favInput.checked == true) {
        buildPreviewWind(favList);
    } else if (deleted == !true) {
        buildPreviewWind(savedNotes);
    } else {
        buildPreviewWindDel(deletedNotes);
    }
}



function createNote() {
    if (favInput.checked == false) {
        const datum = new Date();
        const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());

        titleInput.value = "New Note";
        tagInput.value = "";
        let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents, 0, tagInput.value);
        savedNotes.push(newNote);
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

        currentNote = newNote;
        currentNoteId = newNote.id;

        const preDiv = noteTemplate(newNote);
        notePreview.prepend(preDiv);

        changeTheme(newNote.theme);
        editorTheme.setAttribute('id', '');
        editor.setText("");
    }
    else if (favInput.checked == true) {
        const datum = new Date();
        const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());

        titleInput.value = "New Note";
        tagInput.value = "";
        let newNote = new Note(titleInput.value, date, getQuillText, true, getQuillContents, 0, tagInput.value);
        savedNotes.push(newNote);
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

        currentNote = newNote;
        currentNoteId = newNote.id;

        const preDiv = noteTemplate(newNote);
        notePreview.prepend(preDiv);

        changeTheme(newNote.theme);
        editorTheme.setAttribute('id', '');
        editor.setText("");

        favList.push(newNote)
    }
}

//Checks for change in tag-input and saves.

const suggestionListContainer = document.querySelector('#tag-suggestion-datalist');

function suggestionList() {
    removedDup = removeDuplicatesBy(x => x.tag, savedNotes);
    for (let i = 0; i < removedDup.length; i++) {
        if (!removedDup[i].tag == "") {
            suggestionListContainer.innerHTML += removedDup[i].tag;
        }
    }
}


let autosave;
editor.on('editor-change', () => {
    clearTimeout(autosave)
    autosave = setTimeout(() => {
        //Checks if the array is empty or if CurrentNoteId is undefined. In those cases it creates a new note. Otherwise it uppdates the current one.
        if (savedNotes.length < 1 && checkIfTrue == false) {
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
    }, 100);
});

function noteTemplate(note) {

    //skapa favorit knapp med tillhörande class och eventlisters
    //ge den klassen starClicked om den har blivit favoriserad innan
    const button = document.createElement('button');
    button.classList.add('star');
    button.innerHTML = `<i class="fas fa-star"></i>`;
    button.addEventListener('click', (e) => {
        favourite(note)
        if (favInput.checked == true && note.star == false) {
            id = e.target.closest(".preDiv").id
            index = favList.findIndex(x => x.id == id)
            favList.splice(index, 1)
            buildPreviewWind(favList)
            updateArrRebuild();
        }
    });

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
    <div class="preDivTagCon">
    <p class="pretime">${note.date}</p>
    <p class="preTag">${note.tag}</p>
    </div>
   
    <button class="trash"><i class="fas fa-trash"></i></button>`;
    preDiv.querySelector('.button').append(button)
    preDiv.setAttribute('class', 'preDiv');

    preDiv.addEventListener('click', event => {

        if (!event.target.classList.contains("fas")) {
            toggleMain()
            if (favInput.checked == false) {
                pushToEditor(event.target.closest('.preDiv').id);
            } else {
                pushToEditor(event.target.closest('.preDiv').id);
            }
        }
    });

    if (currentNoteId == note.id) {
        preDiv.classList.add("active")
    }

    preDiv.setAttribute('id', note.id);
    return preDiv;
}

const favourite = note => {
    //console.log("Star button clicked")
    note.star = !note.star;
    updateArrRebuild();
}

const pushToEditor = (thisDivId) => {
    //console.log("Inside push to editor")
    //handle click

    index = savedNotes.findIndex(x => x.id == thisDivId)
    editor.setContents(savedNotes[index].content);
    titleInput.value = savedNotes[index].title;
    tagInput.value = savedNotes[index].tag;

    currentNoteId = thisDivId;
    currentNote = savedNotes[index];

    //Kolla om noten som laddas har ett theme-värde. Isåfall, kör den aktuella theme-funktionen
    changeTheme(savedNotes[index].theme);
}

const filterFav = onoff => {
    if (onoff) {
        favList = savedNotes.filter(x => x.star)
        //favList = searchNotes('', x => x.star)
    } else {
        favList = savedNotes;
    }
    notePreview.innerHTML = "";
    buildPreviewWind(favList);
}


function permanentlyRemoveNote() {
    document.querySelectorAll('.del-checkbox:checked').forEach(deleteItem => {
        index = deletedNotes.findIndex(x => x.id == deleteItem.closest('.preDivDel').id)
        deletedNotes.splice(index, 1);
    })

    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
    updateArrRebuild();
}
function restoreDeletedNote() {
    document.querySelectorAll('.del-checkbox:checked').forEach(deleteItem => {
        index = deletedNotes.findIndex(x => x.id == deleteItem.closest('.preDivDel').id)

        savedNotes.push(deletedNotes[index]);
        deletedNotes.splice(index, 1);

    })
    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
    updateArrRebuild();
}
const removeNote = id => {
    index = savedNotes.findIndex(x => x.id == id)
    deletedNotes.push(savedNotes[index]);
    savedNotes.splice(index, 1);

    if (favInput.checked == true) {
        index = favList.findIndex(x => x.id == id)
        deletedNotes.push(favList[index]);
        favList.splice(index, 1);
    }

    if (currentNoteId == id) {
        editorTheme.setAttribute('id', '');
        editor.setText("");
        titleInput.value = "";
    }
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
}

/***************************************************************************/
/* ================================= SÖK ================================= */
/***************************************************************************/

function searchNotes(str, func = function (note) { return note.title.toLowerCase().includes(str.toLowerCase()) || note.text.toLowerCase().includes(str.toLowerCase()) || note.tag.toLowerCase().includes(str.toLowerCase()) }) {
    // filtrera och returnera samtliga notes som innehåller str
    return savedNotes.filter(func)
}

//Här skapar vi en variabel för sökrutan
const searchInput = document.getElementById('search');

//Nedan körs när användaren skriver något i sökfältet (input)
searchInput.addEventListener('input', e => {

    //Gör användarens sökterm till variabeln searchedWord
    let searchedWord = e.target.value;

    //Trimma mellanslag i början och slutet av inputen
    searchedWord = searchedWord.trim();

    //Tömmer hela preview-fönstret
    notePreview.innerHTML = "";

    //Om sökrutan innehåller 1 eller fler bokstäver körs denna if-kille
    if (searchedWord.length >= 1) {
        //searchNotes tar in söktermen som argument och gör den + title + text till lowerCase och söker igenom alla notes. 
        //Den returnerar varje obj i savedNotes som matchar sökningen

        //Här körs searchNotes med sökordet som arg och resultatet o blir variabeln foundNotes. foundNotes är en array med de filtrerade notesen som obj inuti
        let foundNotes = searchNotes(searchedWord);
        
        console.log(foundNotes);

        //map låter dig köra önskad funktion på alla element i en array och returnerar sedan en ny array med "resultatet"
        //Ju lägre siffra desto längre upp i previewfönstret hamnar noten
        const rankedSearch = foundNotes.map(noteObj => {

            let points = 0;

            if (noteObj.text.includes(searchedWord)) {
                points += 50;
            }
            else if (noteObj.text.startsWith(searchedWord)) {
                points += 20;
            }
            else if (noteObj.title.includes(searchedWord)) {
                points += 5;
            }
            else if (noteObj.title.startsWith(searchedWord)) {
                points += 1;
            }
            return { ...noteObj, points };
        }).sort((a, b) => b.points - a.points);


        //Här är rankedSearch en uppdaterad array med alla önskade note i sig som obj
        //Här bygger vi upp previewfönstret med de notes som matchat sökningen
        buildPreviewWind(rankedSearch);
    } else {
        // Om sökrutans (searchInput) innehålls length är mindre än 1 så bygger vi upp previewfönstret med alla notes (savedNotes) 
        buildPreviewWind(savedNotes)
    }
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function templateFunc() {
    document.getElementById("myDropdown").classList.toggle("show");
}

/* Calculates the space used */
let localStorageSpace = function () {
    let data = '';
    for (let key in window.localStorage) {
        if (window.localStorage.hasOwnProperty(key)) {
            data += window.localStorage[key];
        }
    }

    return data ? ((data.length * 16) / (8 * 1024)).toFixed(2) + ' KB' : 'Empty (0 KB)';
    /*  return data ? (5120 - ((data.length * 16)/(8 * 1024)).toFixed(2)) + ' KB' : '5 MB'; */
}

/* Calculates total characters writen*/
let allText = function () { return savedNotes.map(e => e.text).join(",").length };
let avrWords = function () { return Math.ceil(savedNotes.map(e => e.text).join(",").length / 4.7) };
let avrWordsNote = function () { if (savedNotes.length == 0) { return 0 } else { return Math.ceil((savedNotes.map(e => e.text).join(",").length / 4.7) / savedNotes.length) } };

/***************************************************************************/
/* ================================= XMAS ================================ */
/***************************************************************************/

let xmasMode = false;

xmasBtn.addEventListener("click", () => {
    xmasMode = true;
    if (xmasMode == true) {
        setInterval(createSnowFlake, 50)
    }
});

lightBtn.addEventListener("click", () => {
    xmasMode = false;
    createSnowFlake();
});

darkBtn.addEventListener("click", () => {
    xmasMode = false;
    createSnowFlake();
});

function createSnowFlake() {

    if (xmasMode == true) {
        const snow_flake = document.createElement('i');
        // Adding the required classes for the FontAwesome icon to show up
        snow_flake.classList.add('fas');
        snow_flake.classList.add('fa-snowflake');

        // Randomly generate the width to be between 10 and 20 px
        snow_flake.style.width = Math.random() * 10 + 10 + 'px';

        // Randomly generate the left position to be between 0 and the innerWidth of the screen
        snow_flake.style.left = Math.random() * window.innerWidth + 'px';

        // Randomly generate the animationDuration - between 2 and 5 seconds
        snow_flake.style.animationDuration = Math.random() * 3 + 2 + 's';

        // Randomly add an opacity - between 0 and 1
        snow_flake.style.opacity = Math.random();

        // Add the newly created <i> tag inside the <body> tag
        body.appendChild(snow_flake);

        // Set a timeout to remove the snow_flake from the DOM after 5 seconds
        // as we don't want it to overload the page
        setTimeout(() => {
            snow_flake.remove();
        }, 5000);
    }
}
