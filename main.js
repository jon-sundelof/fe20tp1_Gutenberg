/* Tiny MCE */
tinymce.init({
    selector: '#mytextarea',
    height: 600
    //  max_height: 500,
    //  max_width: 500,
    //  min_height: 100,
    //  min_width: 400

});



const note = document.querySelector(".editor");
const content = document.querySelector(".content-wrapper");

const btnSave = document.querySelector(".save");
const btnAdd = document.querySelector(".add");
const btnPrint = document.querySelector(".print");



load = () => {
    localStorage.getItem("savedNotes")
    localStorage.getItem("noteText")
}

window.onload = load();


//*En array som sparar anteckningar 
let savedNotes = [];

class Note {
    constructor(title, author, date, text, note) {
        this.title = title,
            this.author = author,
            this.date = date,
            this.text = text,
            this.note = note
    }

    //*Metod för att printa
    print() {
        //*Tar in content från p och sparar det i pContent
        let pContent = document.querySelector(".para").innerHTML;
        let a = window.open("", "", "height=1000, width=800");
        a.document.write("<html>");
        a.document.write("<body>");
        a.document.write(pContent);
        a.document.write("</body></html>");
        a.document.close();
        a.print();
    }

    save() {
        let pContent = document.querySelector("#mytextarea").innerHTML;
        this.text = pContent;
        localStorage.setItem("noteText", JSON.stringify(pContent))
    }
}

//TODO När vi klickar på knappen så vill vi skapa ett nytt doc
btnAdd.addEventListener("click", () => {
    console.log("create")
    const date = new Date()
    let newDate = date.getHours() + ":" + ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes()) + ' / ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ((date.getDate() < 10 ? '0' : '') + date.getDate());

    let i = 0;
    let html = `
        <div class="editor note${i}">
            <p contenteditable="true" class="para"></p>
        </div>
    `;

    //content.innerHTML += html;
    note1 = new Note("Nytt doc", "Jesper", newDate, "")

    localStorage.setItem("savedNotes", JSON.stringify(note1))

})

// let myObj = {id: Date.now(), name: 'Krille'}
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

btnPrint.addEventListener("click", () => {
    note1.print()
})

btnSave.addEventListener("click", () => {
    console.log("save")
    //let pContent = document.querySelector(".para").innerHTML;
    //note1.text = pContent;
    note1.save();
    localStorage.setItem("savedNotes", JSON.stringify(note1))

})




//visar datum-klockslag-----------------------------------
// const datum = new Date();
// const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());
