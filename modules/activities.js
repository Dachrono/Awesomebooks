import storageAvailable from './storage.js';
// eslint-disable-next-line import/no-cycle
import * as html from './styleModule.js';

let bookList = JSON.parse(localStorage.getItem('Shelf')) || [];

export const loader = () => {
  if (localStorage.Shelf === '[]'
        || localStorage.Shelf === undefined) {
    html.emptyMessage();
  } else {
    html.emptyMessage();
    for (let i = 0; i < bookList.length; i += 1) {
      html.printHTML(bookList[i].title, bookList[i].author, bookList[i].id);
    }
  }
};

function addNewBook(newBook) {
  bookList = bookList.concat(newBook);
  localStorage.setItem('Shelf', JSON.stringify(bookList));
  html.printHTML(newBook.title, newBook.author, newBook.id);
  html.emptyMessage();
}

export const addBook = () => {
  const titleInp = document.querySelector('#add-book__title');
  const authorInp = document.querySelector('#add-book__author');

  if (storageAvailable('localStorage')) {
    const newBook = {
      title: titleInp.value,
      author: authorInp.value,
      id: `book${bookList.length}`,
    };

    addNewBook(newBook);
  }
};

export const removeData = (bookID) => {
  bookList = bookList.filter((book) => book.id !== bookID);
  localStorage.setItem('Shelf', JSON.stringify(bookList));
};