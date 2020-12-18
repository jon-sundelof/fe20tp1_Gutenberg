//Create note object with desired structure
let templatesArr = [{
    ops: [
        { insert: 'Welcome to Knuts birthday party!', attributes: { bold: true, color: '#f96d00', } },
        { insert: '\nKnut is finally turning 5.' },
        { insert: '\nCome as you are but wear a funny hat, as you know Knut can not get enough of those'},
        { insert: '\nBest regards/Knuts father', attributes: { color: 'purple' } }
    ]}, {
    ops: [
        { insert: "A Gutenberg's Novel", attributes: { bold: true, color: 'black', } },
        { insert: '\n\nThe road that has been long but fun and full of knowledge.' },
        { insert: '\nOne day a group of five hardworking individuals set out to create the worlds finest note-app of all time! The journey took them far and short, high and low. Nothing of what they encounterd was ever in their wildest imagination......................to be continued'},
        { insert: '\n\nRead more in the uppcoming novel, "Gutenberg meets the world of code!"', attributes: { color: '#33333' } },
        { insert: '\nPowered by TinyMCE!', attributes: { color: 'purple' } }
    ]}, {
    ops: [
        { insert: "My Love For My Baby Love", attributes: { bold: true, color: 'pink', } },
        { insert: '\nBaby, when you hold me, my emotions makes it clear Just how much you mean to me while we are laying here. I listen to your heartbeat in rhythm with my own, With every pound that warming sound keeps me safe with love youve shown. Baby, when you touch me with hands so soft but strong, You wrap me in your warm embrace, just where I belong. You hold me close and comfort me all throughout the night Until you open up your eyes to first signs of daylight. Baby when you kiss me before you start your day, The happiness you bring my heart, no words can ever say. You make my life so beautiful, wonderful, and new. Youre my hopes and dreams. Youre my everything, Im so in love with you.', attributes: { color: 'red' } },
        { insert: '\n\n', attributes: { color: 'red' } },
        { insert: '\n\n<3', attributes: { color: 'red' } },
        { insert: '\nPowered by TinyMCE!', attributes: { color: 'purple' } }
    ]}];

function templateClick (e){
    let tmpBtnValue = e.target.closest('.dropdown-content > button').value;
    openTemp(tmpBtnValue)
}


const tempBtn = document.querySelector('#myDropdown');
tempBtn.addEventListener('click', templateClick)

function openTemp(value) {
    const datum = new Date();
    const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());

    titleInput.value = "New template";
    let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents);
    savedNotes.push(newNote);
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    const preDiv = noteTemplate(newNote);
    notePreview.prepend(preDiv);

    editor.setContents(templatesArr[value]);

    currentNote = newNote;
    currentNoteId = newNote.id;

}

function buildPreviewWindDel(renderedList) {
    notePreview.innerHTML = "";
    for (let i = 0; i < renderedList.length; i++) {
        const preDiv = noteTemplateDel(renderedList[i])
        notePreview.prepend(preDiv);
    }
}

function noteTemplateDel(note) {
    const preDivDel = document.createElement("div");
    preDivDel.innerHTML = `<div class="title-input-cont"><h3>${note.title.substr(0, 20)}</h3>
    <input type="checkbox" name="del-checkbox" class="del-checkbox">
    </div>
    <div class="button">
    </div>
    <p>${note.text.substr(0, 70)} ...</p>
    <div class="preDivTagCon">
    <p class="pretime">${note.date}</p>
    </div>`;
    preDivDel.setAttribute('class', 'preDivDel');

    preDivDel.setAttribute('id', note.id);
    return preDivDel;
}

function boxSetStyle() {
const ckb = document.querySelectorAll(".preDivDel input[type=checkbox]:checked");
[...ckb].forEach( el => {
    if( el.checked ) {
      // Is checked!
      console.log( el.value )
    } else {
      // Not checked one
      // ... do something else
    /*   el.closest("label").style.background = "gray"; */
    }
  })
};


//////////////////////////////////
//HAR INTE RÖRT NÅGOT HÄR UNDER :3
//////////////////////////////////

/* function getSelectedCheckboxValues() {
    const checkboxes = document.querySelectorAll(`input[name="del-checkbox"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
        checkboxes.innerHTML += "dasdasjidasoidp";
    });
    return values;
} */

/* 
notePreview.addEventListener('click', e => {
    if (e.target.classList.contains('fa-minus-circle')) {
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
 /*    deletedNotes.push(savedNotes[index]); */
/*     deletedNotes.splice(index, 1);

    if(currentNoteId == id){
        editorTheme.setAttribute('id', '');
        editor.setText("");
        titleInput.value = "";
    }
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
}  */