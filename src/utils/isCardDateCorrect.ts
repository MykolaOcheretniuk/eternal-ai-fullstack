export const isDateCorrect = (date: string) => {
  const monthYear = date.split("/");
  if (+monthYear[0] > 12) {
    return false;
  }
  const currentYear = new Date().getFullYear().toString().slice(-2);
  if (+monthYear[1] < +currentYear) {
    return false;
  }
  return true;
};
