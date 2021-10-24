const utcDate = (...props) => new Date(Date.UTC(...props));
const daysBetween = (dateA, dateB) => (dateA - dateB) / (1000 * 60 * 60 * 24);
const getNextDayAfter = (start, count) =>
  utcDate(
    start.getUTCFullYear(),
    start.getUTCMonth(),
    start.getUTCDate() + count
  );
const getNextWeekAfter = (start, count) =>
  utcDate(
    start.getUTCFullYear(),
    start.getUTCMonth(),
    start.getUTCDate() + count * 7
  );
const getNextMonthAfter = (start, count) =>
  utcDate(
    start.getUTCFullYear(),
    start.getUTCMonth() + count,
    start.getUTCDate()
  );
const getNextYearAfter = (start, count) =>
  utcDate(
    start.getUTCFullYear() + count,
    start.getUTCMonth(),
    start.getUTCDate()
  );

module.exports = {
  utcDate,
  daysBetween,
  getNextDayAfter,
  getNextWeekAfter,
  getNextMonthAfter,
  getNextYearAfter,
};
