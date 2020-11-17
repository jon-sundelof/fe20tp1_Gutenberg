const note = document.querySelector(".editor");
const btnSave = document.querySelector(".save");
const content = document.querySelector(".content-wrapper")
const btnAdd = document.querySelector(".add")

class Note{
    constructor(title, author, date, text){
        this.title = title,
        this.author = author,
        this.date = date,
        this.text = text
    }
}

//TODO När vi klickar på knappen så vill vi skapa ett nytt doc
btnAdd.addEventListener("click", () =>{
    const date = new Date()
    let newDate = date.getHours() + ":" + ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes()) + ' / ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ((date.getDate() < 10 ? '0' : '') + date.getDate());

    let html = `
        <div class="editor">

        </div>
    `;

    note1 = new Note("Nytt doc", "Jesper", newDate, "")
    content.innerHTML += html;
    
})

//*En array som sparar anteckningar 
let savedNotes = [];
let page = 0;

/* -----TEXTFORMATERING (bold, italic etc)----- */
onclick = e => {
    if (e.target.classList.contains("fa-bold")) {
        document.execCommand("bold")
    } else if (e.target.classList.contains("fa-italic")) {
        document.execCommand("italic")
    } else if (e.target.classList.contains("fa-list")) {
        document.execCommand("insertunorderedlist")
    }
}

btnSave.addEventListener("click", () =>{
    
    //*Sparar div i en array
    savedNotes.push(note)
    //*Sparar array i local storage
    
    localStorage.setItem("notes", savedNotes[page].innerText)
    //++page;
    
})

let text = localStorage.getItem("notes")
// note.innerText = text;




//visar datum-klockslag-----------------------------------
// const datum = new Date();
// const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());
