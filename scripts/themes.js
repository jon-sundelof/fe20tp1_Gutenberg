
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
})
///////////////////////////////////////////////////////////////////////
let tagBtn = document.querySelector(".tag-btn");
let tagDivDrop = document.querySelector('.tagDown-content');

tagBtn.addEventListener("click", tagFunc); 

function removeDuplicatesBy(keyFn, array) {
    let mySet = new Set();
    return array.filter(function(x) {
        let key = keyFn(x), isNew = !mySet.has(key);
        if (isNew) mySet.add(key);
        return isNew;
    });
}

let removedDup;

function tagFunc() {
    let nodes = document.querySelectorAll(".tagBtnClass");
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].parentNode.removeChild(nodes[i]);
    }
    
    removedDup = removeDuplicatesBy(x => x.tag, savedNotes);
    
    for (let i = 0; i < removedDup.length; i++) {
        if(!removedDup[i].tag == ""){

        document.getElementById("myTagDown").innerHTML += '<button class="tagBtnClass" id="' + i + '"><i id="nav-tag-dop" class="fas fa-tag"></i>' + removedDup[i].tag + '</button>';
       }
        document.getElementById("myTagDown").classList.toggle("tag-show");
     }
}

// Close the dropdown menu if user clicks outside of it

window.onclick = function (event) {
    if (!event.target.matches('.tag-btn')) {
        let dropdowns = document.getElementsByClassName("tagDown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('tag-show')) {
                
                openDropdown.classList.remove('tag-show');
            }
        }
    }
 }


 /******************************************/


 let tagListner = document.querySelector('.tagDown-content');

 tagListner.addEventListener('click', runTagInSearch);


 function runTagInSearch (e){
    let thisButtonId = e.target.closest('.tagDown-content > button').id;
    let buttonTagText = document.getElementById(thisButtonId).innerText;
   
    showAllNotes.classList.add("show-tag-btn");
    showAllNotes.innerHTML = '<i class="far fa-times-circle"></i>' + 'Tag:' + " " +buttonTagText; 


   notePreview.innerHTML = "";
   if (buttonTagText.length >= 1) {
       let foundNotes = searchNotes(buttonTagText);

       const rankedSearch = foundNotes.map(noteObj => {

           let points = 0;

           if (noteObj.text.includes(buttonTagText)) {
               points += 4;
           }
           if (noteObj.text.startsWith(buttonTagText)) {
               points += 3;
           }
           if (noteObj.title.includes(buttonTagText)) {
               points += 2;
           }
           if (noteObj.title.startsWith(buttonTagText)) {
               points += 1;
           }
           return {...noteObj, points};
       }).sort((a, b) => b.points - a.points);

       buildPreviewWind(rankedSearch);
   } else {
       // anv har tömt sökrutan
       buildPreviewWind(savedNotes)
   }
 }
 /**************************************/
 const showAllNotes = document.querySelector('#show-all-notes');
 showAllNotes.addEventListener('click', updateArrRebuild);
 showAllNotes.addEventListener('click', () => {
    showAllNotes.classList.remove("show-tag-btn");
 })

 /******************************************************************/



 /*********************** Settings-Drop-Up start ********************/

const settingsBtn = document.querySelector('.settings')
 settingsBtn.addEventListener("click", settingsFunc);

 function settingsFunc() {
    document.getElementById("myDropuptwo").classList.toggle("settings-show");
}

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
})
///////////////////////////////////////////////////////////////////////
