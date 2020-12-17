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
const xmasBtn = document.querySelector('.theme-xmas');
const statsBtn = document.querySelector('.statistics');
const exitStatsBtn = document.querySelector('.exit-stats');
const trashNavBtn = document.querySelector('.trash-nav');
//Rensa LC-knapp
const clearLC = document.querySelector(".clear-lc");

const tagInput = document.querySelector('#tag-input');
const titleInput = document.querySelector("#title-input");
const innerText = document.querySelector(".ql-editor");

const favInput = document.querySelector(".checkbox-fav")
const favInputChecked = document.querySelector("input:checked")


const mediaQuery600 = window.matchMedia('(max-width: 600px)');
// mediaQuery600.addEventListener(handle600px);

// function handle600px(e){
//     if(e.matches){
//         preDiv.addEventListener("click", ()=>{
//             moveFrame()
//         })
    
//         }

// }

const els = document.getElementsByClassName('preDiv active');

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

//*Hämtar data från local storage
function load(){
    

    if(savedNotes.length > 0){
        editor.setContents(savedNotes[savedNotes.length -1].content);
        titleInput.value = savedNotes[savedNotes.length -1].title;
        tagInput.value = savedNotes[savedNotes.length -1].tag;
        
        currentNoteId = savedNotes[savedNotes.length -1 ].id;
        currentNote = savedNotes[savedNotes.length -1];

        //Kolla om noten som laddas har ett theme-värde. Isåfall, kör den aktuella theme-funktionen
        changeTheme(savedNotes[savedNotes.length -1 ].theme);
    }

}

///////////////COLOR////////////////////
const themes = {
    xmas: {
        '--primarycolor':'#ffffff',
        '--secondarycolor': '#000000',
        '--color2orange':'#ee0909',
    },
    dark: {
        '--primarycolor':'#222831',
        '--secondarycolor': '#ffffff',
        '--color2orange':'#f96d00',
        
    },
    light: {
        '--primarycolor':'#ffffff',
        '--secondarycolor': '#000000',
        '--color2orange':'#f96d00',
       
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
/* ============================ EVENTLISTENERS! ================================ */ 
/***************************************************************************/

statsBtn.addEventListener('click', () => {
    let statsCon = document.querySelector('.stats-container');

    statsCon.classList.add('show-stats')

    document.querySelector('#total-notes-stat').innerHTML = savedNotes.length;
    document.querySelector('#data-stat').innerHTML = localStorageSpace();


})
exitStatsBtn.addEventListener('click', () => {
    let statsCon = document.querySelector('.stats-container');

    statsCon.classList.remove('show-stats')
})

trashNavBtn.addEventListener('click', () => {
    notePreview.innerHTML = "";
    buildPreviewWind(deletedNotes);
    deleted = true;
})




/***************************************************************************/
/* ============================ FUNCTIONS ================================ */ 
/***************************************************************************/

/* Tillfällig clear LC */
clearLC.addEventListener('click', () => {
    localStorage.clear();
    document.location.reload();
}) 
    
/****************************************************************************/

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
        if (currentNoteId == savedNotes[i].id.toString() ) {
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
    if(favInput == false && deleted == false){
        buildPreviewWind(savedNotes);  
    } else if (favInput == true) {
        buildPreviewWind(favList); 
    } else if (deleted == true){
        buildPreviewWind(deletedNotes)
    }
    
}
    


/*****************************************************/

function createNote() {
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



//Checks for change in tag-input and saves.
titleInput.addEventListener("input", updateArrRebuild)
tagInput.addEventListener("input", updateArrRebuild)



const suggestionListContainer = document.querySelector('#tag-suggestion-datalist');

function suggestionList (){
   removedDup = removeDuplicatesBy(x => x.tag, savedNotes);
   for (let i = 0; i < removedDup.length; i++) {
        if(!removedDup[i].tag == ""){
           suggestionListContainer.innerHTML += removedDup[i].tag;
        }
    }
}
tagInput.addEventListener("input", suggestionList)

//om förändring sker reseta timer för autosave
//https://quilljs.com/docs/api/#editor-change

let autosave;
editor.on('editor-change', () => {
    clearTimeout(autosave)
    autosave = setTimeout( () => {

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
});

//*PRINT
btnPrint.addEventListener("click", () => {
    window.print();
})

window.addEventListener('DOMContentLoaded', () => {
    load()
});

btnAdd.addEventListener("click", () => {
    createNote();
    removeClassActive();
});

function noteTemplate(note) {

    //skapa favorit knapp med tillhörande class och eventlisters
    //ge den klassen starClicked om den har blivit favoriserad innan
    const button = document.createElement('button');
    button.classList.add('star');
    button.innerHTML = `<i class="fas fa-star"></i>`;
    button.addEventListener('click', (e) => {  
        favourite(note)
        if(favInput.checked == true && note.star == false){
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
            if(favInput.checked == false){
                pushToEditor(event, savedNotes);
            } else {
                pushToEditor(event, favList);
            }
            
            
        }
        
    });
    
    if (currentNoteId == note.id){
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



const pushToEditor = (event, arr )=> {
    //console.log("Inside push to editor")
    //handle click
    let thisDivId = event.target.closest('.preDiv').id;
    
    // if(favInput.checked == false) {
        for (let i = 0; i < arr.length; i++) {
            if (thisDivId == arr[i].id.toString()) {
        
                editor.setContents(arr[i].content);
                titleInput.value = arr[i].title;
                tagInput.value = arr[i].tag;
                    
                currentNoteId = thisDivId;
                currentNote = arr[i];
        
                //Kolla om noten som laddas har ett theme-värde. Isåfall, kör den aktuella theme-funktionen
                changeTheme(arr[i].theme);
            }
        }
    // } 
}

favInput.addEventListener("click", () => {
    
    if(favInput.checked === true){
        filterFav(true)
    } else {
        filterFav(false)
    }
});

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


notePreview.addEventListener('click', e => {
    if (e.target.classList.contains('fa-trash')) {
        // todo: kolla om vi är i favoritläget
        id = e.target.closest('div').id
        answer = confirm("Are you sure you want to delete this note?")
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
    deletedNotes.push(savedNotes[index]);
    savedNotes.splice(index, 1);

    if(currentNoteId == id){
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

function searchNotes(str, func = function (note) { return note.title.toLowerCase().includes(str.toLowerCase()) || note.text.toLowerCase().includes(str.toLowerCase()) || note.tag.toLowerCase().includes(str.toLowerCase())}) {
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
       
       
        //map låter dig köra önskad funktion på alla element i en array och returnerar sedan en ny array med "resultatet"
        //Ju lägre siffra desto längre upp i previewfönstret hamnar noten
        const rankedSearch = foundNotes.map(noteObj => {

            let points = 0;

            if (noteObj.text.includes(searchedWord)) {
                points += 4;
            }
            else if (noteObj.text.startsWith(searchedWord)) {
                points += 3;
            }
            else if (noteObj.title.includes(searchedWord)) {
                points += 2;
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
})
// -----------------sök-funktion-SLUT--------------------------------




/* ====================TEMPLATES DROP DOWN start====================*/

//--------------------Variables--------------------
let btn1 = document.querySelector(".templates");
//--------------------Functions--------------------

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function templateFunc() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.addEventListener('click', event =>  {
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
})
//--------------------Event listeners--------------------
btn1.addEventListener("click", templateFunc);

/* ====================TEMPLATES DROP DOWN end====================*/


/* Calculates the  */
let localStorageSpace = function(){
    let data = '';
    for(let key in window.localStorage){

        if(window.localStorage.hasOwnProperty(key)){
            data += window.localStorage[key];
        }

    }

    return data ? ((data.length * 16)/(8 * 1024)).toFixed(2) + ' KB' : 'Empty (0 KB)';
  /*  return data ? (5120 - ((data.length * 16)/(8 * 1024)).toFixed(2)) + ' KB' : '5 MB'; */
};