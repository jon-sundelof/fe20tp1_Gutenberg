const btnFirstTimeVisit = document.querySelector('#first-visit-content > button');

// Checks if user previously viewed the website, and if not it displays flex and adds visited data to local storage
if (! localStorage.noFirstVisit) {
    console.log('first time');
    document.getElementById('first-visit-container').style.display = 'flex';
    
    localStorage.noFirstVisit = "1";
}

// Refresbutton to remove intro field and text
btnFirstTimeVisit.addEventListener("click", () =>{
        window.location.reload();
 });


// Resetar localStorage så användare ses som first time visitors
document.getElementById('info').onclick = function () {
    localStorage.noFirstVisit = "";
    window.location.reload();
    
};