export function outputDate(date) {
  return date.toISOString().slice(0, 10);
}

export function separateString(str) {
  return str.split("(");
}
