/* 
Måste få in varje ny note i preview och spara de där.
Sen ska man kunna bläddra bland alla notes man skapat.

Klickar ny så cleares det gamla och laddar den man klickar på (?)
*/

//*En array som sparar anteckningar 
let savedNotes = [];

const main = document.querySelector("main")
const notePreview = document.querySelector(".preview-notes")

const note = document.querySelector(".wrapper");
const btnSave = document.querySelector(".save");
const btnAdd = document.querySelector(".add");
const btnPrint = document.querySelector(".print");



// load = () => {
//     localStorage.getItem(savedNotes)
// }

// window.onload = load();


//TODO Göra om klassen
class Note {
    constructor(title, author, date, text, note, star) {
        this.title = title,
        this.author = author,
        this.date = date,
        this.text = text,
        this.note = note,
        this.id = Date.now(),
        this.star = star
    }

    
    //*Finns media print
    // print() {
    ////     Tar in content från p och sparar det i pContent
    //     let pContent = document.querySelector(".para").innerHTML;
    //     let a = window.open("", "", "height=1000, width=800");
    //     a.document.write("<html>");
    //     a.document.write("<body>");
    //     a.document.write(pContent);
    //     a.document.write("</body></html>");
    //     a.document.close();
    //     a.print();
    // }

    save() {
        let content = tinymce.get("mytextarea").getContent()
        newNote.text = content;     
    }
}

//TODO När vi klickar på knappen så ska det skapas en ny note
btnAdd.addEventListener("click", () => {

    //*Här skapas textarean som tiny behöver innan tiny skapas
    let html = `
    <div class="prompt">
       <label>Title:</label>
       <input class="title" type="text">

       <label>Author:</label>
       <input class="author" type="text">

       <input class="updateNote" type="submit">
    </div>
    <textarea id="mytextarea">Text here</textarea>
    `;

    //*Här lägger vi till textarean i form
    note.innerHTML += html;

    //*TinyMCE initar först när vi klickar på ny note knappen, så den skapas när man klickar på knappen
    /* Tiny MCE */
    tinymce.init({
        selector: '#mytextarea',
        height: 600

        //Adds save button START
    plugins: 'save',
        toolbar: 'save',
        //Adds save button END
        //Function that run when clicking the save button START
        save_onsavecallback: function () {
            console.log("Note saved");
        }
    //Function that run when clicking the save button END
    });
  
    let content = tinymce.get("mytextarea").getContent()
    let date = new Date()
    newNote = new Note("New note", "No author", date.getTime(), content, note, false)


    previewHtml = `
    <div>
        <h3>${newNote.title}</h3>
        <p>${newNote.text}</p>
    </div>
    `;

    notePreview.innerHTML += previewHtml;
    const title = document.querySelector(".title")
    const author = document.querySelector(".author")
    const updateNote = document.querySelector(".updateNote")


    savedNotes.push(newNote)
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes))

    for(let i = 0; i < savedNotes.length; i++){
        console.log(savedNotes)
    }

    //*Tanken är att man ska kunna ändra title och author på sina notes här och värdena ska uppdateras i local storage och i arrayen
    updateNote.addEventListener("click", e =>{
        e.preventDefault();
        newNote.title = title.value;
        newNote.author = author.value;  
        

        localStorage.setItem("savedNotes", JSON.stringify(savedNotes))
             
    
        note.reset();
        console.log("prompt clicked")

        
    })

})

btnPrint.addEventListener("click", () => {
    note1.print()
})

btnSave.addEventListener("click", () => {
    console.log("save")
    newNote.save();
})




//visar datum-klockslag-----------------------------------
// const datum = new Date();
// const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());
