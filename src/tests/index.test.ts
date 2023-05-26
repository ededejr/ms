import { ms } from '../index';

function createBasicTest(input: string, expected: number | undefined, label?: string) {
  test(label ? `${label}: "${input}"` : `"${input}"`, () => expect(ms(input)).toBe(expected));
}

describe("seconds", () => {
  createBasicTest('1 sec', 1000);
  createBasicTest('1sec', 1000);
  createBasicTest('1 secs', 1000);
  createBasicTest('1secs', 1000);
  createBasicTest('1 second', 1000);
  createBasicTest('1second', 1000);
  createBasicTest('1 seconds', 1000);
  createBasicTest('1seconds', 1000);
  createBasicTest('20sec', 20000);
  createBasicTest('20 secs', 20000);
  createBasicTest('20 second', 20000);
  createBasicTest('20 seconds', 20000);
  createBasicTest('100 seconds', 100000);
  createBasicTest('300 seconds', 300000);
  createBasicTest('300s', 300000);
  createBasicTest('1s', 1000);
  createBasicTest('1 s', 1000);
  createBasicTest('1000s', 1000000);
});

describe("minutes", () => {
  createBasicTest('1 min', 60000);
  createBasicTest('1min', 60000);
  createBasicTest('1 mins', 60000);
  createBasicTest('1mins', 60000);
  createBasicTest('1 minute', 60000);
  createBasicTest('1minute', 60000);
  createBasicTest('1 minutes', 60000);
  createBasicTest('1minutes', 60000);
  createBasicTest('20min', 1200000);
  createBasicTest('20 mins', 1200000);
  createBasicTest('20 minute', 1200000);
  createBasicTest('20 minutes', 1200000);
  createBasicTest('100 minutes', 6000000);
  createBasicTest('300 minutes', 18000000);
});

describe("hours and minutes", () => {
  createBasicTest('2hrs', 7200000);
  createBasicTest('2hrs 30mins', 9000000);
});

describe("days", () => {
  createBasicTest('1 day', 86400000);
  createBasicTest('1 days', 86400000);
  createBasicTest('1day', 86400000);
  createBasicTest('1days', 86400000);
  createBasicTest('1 day 20hrs 40mins', 160800000);
  createBasicTest('1 day 25hrs', 176400000);
  createBasicTest('10 day', 864000000);
})

describe("validity", () => {
  test('should throw an error, when ms(undefined)', () => {
    expect(() => ms(undefined)).toThrowError();
  });

  test('should return NaN when ms("☃")', () => {
    expect(ms('☃')).toBeNaN();
  });

  test('should return NaN with decimals', () => {
    expect(ms('1.5')).toBeNaN();
  });

  test('should return NaN with decimals and units', () => {
    expect(ms('1.5s')).toBeNaN();
  });
})
