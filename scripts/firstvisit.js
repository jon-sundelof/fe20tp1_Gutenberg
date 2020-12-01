const btnFirstTimeVisit = document.querySelector('#first-visit-content > button');

// Checks if user previously viewed the website, and if not it displays flex and adds visited data to local storage
if (! localStorage.noFirstVisit) {
    document.querySelector('#first-visit-container').style.display = 'block';
    
    localStorage.noFirstVisit = "1";
}

// Refresbutton to remove intro field and text
btnFirstTimeVisit.addEventListener("click", () =>{
        window.location.reload();
 });


// Resetar localStorage så användare ses som first time visitors
document.querySelector('.info').onclick = function () {
    localStorage.noFirstVisit = "";
    window.location.reload();
    
};