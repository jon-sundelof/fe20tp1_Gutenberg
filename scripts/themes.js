/***************************************************************************/
/* ============================== VARIABLES ============================== */
/***************************************************************************/

//editorTheme points to the currently opened editor
let editorTheme = editor.root;
let tagBtn = document.querySelector(".tag-btn");
let tagDivDrop = document.querySelector('#myTagDown');
let tagListner = document.querySelector('#myTagDown');
let removedDup;
const showAllNotes = document.querySelector('#show-all-notes');
const settingsBtn = document.querySelector('.settings');


/***************************************************************************/
/* ============================ EVENTLISTENERS! ===========================*/
/***************************************************************************/
function settingsFunc() {
    document.getElementById("myDropuptwo").classList.toggle("settings-show");
}

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

tagBtn.addEventListener("click", tagFunc);

// Close the dropdown menu if user clicks outside of it
window.addEventListener("click", event => {
    if (!event.target.matches('.themes')) {
        let dropdowns = document.getElementsByClassName("dropup-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('theme-show')) {
                openDropdown.classList.remove('theme-show');
            }
        }
    }
});



showAllNotes.addEventListener('click', updateArrRebuild);
showAllNotes.addEventListener('click', () => {
    showAllNotes.classList.remove("show-tag-btn");
});

settingsBtn.addEventListener("click", settingsFunc);

// Close the dropdown menu if user clicks outside of it
window.addEventListener("click", event => {
    if (!event.target.matches('.settings')) {
        let dropdowns = document.getElementsByClassName("dropup-content-two");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('settings-show')) {
                openDropdown.classList.remove('settings-show');
            }
        }
    }
}); 


/***************************************************************************/
/* ============================ FUNCTIONS ================================ */
/***************************************************************************/

// function checkIfNoteHasTheme() {
//     //LÖS DETTA!!!!!!!!!!!!!!!!!!!!!
// };

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

function removeDuplicatesBy(keyFn, array) {
    let mySet = new Set();
    return array.filter(function (x) {
        let key = keyFn(x), isNew = !mySet.has(key);
        if (isNew) mySet.add(key);
        return isNew;
    });
}

function tagFunc() {
    document.querySelector("#myTagDown").classList.toggle("show-tags");
    
    let nodes = document.querySelectorAll(".tagBtnClass");
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].parentNode.removeChild(nodes[i]);
    }
     
 removedDup = removeDuplicatesBy(x => x.tag, savedNotes);

    for (let i = 0; i < removedDup.length; i++) {
        if (!removedDup[i].tag == "") {
            let tagBtn = document.querySelector('#myTagDown');
            let button = document.createElement("button");
            button.classList.add("tagBtnClass");
            button.setAttribute("id", "dropdown-" + i)
            button.innerHTML += `<i id="nav-tag-dop" class="fas fa-tag"></i> ${removedDup[i].tag}`
            tagBtn.appendChild(button);


            /* tagBtn.addEventListener('click', tagSearch); */

          /*   tagBtn.addEventListener('click', (e) => {
                id = e.target.closest(".tagBtnClass").innerText
                runTagInSearch(e)       
            }) */
            
        }
    }
}

window.addEventListener("click", (event) => {
    if (!event.target.matches('.tag-btn')) { 
        let dropdowns = document.querySelector(".tag-show");
            
            if (dropdowns.classList.contains('show-tags')) {
                dropdowns.classList.remove('show-tags');   
        
        } 
    } 
}); 

/* =========================== ONUR start ===========================*/
/* 
function searchNotes(str, func = function (note) { return note.tag.toLowerCase().includes(str.toLowerCase()) }) {

    return savedNotes.filter(func)
}

const tagBtnTwo = document.querySelectorAll('.tagBtnClass') 


tagBtnTwo.addEventListener("click", (e) => {

    let tagText = e.target.closest(".tagBtnClass").innerHTML;

    if (tagText) {
        tagList = searchTag(tagText, x => x.tag)
    } else {
        tagList = savedNotes;
    }
    notePreview.innerHTML = "";
    buildPreviewWind(tagList);

})
 */
/* =========================== ONUR slut ===========================*/

let foundNotes;

function searchForTag(str, func = function (note) { return note.tag.toLowerCase().includes(str.toLowerCase()) }) {
    return savedNotes.filter(func)
}



tagListner.addEventListener('click', runTagInSearch);

function runTagInSearch (e){
   let thisButtonId = e.target.closest('#myTagDown > button').id;
   let buttonTagText = document.getElementById(thisButtonId).innerText;
  
   showAllNotes.classList.add("show-tag-btn");
   showAllNotes.innerHTML = '<i class="far fa-times-circle"></i>' + 'Tag:' + " " + buttonTagText; 

    notePreview.innerHTML = "";
    console.log(buttonTagText);
    foundNotes = searchForTag("hästar");

    
    console.log(foundNotes);
    
    buildPreviewWind(foundNotes); 
}
/**************************************/
showAllNotes.addEventListener('click', updateArrRebuild);
showAllNotes.addEventListener('click', () => {
showAllNotes.classList.remove("show-tag-btn");
})