import { parseTimeString } from '../index';

function createBasicTest(input: string, expected: number | undefined, label?: string) {
  test(label ? `${label}: "${input}"` : `"${input}"`, () => expect(parseTimeString(input)).toBe(expected));
}

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

createBasicTest('2hrs', 7200000);
createBasicTest('2hrs 30mins', 9000000);

createBasicTest('1 day', 86400000);
createBasicTest('1 days', 86400000);
createBasicTest('1day', 86400000);
createBasicTest('1days', 86400000);
createBasicTest('1 day 20hrs 40mins', 160800000);
createBasicTest('1 day 25hrs', 176400000);
createBasicTest('10 day', 864000000);


createBasicTest('', undefined, 'Undefined if empty string');
createBasicTest('2hrs 100 minutes', undefined, 'Undefined if minutes are more than 59');