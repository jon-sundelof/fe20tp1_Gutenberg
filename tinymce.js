                                   //RIP TINYMCE
    
    
    /*
    //*TinyMCE initar först när vi klickar på ny note knappen, så den skapas när man klickar på knappen
        /* Tiny MCE */
        /*
        tinymce.init({
            selector: '.mytextarea',
            height: 600,
            menubar: true,
            plugins: 'save | insertdatetime | print | emoticons | autosave | wordcount ',
            toolbar: [
                'undo redo | styleselect | bold italic save | insertdatetime | print', 
                'alignleft aligncenter alignright alignjustify | outdent indent | emoticons | restoredraft | wordcount '
            ],
            save_onsavecallback: "onSave",
            insertdatetime_timeformat: '%H:%M:%S',
            autosave_interval: '30s'

        });


        //Här skapas textarean som tiny behöver innan tiny skapas  
        /*
        let html = `
        <div class="prompt">
            <label>Title:</label>
            <input class="title" type="text">

        </div>
        <textarea class="mytextarea"></textarea>
        `;

        /*
        const title = document.querySelector(".title")

        //*Såhär får vi ut text content i enbart text format
        let contentText = tinymce.activeEditor.getContent({format: 'text'});
    
        //*Ifall vi behöver text content i html form så finns det här
        let contentHtml = tinymce.activeEditor.getContent({format: 'raw'});
        console.log("Content: " + contentHtml)
        
    
        console.log("Saved btn clicked")
    
        newNote.title = title.value;
        newNote.text = contentText;  
    
        savedNotes.push(newNote)
    
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes))
        */