const headerDate = document.querySelector('#header__date');

// Function to get the suffix for the day
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
// Obtain and format date and time
function updateDate() {
  const currentDate = new Date();

  // Format the month
  const month = currentDate.toLocaleString('en-US', { month: 'long' });

  // Format the day
  const day = currentDate.getDate();
  const daySuffix = getDaySuffix(day);
  const formattedDay = day + daySuffix;

  // Format the time
  const time = currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  // letruct the final date string
  const formattedDate = `${month} ${formattedDay} ${currentDate.getFullYear()}, ${time}`;

  headerDate.textContent = formattedDate;
}

// Update the date immediately
updateDate();

// Update the date every minute
setInterval(updateDate, 60000);
