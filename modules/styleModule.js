// eslint-disable-next-line import/no-cycle
import { removeData } from './activities.js';

export const emptyMessage = () => {
  const textEmpty = document.querySelector('#books-listed__text-empty');
  if (localStorage.Shelf === '[]'
        || localStorage.Shelf === undefined) {
    textEmpty.classList.replace('d-none', 'd-block');
  } else {
    textEmpty.classList.replace('d-block', 'd-none');
  }
};

function removeButton() {
  const removeButtonArr = document.querySelectorAll('.book__remove-button') || [];
  removeButtonArr.forEach((button) => {
    button.addEventListener('click', () => {
      removeData(button.getAttribute('book-id'));
      button.parentElement.parentNode.remove();
      emptyMessage();
    });
  });
}

export const printHTML = (title, author, bookID) => {
  const Shelf = document.querySelector('#books-listed__body');
  Shelf.insertAdjacentHTML(
    'beforeend',
    `
       <tr id="books-listed__book">
         <td id="book__title" style="border-top-left-radius: var(--bs-border-radius-xxl)!important; border-bottom-left-radius: var(--bs-border-radius-xxl)!important;">${title}</td>
         <td id="book__author">by ${author}</td>
         <td id="book__remove-button" class="text-end" style="border-top-right-radius: var(--bs-border-radius-xxl)!important; border-bottom-right-radius: var(--bs-border-radius-xxl)!important;">
           <button type="button" class="book__remove-button btn btn-outline-primary rounded-pill" book-id="${bookID}">
             Remove
           </button>
         </td>
       </tr>
      `,
  );
  removeButton();
  // this.roundCorners();
};