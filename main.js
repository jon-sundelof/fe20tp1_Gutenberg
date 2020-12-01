
let exEditor = false;

//*QUILL OPTIONS
let toolbarOptions = [
    ['bold', 'italic', 'underline',],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
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

// const btnSave = document.querySelector(".save");
const btnAdd = document.querySelector(".add");
const btnPrint = document.querySelector(".print");

const titleInput = document.querySelector("#title-input");

/************************/
//******** QUILL ********/
/************************/

//let editor = new Quill('#editor', options);
let options =  {
    modules: {
        toolbar: toolbarOptions,
    },
    placeholder: 'Compose an epic story...', //placeholder text 
    readOnly: false, // kan bara läsa texten om true, kanske är so preview?
    theme: 'bubble'
}

let editor = new Quill('#editor', options);
let delta = editor.getContents(); //getContents(index: Number = 0, length: Number = remaining): Delta


/************************/
//***** FUNCTIONS *******/
/************************/
let savedNotes = [];

    if (!localStorage.getItem('savedNotes') || localStorage.getItem('savedNotes').length < 0) {
        savedNotes = [];
    } else {
        savedNotes = JSON.parse(localStorage.getItem('savedNotes'));

        for (let i = 0; i <savedNotes.length; i++) {
            const preDiv = document.createElement("div");
            preDiv.innerHTML = `<h3>${savedNotes[i].title}</h3><p>${savedNotes[i].text}</p><p>${savedNotes[i].date}</p>`;
            preDiv.setAttribute('class', 'preDiv');
            preDiv.setAttribute('id', savedNotes[i].id);
            notePreview.append(preDiv);
          }
    }

/* function checkForInput(){ 
if (titleInput.value == "" || titleInput.value == "New Note"){

    return "New Note";

} else {
    return titleInput.value;
    }
} */


//*Hämtar data från local storage
load = () => {
    let stored = JSON.parse(localStorage.getItem("savedNotes"))
    console.log(stored)
}

/************************/
//**** NOTE KLASSEN *****/
/************************/
class Note {
    constructor(title, date, text, star) {
        this.title = title,
        this.date = date,
        this.text = text,
        this.star = star,
        this.id = Date.now()
    }

    save() {
            
    }

}

/************************/
//**** Target.Event function för att kunna "target" sina anteckningar *****/
/************************/

const previewDiv = document.querySelectorAll('.preDiv');
let pressedPreview = false;

previewDiv.forEach(item => {
    item.addEventListener('click', event => {
      //handle click
    let thisDivId = event.target.closest('.preDiv').id;
    console.log(thisDivId);
    for (let i = 0; i < savedNotes.length; i++){
        if (thisDivId == savedNotes[i].id.toString()){
            
            editor.setText(savedNotes[i].text);
            titleInput.value = savedNotes[i].title;

            currentNoteId = thisDivId;
            pressedPreview = true;

        }
        }
     });
  });







//kommenterade ut då jag ej fatta vad den är till för? :3
/* let newNote = savedNotes[0] */

//Variabel för vilket id den aktiva noten har 
let currentNoteId;
let length = savedNotes.length;
let currentNote;

setInterval( () => {

    if(pressedPreview == false){

    if (length <= 0 || savedNotes[savedNotes.length - 1].id !== currentNoteId){
        textContent = editor.getText();
        /* checkForInput() */
        let newNote = new Note (titleInput.value, date, textContent, false);
        savedNotes.push(newNote);
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));


        const preDiv = document.createElement("div");
        preDiv.innerHTML = `<h3>${savedNotes[savedNotes.length - 1].title}</h3><p>${savedNotes[savedNotes.length - 1].text}</p><p>${savedNotes[savedNotes.length - 1].date}</p>`;
        preDiv.setAttribute('class', 'preDiv');
        preDiv.setAttribute('id', savedNotes[savedNotes.length - 1].id);
        notePreview.append(preDiv);

        currentNote = savedNotes[savedNotes.length - 1];

     
    } else {


    for (let i = 0; i < savedNotes.length; i++){
        if (currentNoteId == savedNotes[i].id.toString()){
            textContent = editor.getText()
            savedNotes[i].title = titleInput.value;
            savedNotes[i].date = date;
            savedNotes[i].text = textContent;
            savedNotes[i].star = false;

        }
    }

   /*  savedNotes.push(newNote); */
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    let nodes = document.querySelectorAll(".preDiv");
    for(var i = 0; i < nodes.length; i++){
    nodes[i].parentNode.removeChild(nodes[i]);
    }

    for (let i = 0; i < savedNotes.length; i++) {
        const preDiv = document.createElement("div");
        preDiv.innerHTML = `<h3>${savedNotes[i].title}</h3><p>${savedNotes[i].text}</p><p>${savedNotes[i].date}</p>`;
        preDiv.setAttribute('class', 'preDiv');
        preDiv.setAttribute('id', savedNotes[i].id);
        notePreview.append(preDiv);
      }
 
}

    if(pressedPreview == false) {
        currentNoteId = savedNotes[savedNotes.length -1].id;
    }
  } else {
      
    for (let i = 0; i < savedNotes.length; i++){
        if (currentNoteId == savedNotes[i].id.toString()){
            textContent = editor.getText()
            savedNotes[i].title = titleInput.value;
            savedNotes[i].date = date;
            savedNotes[i].text = textContent;
            savedNotes[i].star = false;

        }
    }

   /*  savedNotes.push(newNote); */
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    let nodes = document.querySelectorAll(".preDiv");
    for(var i = 0; i < nodes.length; i++){
    nodes[i].parentNode.removeChild(nodes[i]);
    }

    for (let i = 0; i < savedNotes.length; i++) {
        const preDiv = document.createElement("div");
        preDiv.innerHTML = `<h3>${savedNotes[i].title}</h3><p>${savedNotes[i].text}</p><p>${savedNotes[i].date}</p>`;
        preDiv.setAttribute('class', 'preDiv');
        preDiv.setAttribute('id', savedNotes[i].id);
        notePreview.append(preDiv);
      }
  }
   
length = savedNotes.length;

  //Hitta innehållet, om id ej finns, spara i local storage
    //* HÄR ONUR

//Kommenterade ut din karl. :) Hoppas de inte är några konstigheter
 /*    if(savedNotes[0].id == newNote.id){
        console.log("Array är inte tom")

        newNote.text = textContent;
        newNote.title = titleInput.value;

        localStorage.setItem("savedNotes", JSON.stringify(savedNotes))
        console.log(savedNotes)
    } else {
        console.log("Array är tom")
        savedNotes.push(newNote)
    } */
 
}, 3000);


//*En function där våran note skapas
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
           
        let date = new Date()
        

        exEditor = true;
    }
}


//*När man klickar save så sparas texten fast texten sparas i html format som förut.
//*Varje gång man sparar så sparas det en ny note, fast den borde overwrita den man är på (?).
onSave = () =>{
   
    
}

/************************/
//***** FUNCTIONS *******/
/************************/

//*Varje gången sidan refreshas eller besöks så körs "load" functionen
window.onload = load();

//*PRINT
btnPrint.addEventListener("click", () =>{
    //window.print(delta);
    content = editor.getText();
    let divContents = content;
    let openWindow = window.open("","","width=700, height=900");
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
onSave = () =>{
   
    
}

/************************/
//***** FUNCTIONS *******/
/************************/

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
