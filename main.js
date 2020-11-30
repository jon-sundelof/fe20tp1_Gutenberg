let exEditor = false;

//*QUILL OPTIONS
let toolbarOptions = [
    ['bold', 'italic', 'underline',],
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

//*En array där vi sparar våra notes
let savedNotes = [];

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

    save() {

    }

}

const previewDiv = document.querySelectorAll('.preDiv');

let previewDivArray = Array.from(previewDiv);
console.log(previewDivArray);

//*En function där våran note skapas
//TODO Denna måste fixas till lite
function createNote() {

}

let pressedPreview = false;
let thisDivIndex;



previewDiv.forEach(item => {
    item.addEventListener('click', event => {
        //handle click

        let thisDivId = event.target.closest('.preDiv').id;
        console.log("Div id: " + thisDivId);

        let thisDivIndex = savedNotes.findIndex(x => x.id === thisDivId);
        console.log(thisDivIndex);

        if (thisDivId.toString() == savedNotes[thisDivIndex].id.toString()) {

            editor.setText(savedNotes[thisDivIndex].text);
            titleInput.value = savedNotes[thisDivIndex].title;

            currentNoteId = thisDivId;
            pressedPreview = true;

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
            /* checkForInput() */
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




//*När man klickar save så sparas texten fast texten sparas i html format som förut.
//*Varje gång man sparar så sparas det en ny note, fast den borde overwrita den man är på (?).
onSave = () => {

}
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
//*När man klickar save så sparas texten fast texten sparas i html format som förut.
//*Varje gång man sparar så sparas det en ny note, fast den borde overwrita den man är på (?).
//*Ska vi ha kvar denna??
onSave = () =>{
   
    
}

//*Varje gången sidan refreshas eller besöks så körs "load" functionen
window.onload = load();

// btnPrint.addEventListener("click", () =>{
//     console.log(delta);
//     //printscreen.innerHTML = editor.getContents();
//     //editor.getContents();
//     //printscreen.innerHTML = editor;
// })


btnAdd.addEventListener("click", () => {
    createNote();
})

