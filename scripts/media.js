const xbtn = document.getElementById("closebtn").addEventListener("click", closeNav);
// const hamLink = document.getElementById("ham-bg-content").addEventListener("click", closeNav);
const hamMenu = document.getElementById("hamicon").addEventListener("click", openNav);
//const addBtn = document.querySelector(".add").addEventListener("click", moveFrame)
const backBtn = document.querySelector(".back").addEventListener("click", moveBack)
const navStyle = document.querySelector("nav");
const mediaPreDiv = document.querySelector(".preDiv");
// let max600px;

function openNav() {
  document.querySelector("nav").style.width = "350px";
  document.querySelector("nav").style.right = "0%";
  document.querySelector("nav").style.zIndex = "500";
  document.querySelector("nav").style.display = "flex";
}

function closeNav() {
    
  document.querySelector("nav").style.width = "0px";
  document.querySelector("nav").style.display = "none";
  document.querySelector("nav").style.right = "0";

  document.querySelector("nav").style.zIndex = "-200";

  // document.querySelector("nav").style.cssText = "z-index: -10;";
}


const mediaQuery = window.matchMedia('(min-width: 1001px)')
// const mediaQuery600 = window.matchMedia('(max-width: 600px)')

function handle1000px(e) {
  if (e.matches) {
    document.querySelector("aside").style.cssText = "position: relative; left: 0px; z-index: 10;";
    document.querySelector("main").style.cssText = "position: static; z-index: 10;";
    document.querySelector("nav").style.cssText = "position: static; left: 0px; z-index: 10; display: flex;";

    
  }else{
    document.querySelector("nav").style.cssText = "display: none; z-index: 10;";
    closeNav()
  }
}


// function handle600px(e){
//     if(e.matches){
//         console.log(mediaQuery600)

    
//         }
//         // document.querySelector("nav").style.cssText = "display: none; z-index: 10;";
//         // return max600px;
//     // }
//     // else{

//     // }
// }


//mediaQuery.addListener(handle1000px);
// mediaQuery600.addListener(handle600px);

// let x = window.matchMedia("(min-width: 1001px)")
// restoreNav(x) // Call listener function at run time
// x.addListener(restoreNav) // Attach listener function on state changes


// function moveFrame() {
//     // bodyStyle.style.cssText = "left: -100%;"
//     // document.querySelector("nav").style.zIndex = "500";
//     // document.querySelector("main").style.cssText = "position: absolute; left: 0px; z-index:100 ";

//     document.querySelector("main").style.position = "absolute";
//     document.querySelector("main").style.left = "0";

//     document.querySelector("main").style.zIndex = "100";


// }
// function moveBack() {
//     // bodyStyle.style.cssText = "left: 0;"
// }





// const xbtn = document.getElementById("closebtn").addEventListener("click", closeNav);
// // const hamLink = document.getElementById("ham-bg-content").addEventListener("click", closeNav);
// const hamMenu = document.getElementById("hamicon").addEventListener("click", openNav);
// const addBtn = document.querySelector(".add").addEventListener("click", moveFrame)
// const backBtn = document.querySelector(".back").addEventListener("click", moveBack)
// const preDiv = document.querySelectorAll(".preDiv")

// function preDivToEdit() {
//     preDiv.forEach(el => {
//         el.addEventListener("click", () => {
//             moveFrame();
//         })

//     });
// }

// function openNav() {
//     document.querySelector("nav").style.display = "flex";
//     document.querySelector("nav").style.right = "0vw";
// }

// function closeNav() {
//     // document.querySelector("nav").style.display = "none";
//     // document.querySelector("nav").style.right = "-200px";


//     document.querySelector("nav").style.cssText = "display: none; right: -200vw";


// }

// const mediaQuery = window.matchMedia('(min-width: 1001px)')

// function handleTabletChange(e) {
//   // Check if the media query is true
//   if (e.matches) {
//     // Then log the following message to the console
//     document.querySelector("nav").style.cssText = "display: flex; left: 0px";
//   }else{
//       closeNav()
//   }
// }

// // Register event listener
// mediaQuery.addListener(handleTabletChange);


// function moveFrame() {
//     document.querySelector("main").style.position = "absolute";
//     // document.querySelector("main").style.left = "0";
//     document.querySelector("main").style.zIndex = "50";
// }
function moveBack() {
  document.querySelector("aside").style.position = "absolute";
  document.querySelector("aside").style.left = "0";
  document.querySelector("aside").style.zIndex = "50";
  document.querySelector("main").style.zIndex = "-50";
}
