export function outputDate(date) {
  return date.toISOString().slice(0, 10);
}

export function separateString(str) {
  return str.split("(");
}

export function getWeek(d) {
  const target = new Date(d.valueOf());
  const dayNr = (d.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const jan4 = new Date(target.getFullYear(), 0, 4);
  const dayDiff = (target - jan4) / 86400000;
  const weekNr = 1 + Math.ceil(dayDiff / 7);
  return weekNr;
}
