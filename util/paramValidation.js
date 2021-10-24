const checkNotUndefined = (a) => a !== undefined;
const checkType = (a, type) => typeof a === type;
const checkInteger = (a) => checkType(a, "number") && a === Math.floor(a);
const checkRange = (a, min, max) =>
  checkType(a, "number") &&
  (min !== undefined ? a >= min : true) &&
  (max !== undefined ? a <= max : true);
const check =
  (func, error) =>
  (...props) => {
    if (!func(...props)) {
      console.log(...props);
      throw new Error(error);
    }
  };

module.exports = {
  checkNotUndefined: (a) =>
    check(checkNotUndefined, "Parameter cannot be undefined.")(a),
  checkType: (a, type) =>
    check(checkType, `Parameter must be of type ${type}.`)(a, type),
  checkInteger: (a) => check(checkInteger, "Parameter must be integer.")(a),
  checkRange: (a, min, max) =>
    check(checkRange, "Parameter must be within range.")(a, min, max),
};
