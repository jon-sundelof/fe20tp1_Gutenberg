const xbtn = document.getElementById("closebtn").addEventListener("click", closeNav);
const hamLink = document.getElementById("ham-bg-content").addEventListener("click", closeNav);
const hamMenu = document.getElementById("hamicon").addEventListener("click", openNav);

function openNav() {
    document.getElementById("ham-nav").style.width = "100%";
}

function closeNav() {
    document.getElementById("ham-nav").style.width = "0%";
}



// <!-- Hammeny START -->
// <!-- Ej synlig under 1200px-->
// <!-- <div class="hamcontainer">
//     <!-- ham-meny background -->
//     <div id="ham-nav" class="ham-bg">

//         <!-- Stäng ham-meny -->
//         <a href="javascript:void(0)" id="closebtn" class="closebtn">&times;</a>

//         <!-- Öppen ham-meny -->
//         <div class="ham-bg-content" id="ham-bg-content">
//             <nav>

//                 <!-- <img class="logo" src="pictures/q-letter-single-brand-social-media_icon-icons.com_59312.png" alt=""> -->
//                 <div class="dropdown">
//                     <button class="templates"><i class="far fa-file-alt"></i>Templates</button>
//                     <div id="myDropdown" class="dropdown-content">
//                         <button class="templates">Template 1</button>
//                         <button class="templates">Template 2</button>
//                         <button class="templates">Template 3</button>
//                     </div>
//                 </div>



//                     <!-- <img class="templates" src="pictures/searchmagnifierinterfacesymbol1_79893.png" alt="mall"> -->

//                 <button class="print"><i class="fas fa-print"></i>Print
//                     <!-- <img
//                         src="pictures/print-printer-tool-with-printed-paper-outlined-symbol_icon-icons.com_57772.png"
//                         alt="save"> --></button>
//                 <button class="info"><i class="fas fa-info"></i>Information
//                     <!-- <i class="fas fa-info"></i> --></button>
//                 </nav>

//         </div>

//     </div>

//     <div class="logga-ham">
//         <h1>QUIRE.</h1>
//     </div>
//         <div class="hamicon" id="hamicon">
//             <span class="hamline-one"></span>
//             <span class="hamline-two"></span>
//             <span class="hamline-three"></span>
//         </div>

// </div> -->
// <!-- Hammeny-SLUT -->