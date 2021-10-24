const { getNextDayAfter, daysBetween } = require("../util/date");

const getNextAfter = (start, count = 1) => getNextDayAfter(start, count);

const getPreviousInterval = (intervalStart, date) => {
  let pointer = intervalStart;
  while (true) {
    const nextPointer = getNextAfter(pointer);
    if (nextPointer >= date) {
      return pointer;
    }
    pointer = nextPointer;
  }
};

const getNextInterval = (intervalStart, date) => {
  let pointer = intervalStart;
  while (true) {
    const nextPointer = getNextAfter(pointer);
    if (nextPointer >= date) {
      return nextPointer;
    }
    pointer = nextPointer;
  }
};

const getDaysBetweenSurroundingIntervals = (intervalStart, date) =>
  daysBetween(
    getNextInterval(intervalStart, date),
    getPreviousInterval(intervalStart, date)
  );

module.exports = {
  getNextAfter,
  getPreviousInterval,
  getNextInterval,
  getDaysBetweenSurroundingIntervals,
};
