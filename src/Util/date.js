const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function epocToDate(epoc) {
  const date = new Date(0);
  date.setUTCSeconds(epoc);
  return (
    date.getFullYear() + ' ' + months[date.getMonth()] + ' ' + date.getDate()
  );
}
