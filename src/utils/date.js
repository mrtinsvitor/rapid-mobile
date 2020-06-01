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
  return [date.getDate(), ' de ', month].join(' ');
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

export const getLastDayOfWeek = () => {
  const today = new Date; // get current date
  const firstDay = today.getDate() - today.getDay(); // First day is the day of the month - the day of the week
  const lastDay = firstDay + 6; // last day is the first day + 6

  return new Date(today.setDate(lastDay));
}

export const getLastDayOfMonth = () => {
  const today = new Date();

  return new Date(today.getFullYear(), today.getMonth() + 1, 0);
}

export const getLastDayOfSemester = () => {
  const today = new Date();
  const lastSemesterMonth = today.getMonth() + 1 <= 6 ? 6 : 12;

  return new Date(today.getFullYear(), lastSemesterMonth, 0);
}