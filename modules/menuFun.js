const listButton = document.querySelector('#menu__list');
const addNewButton = document.querySelector('#menu__add-new');
const contactButton = document.querySelector('#menu__contact');
const buttonArr = [listButton, addNewButton, contactButton];

const listPage = document.querySelector('#books');
const addNewPage = document.querySelector('#add-book');
const contactPage = document.querySelector('#contact');
const pageArr = [listPage, addNewPage, contactPage];

export default function displaySwitch(indexButton) {
  pageArr.forEach((page, indexPage) => {
    if (indexPage === indexButton) {
      page.classList.replace('d-none', 'd-block');
      buttonArr[indexPage].classList.add('active', 'fw-bold');
    } else {
      page.classList.replace('d-block', 'd-none');
      buttonArr[indexPage].classList.remove('active', 'fw-bold');
    }
  });
}

buttonArr.forEach((element, index) => {
  element.addEventListener('click', () => {
    displaySwitch(index);
  });
});