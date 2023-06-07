import { DateTime } from '../node_modules/luxon/src/luxon.js';

export default function updateDate() {
  const headerDate = document.querySelector('#header__date');
  headerDate.textContent = DateTime.now().toFormat('MMMM dd, yyyy HH:mm');
}