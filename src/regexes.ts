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
 * Parse and extract years, weeks, days, hours, minutes, seconds,
 * and milliseconds from a time string.
 * 
 * @param time The time string to check. 
 */
export const StandardRGX = new TimeStringRegex(
  /^(?:(?<yrs>\d+)\s*y(?:ears?)?)?\s*(?:(?<wks>\d+)\s*w(?:eeks?|ks)?)?\s*(?:(?<days>\d+)\s*d(?:ays?)?)?\s*(?:(?<hrs>\d+)\s*h(?:(r|our)s?)?)?\s*(?:(?<mins>\d+)\s*m(?:in(?:ute)?s?)?)?\s*(?:(?<secs>\d+)\s*s(?:ec(?:ond)?s?)?)?\s*(?:(?<ms>\d+)(?:\s*(ms|(?:(mill(?:i)?second)s?))))?$/i,
  [
    TimeResolvers.yrs,
    TimeResolvers.wks,
    TimeResolvers.days,
    TimeResolvers.hrs,
    TimeResolvers.mins,
    TimeResolvers.secs,
    TimeResolvers.ms,
  ]
);
