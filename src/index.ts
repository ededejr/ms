import { AmPmRGX, MinsRGX, HoursRGX, DaysRGX, SecsRGX } from "./regexes";

/**
 * Converts a time string such as "2hrs 30mins" to MS;
 *
 * @param timeString The string to convert to milliseconds.
 */
export function ms(timeString: string) {
  timeString = timeString.trim().replace(/ /g, '');

  if (AmPmRGX.matches(timeString)) {
    return AmPmRGX.convertStringToMilliseconds(timeString);
  }

  return [SecsRGX, MinsRGX, HoursRGX, DaysRGX]
    .find(r => r.matches(timeString))?.convertStringToMilliseconds(timeString);
}