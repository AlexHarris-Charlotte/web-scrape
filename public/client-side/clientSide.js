const addArticleButtons = document.querySelectorAll('.addArticle');

addArticleButtons.forEach((button) => {
    button.addEventListener('click', articleData);
});

function articleData() {
    const link = this.parentElement.parentElement.previousElementSibling.children[0].href;
    const summary = this.parentElement.parentElement.previousElementSibling.previousElementSibling.children[0].textContent;
    const image = this.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[1].attributes.src.textContent;
    const title = this.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0].textContent;

    const data = {
        title,
        summary,
        link,
        image
    };
    addArticle(data);
};


function addArticle(articleData) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'addArticle', true);
    xhr.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            console.log(this.responseText);
        };
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(articleData));
    const msg = "<img src="+articleData.image+">" +
          "<p>"+articleData.title.slice(0,30)+"...</p>" +
          "<p>Was Added to you profile</p>";
    alertify.log(msg);
};





const deleteButtons = document.querySelectorAll('.deleteArticle');
deleteButtons.forEach( button => {
    button.addEventListener('click', notifyDelete);
});


function notifyDelete() {

    deleteHandler = () => {
        const id = this.value;
        console.log(id);
        console.log('removin');
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/deleteArticle', true);
        xhr.onload = function() {
            // if (this.status >= 200 && this.status < 400) {
            //     console.log(this.responseText);
            // };
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({id}));
    };

    
    alertify.confirm("Are you sure you want to delete this Article?", function () {
        alertify.error('Article Deleted');
        setTimeout(() => { 
            deleteHandler();
            location.reload();
        }, 2000);
    }, function() {
        alertify.success('Article Not Deleted');
    });
};




const noteButtons = document.querySelectorAll('.addNote');
const modalSection = document.querySelector('#modal');
const modalCloseButton = document.querySelector('#close');
const noteText = document.querySelector('#noteText');
const submitNote = document.querySelector('#submitNote');
const noteTitle = document.querySelector('#noteTitle');

// This will open the modal when a button is clicked
noteButtons.forEach( button => {
    button.addEventListener('click', openModal);
});

// This closes modal on close click
closeModal = () => {
    modalSection.style.display = 'none';
    noteText.value = '';
    noteTitle.value = '';
};


function openModal() {  
    const articleId = this.value;
    modalSection.style.display = 'block'
    submitNote.addEventListener('click', () => {
        const note = noteText.value;
        const title = noteTitle.value;
        addNote(articleId, note, title);
        closeModal();
    });
};


function addNote(id, note, title) {
    const data = {
        noteTitle: title,
        noteContent: note
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/addNote/${id}`, true);
    xhr.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            console.log(this.responseText);
        };
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    window.setTimeout(() => {
        location.reload();
    }, 1000)
}

const previousNoteModal = document.querySelector('#previousNoteModal');
const previousNotesButtons = document.querySelectorAll('.previousNote');
const previousModalClose = document.querySelector('#previousModalClose');
const previousTitle = document.querySelector('#prevNoteTitle');
const previousContent = document.querySelector('#prevNoteContent');

previousNotesButtons.forEach(button => {
    button.addEventListener('click', previousNotes);
});

previousModalClose.addEventListener('click', () => {
    previousNoteModal.style.display = 'none';
});

function previousNotes() {
    previousNoteModal.style.display = 'block';
    let { noteTitle, noteContent } = JSON.parse(this.attributes[1].nodeValue);
    previousTitle.textContent = noteTitle;
    previousContent.textContent = noteContent;
};

