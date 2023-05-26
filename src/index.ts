import { AmPmRGX, StandardRGX } from "./regexes";

/**
 * Converts a time descriptor to milliseconds.
 *
 * @param str The string to convert.
 * 
 * @example
 * ms("30") => 30
 * ms("30mins") => 1800000 
 * ms("2hrs 30mins") => 9000000
 * ms("2hrs 30mins 30secs") => 9030000
 * ms("2hrs 30mins 30secs 30ms") => 9030030
 * ms("2y 2w 2d 2h 2m 2s 2ms") => 64461722002
 */
export function ms(str: TemplateStringsArray | string): number | undefined {
  const isTemplateString =
    Array.isArray(str) && str.length === 1 && typeof str[0] === "string";
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

  input = input.trim().replace(/ /g, "");

  if (input.length === 0) {
    throw new Error("Invalid input. Cannot parse an empty string.");
  }

  const isNegative = input.startsWith("-");

  if (isNegative) {
    input = input.slice(1);
  }

  const handleNegative = (value: number) => (isNegative ? -value : value);

  if (AmPmRGX.matches(input)) {
    return handleNegative(AmPmRGX.convertStringToMilliseconds(input));
  }

  if (StandardRGX.matches(input)) {
    return handleNegative(StandardRGX.convertStringToMilliseconds(input));
  }

  try {
    const int = parseInt(input, 10);
    return handleNegative(int);
  } catch (error) {
   // do nothing 
  }

  return undefined;
}
