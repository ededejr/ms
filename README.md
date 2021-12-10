# Parse Time String

A utility for converting time descriptions (i.e "2hrs 30mins") into milliseconds.

## Usage

```ts
import { parseTimeString } from '@ededejr/parse-time-string';

parseTimeString('1 min') // 60000
```

#### What can I parse?

##### Hours and minutes
```ts
parseTimeString('2hrs'); // 7200000
parseTimeString('2hrs 30mins'); // 9000000;
```

#### Days
```ts
parseTimeString('10 days'); // 864000000
parseTimeString('1 day 20hrs 40mins'); // 160800000
```

#### AM/PM Times
```ts
parseTimeString('10AM'); // ms from now till the next time it will be 10AM
parseTimeString('10:30PM'); // ms from now till the next time it will be 10:30PM
```