
let exEditor = false;

//*QUILL OPTIONS
let toolbarOptions = [
    ['bold', 'italic', 'underline',],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    [{ 'header': [1, 2, 3, false] }],   
];



//const printscreen = document.querySelector('.printscreen')
const notePreview = document.querySelector(".preview-notes");

//*Detta är en editorn
const note = document.querySelector("#editor")

// const btnSave = document.querySelector(".save");
const btnAdd = document.querySelector(".add");
const btnPrint = document.querySelector(".print");

const titleInput = document.querySelector("#title-input")

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

let newNote = savedNotes[0]

setInterval( () => {
    
    //Hitta innehållet, om id ej finns, spara i local storage
    //* HÄR ONUR
    textContent = editor.getText()
    
    
    if(savedNotes[0].id == newNote.id){
        console.log("Array är inte tom")

        newNote.text = textContent;
        newNote.title = titleInput.value;

        localStorage.setItem("savedNotes", JSON.stringify(savedNotes))
        console.log(savedNotes)
    } else {
        console.log("Array är tom")
        savedNotes.push(newNote)
    }
}, 20000);

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
