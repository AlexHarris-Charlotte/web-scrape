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
