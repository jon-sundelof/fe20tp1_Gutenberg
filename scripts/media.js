const xbtn = document.getElementById("closebtn").addEventListener("click", closeNav);
// const hamLink = document.getElementById("ham-bg-content").addEventListener("click", closeNav);
const hamMenu = document.getElementById("hamicon").addEventListener("click", openNav);
const addBtn = document.querySelector(".add").addEventListener("click", moveFrame)
const backBtn = document.querySelector(".back").addEventListener("click", moveBack)
const preDiv = document.querySelectorAll(".preDiv")

function preDivToEdit() {
    preDiv.forEach(el => {
        el.addEventListener("click", () => {
            moveFrame();
        })

    });
}

function openNav() {
    document.querySelector("nav").style.width = "350px";
    document.querySelector("nav").style.left = "0px";
}

function closeNav() {
    document.querySelector("nav").style.width = "0px";
    document.querySelector("nav").style.left = "-50px";

}

function restoreNav(x) {
    if (x.matches) { // If media query matches
        document.querySelector("nav").style.cssText = "display: flex; left;0"
        // document.querySelector(".hamicon").style.cssText = "display: none;"

    } else {
        document.querySelector("nav").style.cssText = "left: -50px;"

    }
}

var x = window.matchMedia("(min-width: 1001px)")
restoreNav(x) // Call listener function at run time
x.addListener(restoreNav) // Attach listener function on state changes


function moveFrame() {
    document.querySelector("body").style.cssText = "left: -100%;"
}
function moveBack() {
    document.querySelector("body").style.cssText = "left: 0;"
}