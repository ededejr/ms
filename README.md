### ms

a utility for converting time descriptions (i.e "2hrs 30mins") into milliseconds.

### Usage

```ts
import { ms } from "@ededejr/ms";

ms("1 min"); // 60000
```

##### What can I parse?

###### Hours and minutes

```ts
ms("2hrs"); // 7200000
ms("2hrs 30mins"); // 9000000;
```

###### Days

```ts
ms("10 days"); // 864000000
ms("1 day 20hrs 40mins"); // 160800000
```

###### AM/PM Times

```ts
ms("10AM"); // ms from now till the next time it will be 10AM
ms("10:30PM"); // ms from now till the next time it will be 10:30PM
```
