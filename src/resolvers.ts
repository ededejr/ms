const ONE_SEC = 1000;
const ONE_MIN = 60 * ONE_SEC;
const ONE_HOUR = 60 * ONE_MIN;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_DAY;
const ONE_YEAR = ONE_DAY * 365;

export interface TimeDelineation {
  name: string;
  resolve: (
    value: number,
    valueString?: string,
    groups?: { [key: string]: string }
  ) => number;
}

export default {
  ms: {
    name: "ms",
    resolve: (value) => value,
  },
  secs: {
    name: "secs",
    resolve: (value) => value * ONE_SEC,
  },
  mins: {
    name: "mins",
    resolve: (value) => value * ONE_MIN,
  },
  hrs: {
    name: "hrs",
    resolve: (value) => value * ONE_HOUR,
  },
  days: {
    name: "days",
    resolve: (value) => value * ONE_DAY,
  },
  wks: {
    name: "wks",
    resolve: (value) => value * ONE_WEEK,
  },
  yrs: {
    name: "yrs",
    resolve: (value) => value * ONE_YEAR,
  },
  indicator: {
    name: "indicator",
    resolve: (_, valueString, matchGroups) => {
      if (!valueString || !matchGroups) {
        throw new Error(
          "Cannot resolve indicator value without valueString and match groups"
        );
      }

      let { hrs } = matchGroups;
      const { mins } = matchGroups;

      hrs = /am/i.test(valueString) ? hrs : hrs + 12;

      // The parsed date will be incorrect,
      // We just need the date object to do some
      // maths.
      const parsedHour = +hrs;
      const parsedMinutes = +mins || 0;
      const now = new Date();

      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      function getTimeTillTomorrow() {
        const minsToMidnight = (60 - currentMinute) * ONE_MIN;
        const hoursTillMidnight =
          (24 - (minsToMidnight === 0 ? currentHour : currentHour + 1)) *
          ONE_HOUR;
        const totalTimeToday = hoursTillMidnight + minsToMidnight;

        const hoursTillTomorrow = parsedHour * ONE_HOUR;
        const minutesTillTomorrow = parsedMinutes * ONE_MIN;
        const totalTimeTomorrow = hoursTillTomorrow + minutesTillTomorrow;

        return totalTimeToday + totalTimeTomorrow;
      }

      // If its greater than now calculate time till then
      // otherwise add the remaining hours in today,
      // plus how many hours we need for tomorrow
      // plus the minutes if any
      // If its morning, check if the time is past
      if (currentHour < parsedHour) {
        const hourDiff = (parsedHour - currentHour) * ONE_HOUR;
        return (
          currentHour +
          hourDiff +
          parsedMinutes * ONE_MIN -
          currentMinute * ONE_MIN
        );
      } else if (currentHour === parsedHour) {
        if (parsedMinutes > currentMinute) {
          return (parsedMinutes - currentMinute) * ONE_MIN;
        } else {
          return getTimeTillTomorrow() - currentMinute * ONE_MIN;
        }
      } else {
        return getTimeTillTomorrow();
      }
    },
  },
} as { [key: string]: TimeDelineation };
