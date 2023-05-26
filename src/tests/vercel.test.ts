/**
 * Taken and adapted from @vercel/ms
 * @see https://github.com/vercel/ms/blob/master/src/index.test.ts
 */

import { ms } from '../';

describe('ms(string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      ms('1m');
    }).not.toThrowError();
  });

  it('should preserve ms', () => {
    expect(ms('100')).toBe(100);
  });

  it('should convert from m to ms', () => {
    expect(ms('1m')).toBe(60000);
  });

  it('should convert from h to ms', () => {
    expect(ms('1h')).toBe(3600000);
  });

  it('should convert d to ms', () => {
    expect(ms('2d')).toBe(172800000);
  });

  it('should convert w to ms', () => {
    expect(ms('3w')).toBe(1814400000);
  });

  it('should convert s to ms', () => {
    expect(ms('1s')).toBe(1000);
  });

  it('should convert ms to ms', () => {
    expect(ms('100ms')).toBe(100);
  });

  it('should convert y to ms', () => {
    expect(ms('1y')).toBe(31536000000);
  });

  it('should work with multiple spaces', () => {
    expect(ms('1   s')).toBe(1000);
  });

  it('should work with negative integers', () => {
    expect(ms('-100ms')).toBe(-100);
  });
});

// long strings

describe('ms(long string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      ms('53 milliseconds');
    }).not.toThrowError();
  });

  it('should convert milliseconds to ms', () => {
    expect(ms('53 milliseconds')).toBe(53);
  });

  it('should convert sec to ms', () => {
    expect(ms('1 sec')).toBe(1000);
  });

  it('should convert from min to ms', () => {
    expect(ms('1 min')).toBe(60000);
  });

  it('should convert from hr to ms', () => {
    expect(ms('1 hr')).toBe(3600000);
  });

  it('should convert days to ms', () => {
    expect(ms('2 days')).toBe(172800000);
  });

  it('should convert weeks to ms', () => {
    expect(ms('1 week')).toBe(604800000);
  });

  it('should convert years to ms', () => {
    expect(ms('1 year')).toBe(31536000000);
  });

  it('should work with negative integers', () => {
    expect(ms('-100 milliseconds')).toBe(-100);
  });
});

// invalid inputs

describe('ms(invalid inputs)', () => {
  it('should throw an error, when ms("")', () => {
    expect(() => {
      ms('');
    }).toThrowError();
  });

  it('should return NaN, when ms("☃")', () => {
    expect(ms('☃')).toBeNaN();
  });

  it('should throw an error, when ms(undefined)', () => {
    expect(() => {
      ms(undefined);
    }).toThrowError();
  });

  it('should throw an error, when ms(null)', () => {
    expect(() => {
      ms(null);
    }).toThrowError();
  });

  it('should throw an error, when ms([])', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      ms([]);
    }).toThrowError();
  });

  it('should throw an error, when ms({})', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      ms({});
    }).toThrowError();
  });

  it('should throw an error, when ms(NaN)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      ms(NaN);
    }).toThrowError();
  });

  it('should throw an error, when ms(Infinity)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      ms(Infinity);
    }).toThrowError();
  });

  it('should throw an error, when ms(-Infinity)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      ms(-Infinity);
    }).toThrowError();
  });
});