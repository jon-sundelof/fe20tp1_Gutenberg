/* ====================TEMPLATES DROP UP start====================*/
//--------------------Event listeners--------------------
themesBtn.addEventListener("click", themesFunc);
formalBtn.addEventListener('click', () =>{
    let themeNum = 1;
    changeTheme(themeNum)
});
playfulBtn.addEventListener('click', () => {
    let themeNum = 2;
    changeTheme(themeNum)
});

//--------------------Functions--------------------

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function themesFunc() {
    document.getElementById("myDropup").classList.toggle("theme-show");
}

// Close the dropdown menu if the user clicks outside of it
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
/* ====================TEMPLATES DROP UP end====================*

/* 
themesBtn.addEventListener('click', () => {
    changeTheme();
});
 */

let editorTheme = editor.root;

function checkIfNoteHasTheme () {
    //LÖS DETTA!!!!!!!!!!!!!!!!!!!!!
};

function changeTheme (themeNum) {
    
//Checks what note is in the editor at the moment and changes that notes theme value to = 1
  for (let i = 0; i < savedNotes.length; i++) {
        if (currentNoteId == savedNotes[i].id.toString()) {
            savedNotes[i].theme = themeNum;       
        }
    } 
    //2. Har currentNote theme = 1? Gör dethär i editorn
        //CSS-FUNKTIONEN
    if (currentNote.theme == 1) {
        editorTheme.setAttribute('id', 'formal');
    } else if (currentNote.theme == 2){
        editorTheme.setAttribute('id', 'playful');
     };
};