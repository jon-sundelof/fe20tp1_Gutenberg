const xbtn = document.getElementById("closebtn").addEventListener("click", closeNav);
// const hamLink = document.getElementById("ham-bg-content").addEventListener("click", closeNav);
const hamMenu = document.getElementById("hamicon").addEventListener("click", openNav);
//const addBtn = document.querySelector(".add").addEventListener("click", moveFrame)
const backBtn = document.querySelector(".back").addEventListener("click", toggleMain)
const navStyle = document.querySelector("nav");
const mediaPreDiv = document.querySelector(".preDiv");
// let max600px;



function openNav() {
  /* document.querySelector("nav").style.width = "350px"; */
  document.querySelector("nav").style.width = "100vw";

  document.querySelector("nav").style.right = "0%";
  document.querySelector("nav").style.zIndex = "500";
  document.querySelector("nav").style.display = "flex";
}

function closeNav() {

  document.querySelector("nav").style.width = "0px";
  document.querySelector("nav").style.display = "none";
  document.querySelector("nav").style.right = "0";

  document.querySelector("nav").style.zIndex = "-200";
}


const mediaQuery = window.matchMedia('(min-width: 1001px)')

function handle1000px(e) {
  if (e.matches) {
    document.querySelector("aside").style.cssText = "position: relative; left: 0px; z-index: 10;";
    document.querySelector("main").style.cssText = "position: static; z-index: 10;";
    document.querySelector("nav").style.cssText = "position: relative; left: 0px; z-index: 10; display: flex;";


  } else {
    document.querySelector("nav").style.cssText = "display: none; z-index: 10;";
    closeNav()
  }
}
mediaQuery.addListener(handle1000px);



function toggleMain() {
  document.querySelector("main").classList.toggle('mobile-main')
}

function search(str, func = function (note) { return note.tag.toLowerCase().includes(str.toLowerCase()) }) {
  return savedNotes.filter(func)
}

// const enKnapp = document.querySelectorAll('.tagBtnClass') 

// enKnapp.addEventListener('input', e => {
//   let knappText = e.target


// function searchNotes(str, func = function (note) { return note.title.toLowerCase().includes(str.toLowerCase()) || note.text.toLowerCase().includes(str.toLowerCase()) || note.tag.toLowerCase().includes(str.toLowerCase()) }) {
//   return savedNotes.filter(func)
// }

// const searchInput = document.getElementById('search');

// searchInput.addEventListener('input', e => {

//   let searchedWord = e.target.value;

//   searchedWord = searchedWord.trim();

//   notePreview.innerHTML = "";

//   if (searchedWord.length >= 1) {


//       let foundNotes = searchNotes(searchedWord);


//       const rankedSearch = foundNotes.map(noteObj => {

//           let points = 0;

//           if (noteObj.text.includes(searchedWord)) {
//               points += 50;
//           }
//           else if (noteObj.text.startsWith(searchedWord)) {
//               points += 20;
//           }
//           else if (noteObj.title.includes(searchedWord)) {
//               points += 5;
//           }
//           else if (noteObj.title.startsWith(searchedWord)) {
//               points += 1;
//           }
//           return { ...noteObj, points };
//       }).sort((a, b) => b.points - a.points);


//       //Här är rankedSearch en uppdaterad array med alla önskade note i sig som obj
//       //Här bygger vi upp previewfönstret med de notes som matchat sökningen
//       buildPreviewWind(rankedSearch);
//   } else {
//       // Om sökrutans (searchInput) innehålls length är mindre än 1 så bygger vi upp previewfönstret med alla notes (savedNotes) 
//       buildPreviewWind(savedNotes)
//   }
// });
