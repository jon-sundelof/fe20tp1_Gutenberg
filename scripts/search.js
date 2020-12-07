// /************************/
// *****Search START *****/
// /************************/

// notes = note-objekt inuti savedNotes
// group = savedNotes filtrerat med users sök-input

// const list = document.getElementById('list');

// function setList(group) {
//     clearList();
//     for (const notes of group) {
//         const item = document.createElement('li');
//         const text = document.createTextNode(notes.title);
//         item.appendChild(text);
//         list.appendChild(item);
//     }
//     if (group.length === 0) {
//         setNoResults();
//     }
// }

// Rensar list-items
// function clearList() {
//     while (list.firstChild) {
//         list.removeChild(list.firstChild);
//     }
// }
// När inga sökresultat hittas
// function setNoResults() {
//     const item = document.createElement('li');
//     const text = document.createTextNode('No results found');
//     item.appendChild(text);
//     list.appendChild(item);
// }
// Sortera sökresultat via relevans. PRIO: 
// *Exakt rätt titel (if)
// *Börjar rätt (else if)
// *Alla andra fall (else if)
// function getRelevancy(value, searchTerm) {
//     if (value === searchTerm) {
//         return 2;
//     } else if (value.startsWith(searchTerm)) {
//         return 1;
//     } else if (value.includes(searchTerm)) {
//         return 0;
//     }
// }

// const searchInput = document.getElementById('search');

// /* ==================== EVENT LISTENER ==================== */
// searchInput.addEventListener('input', (event) => {
//     let value = event.target.value;
//     Kollar om value finns, om längden är längre än 0 + tar bort mellanrum innan och efter users sök
//     if (value && value.trim().length > 0) {
//         value = value.trim();
//         Skapar nytt list-item, filtrerat via sökterm
//         setList(savedNotes.filter(notes => {
//             Om söktermen är någon del av en notes titel returneras den
//             return notes.title.includes(value);
//             Sorterar sökresultat via relevans
//         }).sort((noteA, noteB) => {
//             return getRelevancy(noteB.title, value) - getRelevancy(noteA.title, value);
//         }));
//     } else {
//         clearList();
//     }
// });

// /************************/
// ***** Search END ******/
// /************************/