function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (error) {
    return (
      error instanceof DOMException
      // everything except Firefox
      && (error.code === 22
        // Firefox
        || error.code === 1014
        // test name field too, because code might not be present
        // everything except Firefox
        || error.name === 'QuotaExceededError'
        // Firefox
        || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && storage
      && storage.length !== 0
    );
  }
}

class Bookshelf {
  constructor() {
    this.bookList = JSON.parse(localStorage.getItem('bookShelfData')) || [];
    this.removeButtonArr = document.querySelectorAll('.book__remove-button') || [];
    this.bookShelf = document.querySelector('#books-listed__body');
    this.addButton = document.querySelector('#add-book__form');
    this.titleInp = document.querySelector('#add-book__title');
    this.authorInp = document.querySelector('#add-book__author');
    this.textEmpty = document.querySelector('#books-listed__text-empty');

    this.addButton.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addBook();
      this.addButton.reset();
      this.emptyMessage();
    });
  }
  // message for empty list

  emptyMessage() {
    if (
      localStorage.bookShelfData === '[]'
      || localStorage.bookShelfData === undefined
    ) {
      this.textEmpty.classList.replace('d-none', 'd-block');
    } else {
      this.textEmpty.classList.replace('d-block', 'd-none');
    }
  }
  // html dinamic constructor

  printHTML(title, author, bookID) {
    this.bookShelf.insertAdjacentHTML(
      'beforeend',
      `
       <tr id="books-listed__book">
         <td id="book__title">${title}</td>
         <td id="book__author">by ${author}</td>
         <td id="book__remove-button" class="text-end">
           <button type="button" class="book__remove-button btn btn-outline-primary rounded-pill" book-id="${bookID}">
             Remove
           </button>
         </td>
       </tr>
      `,
    );
    this.removeBook();
    this.roundCorners();
  }
  // desing visual form

  roundCorners() {
    this.titleCellArr = document.querySelectorAll('#book__title') || [];
    this.buttonCellArr = document.querySelectorAll('#book__remove-button') || [];

    [this.topLeft] = this.titleCellArr;
    [this.topRight] = this.buttonCellArr;
    this.bottomLeft = this.titleCellArr[this.titleCellArr.length - 1];
    this.bottomRight = this.buttonCellArr[this.buttonCellArr.length - 1];

    if (this.titleCellArr.length === 1 && this.titleCellArr.length !== 0) {
      this.titleCellArr[0].style = 'border-top-left-radius: var(--bs-border-radius-xxl)!important; border-bottom-left-radius: var(--bs-border-radius-xxl)!important;';
      this.buttonCellArr[0].style = 'border-top-right-radius: var(--bs-border-radius-xxl)!important; border-bottom-right-radius: var(--bs-border-radius-xxl)!important;';
    } else if (this.titleCellArr.length !== 0) {
      this.topLeft.style = 'border-top-left-radius: var(--bs-border-radius-xxl)!important;';
      this.topRight.style = 'border-top-right-radius: var(--bs-border-radius-xxl)!important;';
      this.bottomLeft.style = 'border-bottom-left-radius: var(--bs-border-radius-xxl)!important;';
      this.bottomRight.style = 'border-bottom-right-radius: var(--bs-border-radius-xxl)!important;';

      for (let i = 1; i < this.titleCellArr.length - 1; i += 1) {
        this.titleCellArr[i].style = 'border-radius: 0;';
        this.buttonCellArr[i].style = 'border-radius: 0;';
      }
    }
  }
  // insert data to localstorage

  addData(obj) {
    this.bookList = this.bookList.concat(obj);
    localStorage.setItem('bookShelfData', JSON.stringify(this.bookList));
    this.printHTML(obj.title, obj.author, obj.id);
    this.roundCorners();
  }
  // obtain values of form books

  addBook() {
    if (storageAvailable('localStorage')) {
      const newBook = {
        title: this.titleInp.value,
        author: this.authorInp.value,
        id: `book${this.bookList.length}`,
      };

      this.addData(newBook);
    }
  }
  // remove data from local storage

  removeData(bookID) {
    this.bookList = this.bookList.filter((book) => book.id !== bookID);
    localStorage.setItem('bookShelfData', JSON.stringify(this.bookList));
    this.removeButtonArr = document.querySelectorAll('.book__remove-button');
  }
  // remove html book space

  removeBook() {
    this.removeButtonArr = document.querySelectorAll('.book__remove-button');

    this.removeButtonArr.forEach((button) => {
      button.addEventListener('click', () => {
        this.removeData(button.getAttribute('book-id'));
        button.parentElement.parentNode.remove();
        this.emptyMessage();
        this.roundCorners();
      });
    });
  }
  // reader of local storage book info

  loader() {
    this.emptyMessage();
    for (let i = 0; i < this.bookList.length; i += 1) {
      this.printHTML(this.bookList[i].title, this.bookList[i].author, this.bookList[i].id);
    }
  }
}

const bookshelf = new Bookshelf();
bookshelf.loader();
