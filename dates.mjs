const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const OCCURRENCE_MAP = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  last: -1,
};

export function getDateForDay(dayRule, year) {
  const month = MONTH_NAMES.indexOf(dayRule.monthName);

  const weekday = DAY_NAMES.indexOf(dayRule.dayName);

  const occurrence = OCCURRENCE_MAP[dayRule.occurrence];

  if (occurrence === -1) {
    const lastOfMonth = new Date(Date.UTC(year, month + 1, 0));
    const lastWeekday = lastOfMonth.getUTCDay();

    const daysBack = (lastWeekday - weekday + 7) % 7;

    return new Date(Date.UTC(year, month + 1, 0 - daysBack));
  }

  const firstOfMonth = new Date(Date.UTC(year, month, 1));
  const firstWeekday = firstOfMonth.getUTCDay();

  const daysToFirst = (weekday - firstWeekday + 7) % 7;

  const firstOccurrence = 1 + daysToFirst;

  const date = firstOccurrence + (occurrence - 1) * 7;

  return new Date(Date.UTC(year, month, date));
}
