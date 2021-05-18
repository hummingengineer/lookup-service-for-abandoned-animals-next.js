export default function convertDateForm(d: Date, separator: string) {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();

  return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${
    date < 10 ? `0${date}` : `${date}`
  }`;
}
