const monthList = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];
const dias = ["domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

export const formatDateToDayMonth = (str) => {
  str = parseDate(str);
  let parts = str.split('/').map(Number);
  let date = new Date('20' + parts[2], parts[1] - 1, parts[0]);
  let month = monthList[date.getMonth()];
  return [date.getDate(), ' de ',  month].join(' ');
}

export const parseDate = (input) => {
  let datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1], day = datePart[2];

  return day + '/' + month + '/' + year;
}

export const formatTime = (input) => {
  return input.substring(0, input.length - 3);
}