function* datesGenerator(start: Date, end: Date, separator: string) {
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();

    yield `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${
      date < 10 ? `0${date}` : `${date}`
    }`;
  }
}

export default function getDates(start: Date, end: Date, separator: string): Array<string> {
  return [...datesGenerator(start, end, separator)];
}
