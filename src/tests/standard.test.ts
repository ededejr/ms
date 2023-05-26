import { StandardRGX } from "../regexes"

function makeTest(input: string, expected: boolean) {
  test(`should ${!expected ? "not " : ''}match "${input}"`, () => {
    expect(StandardRGX.matches(input)).toBe(expected);
  });
}

describe('StandardRGX', () => {
  describe('Valid time expressions', () => {
    makeTest("2 years 3 weeks 4 days 5 hours 6 minutes 7 seconds 8 milliseconds", true)
    makeTest("1 year 2 weeks 3 days", true)
    makeTest("6 hours 30 minutes", true)
    makeTest("15 seconds", true)
    makeTest("500 milliseconds", true)
  });

  describe('Valid time expressions with optional components omitted', () => {
    makeTest("1 year 6 minutes", true)
    makeTest("2 days 10 hours", true)
    makeTest("20 minutes 300 milliseconds", true)
  });

  describe('Individual components', () => {
    makeTest("2 hours", true)
    makeTest("3 weeks", true)
  });

  describe('Individual components with plural and singular units', () => {
    makeTest("1 year", true)
    makeTest("2 minutes", true)
    makeTest("3 seconds", true)
    makeTest("1 day", true)
  });

  describe('Invalid input', () => {
    makeTest("1", false);
    makeTest("1 year 2 weeks 3 hours 4 invalidunit", false)
    makeTest("1 hour 2 invalidunits", false)
    makeTest("random string", false)
  });

  describe('Time expressions with spaces', () => {
    makeTest("2years 3weeks 4days 5hours 6minutes 7seconds 8milliseconds", true)
    makeTest("1year 2weeks 3days", true)
  });

  describe('Time expressions with mixed case', () => {
    makeTest("1 Year 2 wEeKs 3 dAYS 4 hOUrS 5 mINutEs 6 SECondS 7 MiLliSecoNds", true)
  });

  describe('Time expressions with leading/trailing spaces', () => {
    makeTest(" 5 hours 10 minutes ", true)
    makeTest(" 1 year ", true)
  })

  describe('Time expressions with zero values', () => {
    makeTest("0 years 0 weeks 0 days 0 hours 0 minutes 0 seconds 0 milliseconds", true)
  })
})
