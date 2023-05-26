import TimeResolvers, { TimeDelineation } from "./resolvers";

class TimeStringRegex {
  private rgx: RegExp;
  private resolvers: TimeDelineation[];

  constructor(rgx: RegExp, resolvers: TimeDelineation[]) {
    this.rgx = rgx;
    this.resolvers = resolvers;
  }

  /**
   * Get the Javascript `RegexExp` this wraps.
   */
  get regex() {
    return this.rgx;
  }

  /**
   * Check if a time string passes regex.test.
   *
   * @param time The time string to test.
   */
  matches(time: string) {
    time = time.trim().replace(/ /g, "");
    return this.rgx.test(time);
  }

  /**
   * Convert a time string to milliseconds.
   *
   * @param time The time string to convert.
   *
   * @example
   * // this.rgx = /^(?<mins>\d{1,3})min(?:ute)?s?$/;
   *
   * this.convertStringToMilliseconds('30mins') => 1800000
   */
  convertStringToMilliseconds(time: string) {
    if (!this.matches(time)) {
      return;
    }

    const matchResult = time.match(this.rgx);
    const { groups: matchGroups } = matchResult || {};

    if (matchGroups) {
      let totalInMs = 0;

      for (const groupName of Object.keys(matchGroups)) {
        const resolver = this.resolvers.find((g) => g.name === groupName);
        const value = matchGroups[groupName];

        if (value && resolver) {
          const result = resolver.resolve(+value, value, matchGroups) || 0;

          if (resolver.name === "indicator") {
            return result;
          }

          totalInMs += result;
        }
      }

      return totalInMs;
    }
  }
}

/**
 * Determine if a string matches the format seconds format.
 *
 * @example
 * SecsRGX('20s') => true
 * SecsRGX('300seconds`) => true
 * SecsRGX('3000secs') => true
 * SecsRGX('1second') => true
 * SecsRGX('1sec') => true
 *
 * @param time The time string to check.
 */
export const SecsRGX = new TimeStringRegex(/^(?<secs>\d+)s(?:(ec|econd))?s?$/, [
  TimeResolvers.secs,
]);

/**
 * Determine if a string matches the format minutes format.
 *
 * @example
 * MinsRGX('20mins') => true
 * MinsRGX('300mins`) => true
 * MinsRGX('3000mins') => false
 * MinsRGX('3min') => true
 * MinsRGX('3 mins') => true
 *
 * @param time The time string to check.
 */
export const MinsRGX = new TimeStringRegex(/^(?<mins>\d{1,3})min(?:ute)?s?$/, [
  TimeResolvers.mins,
]);

/**
 * Determine if a string matches the format an hour-minute format.
 *
 * Hours cannot be more than 99hrs, and minutes cannot be more than 59.
 *
 * @example
 * HoursRGX.matches('20mins') => false
 * HoursRGX.matches('2hrs 300mins`) => false
 * HoursRGX.matches('3000mins') => false
 * HoursRGX.matches('3hr') => true
 * HoursRGX.matches('3hrs 58mins') => true
 *
 * @param time The time string to check.
 */
export const HoursRGX = new TimeStringRegex(
  /(^(?<hrs>\d{1,2}) ?hrs?) *((?<mins>[0-5]?[0-9]) *min(?:ute)?s?)?$/,
  [TimeResolvers.hrs, TimeResolvers.mins]
);

/**
 * Checks if a time string is in the format 10AM/10:30AM or 10PM/10:30PM.
 * Lowercase is okay for the AM/PM.
 *
 * @param time The time string to check.
 */
export const AmPmRGX = new TimeStringRegex(
  /^(?<hrs>[0-1]?[0-9])(?:\:(?<mins>[0-5][0-9]))? *(?<indicator>AM|am|PM|pm)$/,
  [TimeResolvers.hrs, TimeResolvers.mins, TimeResolvers.indicator]
);

/**
 * Check if a time string matches a days timer format.
 *
 * @param time The time string to check.
 *
 * @example
 * DaysRGX.matches('2days') => true
 * DaysRGX.matches('2days 4hrs') => true
 * DaysRGX.matches('2days 4hrs 30mins') => true
 * DaysRGX.matches('2days 30mins') => true
 */
export const DaysRGX = new TimeStringRegex(
  /^(?<days>\d+) *days?(?: *(?:(?<hrs>\d{1,2}) *hrs)? *(?:(?<mins>[0-5]?[0-9]) *min(?:ute)?s?)?)?$/i,
  [TimeResolvers.days, TimeResolvers.hrs, TimeResolvers.mins]
);
