
//Create note object with desired structure
let templatesArr = [{
    ops: [
        { insert: 'Welcome to Knuts birthday party!', attributes: { bold: true, color: '#f96d00', } },
        { insert: '\nKnut is finally turning 8.' },
        { insert: '\nCome as you are but wear a funny hat, as you know Knut can not get enough of those'},
        { insert: '\nBest regards/Knuts father', attributes: { color: 'purple' } }
    ]}, {
    ops: [
        { insert: 'Gutenbergs Template!', attributes: { bold: true, color: '#3333', } },
        { insert: '\nThe road that has been long but fun and full of knowledge.' },
        { insert: '\nOne day a group of five hardworking individuals set out to create the worlds finest note-app of all time! The journey took them far and short, high and low. Nothing of what they encounterd was ever in their wildest imagination.'},
        { insert: '\nRead more in the uppcoming novel, "Gutenberg meets the world of code!"', attributes: { color: '#cccccc' } },
        { insert: ``, attributes: { color: 'black' } },
        { insert: '\nPowered by TinyMCE!', attributes: { color: 'purple' } }
    ]}];




function openTemp() {
    const datum = new Date();
    const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());

    titleInput.value = "New template";
    let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents);
    savedNotes.push(newNote);
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    const preDiv = noteTemplate(newNote);
    notePreview.prepend(preDiv);

    editor.setContents(templatesArr[0]);

    currentNote = newNote;
    currentNoteId = newNote.id;

}
function openTemp2() {
    const datum = new Date();
    const date = datum.getHours() + ":" + ((datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes()) + ' / ' + datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + ((datum.getDate() < 10 ? '0' : '') + datum.getDate());

    titleInput.value = "New template";
    let newNote = new Note(titleInput.value, date, getQuillText, false, getQuillContents);
    savedNotes.push(newNote);
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    const preDiv = noteTemplate(newNote);
    notePreview.prepend(preDiv);

    editor.setContents(templatesArr[1]);

    currentNote = newNote;
    currentNoteId = newNote.id;

}
//Eventlistener for templates click
template1Btn.addEventListener('click', () => {
    openTemp();
});
//Eventlistener for templates click
template2Btn.addEventListener('click', () => {
    openTemp2();
});