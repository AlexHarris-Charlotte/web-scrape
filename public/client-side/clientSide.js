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
};





const deleteButtons = document.querySelectorAll('.deleteArticle');
deleteButtons.forEach( button => {
    button.addEventListener('click', notifyDelete);
});


// in the deleteHandler func. need to pass an id of the button
// so that we know what id we want to delete from our database!!


function notifyDelete() {

    deleteHandler = () => {
        const id = this.value;
        console.log(id);
        console.log('removin');
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/deleteArticle', true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                console.log(this.responseText);
            };
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({id}));
    };

    let userResponse = confirm('Are you sure that you want to delete this article?');
    if (userResponse) {
        deleteHandler();
        location.reload();
    } else {
        alert('not deleted');
    };
};




const noteButtons = document.querySelectorAll('.addNote');
const modalSection = document.querySelector('#modal');
const modalCloseButton = document.querySelector('#close');
const noteText = document.querySelector('#noteText');
const submitNote = document.querySelector('#submitNote');

// This will open the modal when a button is clicked
noteButtons.forEach( button => {
    button.addEventListener('click', openModal);
});

// This closes modal on close click
closeModal = () => {
    modalSection.style.display = 'none';
    noteText.value = '';
};

// This closes modal on close click
modalCloseButton.addEventListener('click', closeModal);




function openModal() {  
    const articleId = this.value;
    modalSection.style.display = 'block'
    submitNote.addEventListener('click', () => {
        const note = noteText.value;
        addNote(articleId, note);
        closeModal();
    });
    
    // I get the database ID and the  text from the modal 
        // submit and send it to my backend route to update that document
};


function addNote(id, note) {
    const data = {
        id,
        note
    }
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", '/addNote', true);
    xhr.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            console.log(this.responseText);
        };
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}