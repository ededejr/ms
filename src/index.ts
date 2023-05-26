import { AmPmRGX, MinsRGX, HoursRGX, DaysRGX, SecsRGX } from "./regexes";

/**
 * Converts a time string such as "2hrs 30mins" to MS;
 *
 * @param timeString The string to convert to milliseconds.
 */
export function ms(str: TemplateStringsArray | string): number | undefined {
  const isTemplateString = Array.isArray(str) && str.length === 1 && typeof str[0] === "string";
  const isString = typeof str === "string";

  if (!(isTemplateString || isString)) {
    throw new Error("Invalid input. Expected a string or template string.");
  }

  let input = "";

  if (isString) {
    input = str;
  } else if (isTemplateString) {
    input = str[0];
  }

  input = input.trim().replace(/ /g, '');

  if (AmPmRGX.matches(input)) {
    return AmPmRGX.convertStringToMilliseconds(input);
  }

  return [SecsRGX, MinsRGX, HoursRGX, DaysRGX]
    .find(r => r.matches(input))?.convertStringToMilliseconds(input);
}