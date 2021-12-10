import { AmPmRGX, MinsRGX, HoursRGX, DaysRGX } from "./regexes";

/**
 * Converts a time string such as "2hrs 30mins" to MS;
 *
 * @param timeString The string to convert to milliseconds.
 */
export default function parseTimeString (timeString: string) {
  timeString = timeString.trim().replace(/ /g, '');

  if (AmPmRGX.matches(timeString)) {
    return AmPmRGX.convertStringToMilliseconds(timeString);
  }

  return [MinsRGX, HoursRGX, DaysRGX]
    .find(r => r.matches(timeString))?.convertStringToMilliseconds(timeString);
}