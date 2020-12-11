
/* ==================== VARIABLES ====================*/
//editorTheme points to the currently opened editor
let editorTheme = editor.root;

/* ==================== EVENT LISTENERS ====================*/
themesBtn.addEventListener("click", themesFunc);
formalBtn.addEventListener('click', () => {
    let themeNum = 1;
    changeTheme(themeNum)
});
playfulBtn.addEventListener('click', () => {
    let themeNum = 2;
    changeTheme(themeNum)
});
defaultBtn.addEventListener('click', () => {
    let themeNum = 0;
    changeTheme(themeNum)
});
/* xmasBtn.addEventListener('click', () => {
    let themeNum = 3;
    changeTheme(themeNum)
}); */

/* ==================== FUNCTIONS ====================*/
function checkIfNoteHasTheme() {
    //LÖS DETTA!!!!!!!!!!!!!!!!!!!!!
};

function changeTheme(themeNum) {

    //If there is no active note, a new note is created.
    if (currentNote == undefined) {
        createNote();
    }

    //Checks what note is in the editor at the moment and changes that notes theme value to what themeNum is assigned to
    for (let i = 0; i < savedNotes.length; i++) {
        if (currentNoteId == savedNotes[i].id.toString()) {
            savedNotes[i].theme = themeNum;
            //kör til LC 
            localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
        }
    }
    
    //If user clicks on formal button, editorTheme gets an id of #formal, hence activating a CSS rule-set
    if (currentNote.theme == 1) {
        editorTheme.setAttribute('id', 'formal');
        //If user clicks on playful button, editorTheme gets an id of #playful, hence activating a CSS rule-set
    } else if (currentNote.theme == 2) {
        editorTheme.setAttribute('id', 'playful');
    } else if (currentNote.theme == 3) {
       /*  editorTheme.setAttribute('id', 'xmas'); */
    } else if (currentNote.theme == 0) {
        editorTheme.setAttribute('id', '');
    }
};

/* ==================== DROP-UP functions ====================*/
//When user clicks on the button, toggle between hiding and showing the dropdown content
function themesFunc() {
    document.getElementById("myDropup").classList.toggle("theme-show");
}

// Close the dropdown menu if user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.themes')) {
        var dropdowns = document.getElementsByClassName("dropup-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('theme-show')) {
                openDropdown.classList.remove('theme-show');
            }
        }
    }
}