let exEditor = false;

//*QUILL OPTIONS
let toolbarOptions = [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    [{ 'header': [1, 2, 3, false] }],
    ['image','link']
];

/************************/
//*****Search START *****/
/************************/

//notes = note-objekt inuti savedNotes
//group = savedNotes filtrerat med users sök-input

const list = document.getElementById('list');

function setList(group) {
    clearList();
    for (const notes of group) {
        const item = document.createElement('li');
        const text = document.createTextNode(notes.title);
        item.appendChild(text);
        list.appendChild(item);
    }
    if (group.length === 0) {
        setNoResults();
    }
}

//Rensar list-items
function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}
//När inga sökresultat hittas
function setNoResults() {
    const item = document.createElement('li');
    const text = document.createTextNode('No results found');
    item.appendChild(text);
    list.appendChild(item);
}
//Sortera sökresultat via relevans. PRIO: 
//*Exakt rätt titel (if)
//*Börjar rätt (else if)
//*Alla andra fall (else if)
function getRelevancy(value, searchTerm) {
    if (value === searchTerm) {
        return 2;
    } else if (value.startsWith(searchTerm)) {
        return 1;
    } else if (value.includes(searchTerm)) {
        return 0;
    }
}

const searchInput = document.getElementById('search');

/* ==================== EVENT LISTENER ==================== */
searchInput.addEventListener('input', (event) => {
    let value = event.target.value;
    //Kollar om value finns, om längden är längre än 0 + tar bort mellanrum innan och efter users sök
    if (value && value.trim().length > 0) {
        value = value.trim();
        //Skapar nytt list-item, filtrerat via sökterm
        setList(savedNotes.filter(notes => {
            //Om söktermen är någon del av en notes titel returneras den
            return notes.title.includes(value);
            //Sorterar sökresultat via relevans
        }).sort((noteA, noteB) => {
            return getRelevancy(noteB.title, value) - getRelevancy(noteA.title, value);
        }));
    } else {
        clearList();
    }
});

/************************/
//***** Search END ******/
/************************/

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

var preciousContent = document.getElementById('myPrecious');

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



var Delta = Quill.import('delta'); // provar delta
let editor = new Quill('#editor', options);
function getQuillHtml() { return editor.root.innerHTML; } //getQuillHtml() tar html texten från quill-editorn |Delta kan vara bättre
const getQuill = editor.root.innerHTML;
//let delta = editor.getContents();

// Store accumulated changes
var change = new Delta();
const delta = editor.getContents();

var container = editor.addContainer('ql-custom');
 editor.on('text-change', function(delta) {
   change = change.compose(delta);
   console.log(change)
 });

 

// Save periodically
// setInterval(function() {
//     if (change.length() > 0) {
//       console.log('Saving changes', change);
//       /* 
//       Send partial changes
//       $.post('/your-endpoint', { 
//         partial: JSON.stringify(change) 
//       });
      
//       Send entire document
//       $.post('/your-endpoint', { 
//         doc: JSON.stringify(quill.getContents())
//       });
//       */
//       change = new Delta();
//     }
  //}, 5*1000);
  
// Check for unsaved data
//   window.onbeforeunload = function() {
//     if (change.length() > 0) {
//       return 'There are unsaved changes. Are you sure you want to leave?';
//     }
//   }
  
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
    for (let i = 0; i < savedNotes.length; i++) {
        if (currentNoteId == savedNotes[i].id.toString()) {
            textContent = getQuillHtml()
            savedNotes[i].title = titleInput.value;
            savedNotes[i].date = date;
            savedNotes[i].text = textContent;
            savedNotes[i].star = false;

        }
    }

    /*  savedNotes.push(newNote); */
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    let nodes = document.querySelectorAll(".preDiv");
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].parentNode.removeChild(nodes[i]);
    }

    buildPreviewWind();

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
function createNote() {
    textContent = getQuill;
    let newNote = new Note(titleInput.value, date, textContent, false);
    savedNotes.push(newNote);
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));


    const preDiv = document.createElement("div");
    preDiv.innerHTML = `<p>${savedNotes[savedNotes.length - 1].date}</p>`;
    preDiv.setAttribute('class', 'preDiv');
    preDiv.setAttribute('id', savedNotes[savedNotes.length - 1].id);
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



previewDiv.forEach(item => {
    item.addEventListener('click', event => {
        //handle click
        let thisDivId = event.target.closest('.preDiv').id;
        console.log(thisDivId);
        for (let i = 0; i < savedNotes.length; i++) {
            if (thisDivId == savedNotes[i].id.toString()) {
                console.log(savedNotes[i].id.toString())

                editor.root.innerHTML = savedNotes[i].text;
                titleInput.value = savedNotes[i].title;

                currentNoteId = thisDivId;
                console.log("Current note id: " + currentNoteId)
                pressedPreview = true;

            }
        }
    });
});



//Variabel för vilket id den aktiva noten har 
let currentNoteId;
let length = savedNotes.length;
let currentNote;

setInterval(() => {

    if (pressedPreview == false) {
        // Kollar ifall arrayen är tome eller om noteId inte inte matchar senast skapta ID- I båda fallen skapar den ny note. 
        if (length <= 0 || savedNotes[savedNotes.length - 1].id !== currentNoteId) {
            textContent = getQuill;
            let newNote = new Note(titleInput.value, date, textContent, false);
            savedNotes.push(newNote);
            localStorage.setItem("savedNotes", JSON.stringify(savedNotes));


            const preDiv = document.createElement("div");
            preDiv.innerHTML = `<h3>${savedNotes[savedNotes.length - 1].title}</h3><p>${savedNotes[savedNotes.length - 1].text}</p><p>${savedNotes[savedNotes.length - 1].date}</p>`;
            preDiv.setAttribute('class', 'preDiv');
            preDiv.setAttribute('id', savedNotes[savedNotes.length - 1].id);
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
}, 4000);


//*PRINT
btnPrint.addEventListener("click", () => {
    //window.print(delta);
    content = getQuillHtml();
    //console.log(preciousContent );
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

