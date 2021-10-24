const { checkRange } = require("./util/paramValidation");
const dailyFrequency = require("./frequencies/daily");
const weeklyFrequency = require("./frequencies/weekly");
const monthlyFrequency = require("./frequencies/monthly");
const yearlyFrequency = require("./frequencies/yearly");
const { daysBetween } = require("./util/date");
const frequencyHandlers = {
  daily: dailyFrequency,
  weekly: weeklyFrequency,
  monthly: monthlyFrequency,
  yearly: yearlyFrequency,
};
const frequencies = Object.keys(frequencyHandlers)
  .map((k) => ({ [k]: k }))
  .reduce((a, e) => ({ ...a, ...e }), {});

const infiniteCount = -1;
const infiniteResponse = "This does not have an end date.";

/**
 * Provides the logic to break a budget down to its daily build-up. For example, you may have a $70 weekly budget, but that equates down to a $10 daily budget.
 *
 * @param {Date} start The date this was first started. Distinct from firstPayment. Say you have a $70 weekly budget due in 2 days, that's $35 a day for the first budget.
 * @param {Date} firstPayment The date this was first paid.
 * @param {string} frequency One of {@link frequencies}
 * @param {number} count The number of times this budget will occur. {@link infiniteCount} can be used to indicate there is no expected end.
 * @param {number} amount The amount paid at each interval.
 */
function budget(start, firstPayment, frequency, count, amount) {
  if (count !== infiniteCount) {
    checkRange(count, 1);
  }
  return {
    start,
    firstPayment,
    frequency,
    count,
    amount,
    getDayAmount: function (day) {
      return getDayAmount(this, day);
    },
  };
}

function getDayAmount({ start, firstPayment, frequency, count, amount }, day) {
  if (day < start) {
    return 0;
  }
  if (day >= start && day <= firstPayment) {
    return amount / (daysBetween(firstPayment, start) + 1);
  }
  const finalPayment = getFinalPayment({ firstPayment, frequency, count });
  if (
    day > firstPayment &&
    (finalPayment === infiniteResponse || day <= finalPayment)
  ) {
    return (
      amount /
      frequencyHandlers[frequency].getDaysBetweenSurroundingIntervals(
        firstPayment,
        day
      )
    );
  }
  if (day > finalPayment) {
    return 0;
  }
}

function getFinalPayment({ firstPayment, frequency, count }) {
  if (count === infiniteCount) {
    return infiniteResponse;
  }
  return frequencyHandlers[frequency].getNextAfter(firstPayment, count);
}

module.exports = {
  budget,
  frequencies,
  infiniteCount,
};
