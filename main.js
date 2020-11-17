onclick = e => {
    if (e.target.classList.contains("fa-bold")) {
        document.execCommand("bold")
    } else if (e.target.classList.contains("fa-italic")) {
        document.execCommand("italic")
    } else if (e.target.classList.contains("fa-list")) {
        document.execCommand("insertunorderedlist")
    }
}