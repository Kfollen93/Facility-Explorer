const currentDate = new Date();
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
export const getCurrentDateMonthDayYear = new Intl.DateTimeFormat(
  "en-US",
  options
).format(currentDate);
