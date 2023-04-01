function formatDate(date) {
  const dateParts = date.split("-");
  const day = dateParts[2];
  const month = dateParts[1];
  const formattedDate = `${day}/${month}`;
  return formattedDate;
}

export default formatDate;
