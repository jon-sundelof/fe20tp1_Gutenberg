const xbtn = document.getElementById("closebtn").addEventListener("click", closeNav);
// const hamLink = document.getElementById("ham-bg-content").addEventListener("click", closeNav);
const hamMenu = document.getElementById("hamicon").addEventListener("click", openNav);
//const addBtn = document.querySelector(".add").addEventListener("click", moveFrame)
const backBtn = document.querySelector(".back").addEventListener("click", toggleMain)
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
