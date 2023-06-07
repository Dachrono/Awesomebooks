import * as act from '../modules/activities.js';
import displaySwitch from '../modules/menuFun.js';
import updateDate from '../modules/obtainDate.js';

const addButton = document.querySelector('#add-book__form');

displaySwitch(0);
updateDate();
act.loader();

addButton.addEventListener('submit', (event) => {
  event.preventDefault();
  act.addBook();
  addButton.reset();
});
