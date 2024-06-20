const bookShelf = document.querySelector('#book-container'); 
const myLibrary = []; 

function Book(title, author, pages) {
    this.title = title; 
    this.author = author; 
    this.pages = pages; 
    this.info = function() {
        return [`${this.author}`, `${this.pages} pages`]; 
    }
}

function addToLibrary(book) {
    const bookIndex = myLibrary.push(book) -1;  
    const bookArticle = document.createElement('article'); 
    bookArticle.setAttribute('data-index',`${bookIndex}`); 
    const bookTitle = document.createElement('h4');
    bookTitle.textContent = book.title; 
    bookArticle.append(bookTitle); 
    const infoContainer = document.createElement('div'); 
    infoContainer.classList.toggle('info-container'); 
    const bookInfo = book.info(); 
    for (const info of bookInfo) {
        let sectionInfo = document.createElement('p'); 
        sectionInfo.textContent = info; 
        infoContainer.append(sectionInfo);  
    }
    bookArticle.append(infoContainer); 
    const readBtn = document.createElement('button'); 
    readBtn.addEventListener('click', () => markRead(book,readBtn)); 
    readBtn.textContent = 'Not Read'; 
    bookArticle.append(readBtn); 
    rmBookBtn = document.createElement('button'); 
    rmBookBtn.classList.toggle('rm-btn', 'btn'); 
    rmBookBtn.textContent = 'Remove Book'; 
    rmBookBtn.addEventListener('click', () => removeBook(bookIndex)); 
    bookArticle.append(rmBookBtn); 
    bookShelf.append(bookArticle); 
}

function markRead(book, readButton) {
    if (book.read === undefined || book.read === false) {
        if (book.read === undefined) {
            Book.prototype.isRead = function() {
                this.read; 
            }
        }
        book.read = true; 
        readButton.textContent = 'Read';
        readButton.setAttribute('style','background-color: darkgrey; color: white;'); 
    } else {
        book.read = false; 
        readButton.textContent = 'Not Read' ;
        readButton.setAttribute('style','background-color: lightgrey; color: black;'); 
    }
}

function displayForm() {
    const modalBox = document.querySelector('#add-book'); 
    modalBox.showModal(); 
}

function removeBook(bookIndex) {
    myLibrary.splice(bookIndex, 1); 
    const articles = document.querySelectorAll('article'); 
    articles.forEach((article) => {
        if (article.getAttribute('data-index') === String(bookIndex)) {
            article.remove(); 
        }
    })
}

/* create buttons to remove or add a book */  
btnsContainer = document.querySelector('#btns-container'); 
addBookBtn = document.createElement('button'); 
addBookBtn.classList.toggle('add-btn', 'btn'); 
addBookBtn.textContent = 'Add Book'; 
addBookBtn.addEventListener('click', displayForm); 
btnsContainer.append(addBookBtn); 

/* adding some books */ 
const theHobbit = new Book('The Hobbit','J.R.R Tolkien',296);
const funnyStories = new Book('Funny Stories','Max Kellerman',202);
const diaryWimpy = new Book('Diary of a Wimpy Kid','Jeff Kinney',389); 
const percyJ = new Book('Percy Jackson','Rick Riordan',453);
addToLibrary(theHobbit); 
addToLibrary(funnyStories); 
addToLibrary(diaryWimpy); 
addToLibrary(percyJ); 

/* add book function */ 
document.querySelector('#form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const title = document.querySelector('#title-input');
    const author = document.querySelector('#author-input');
    const pages = document.querySelector('#pages-input'); 
    const newBook = new Book(title.value, author.value, pages.value); 
    addToLibrary(newBook); 
    document.querySelector('#add-book').close(); 
    document.querySelector('#form').reset(); 
})
