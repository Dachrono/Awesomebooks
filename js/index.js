import * as act from '../modules/activities.js';
import displaySwitch from '../modules/menuFun.js';

const addButton = document.querySelector('#add-book__form');

displaySwitch(0);
act.updateDate();
setInterval(act.updateDate(), 60000);
act.loader();

addButton.addEventListener('submit', (event) => {
  event.preventDefault();
  act.addBook();
  addButton.reset();
});
