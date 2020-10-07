"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("@nend/utils/date");
exports.default = {
    mins: {
        name: 'mins',
        resolve: function (value) { return value * date_1.ONE_MIN; }
    },
    hrs: {
        name: 'hrs',
        resolve: function (value) { return value * date_1.ONE_HOUR; }
    },
    days: {
        name: 'days',
        resolve: function (value) { return value * date_1.ONE_DAY; }
    },
    indicator: {
        name: 'indicator',
        resolve: function (_, valueString, matchGroups) {
            if (!valueString || !matchGroups) {
                throw new Error('Cannot resolve indicator value without valueString and match groups');
            }
            var hrs = matchGroups.hrs;
            var mins = matchGroups.mins;
            hrs = /am/i.test(valueString) ? hrs : hrs + 12;
            var parsedHour = +hrs;
            var parsedMinutes = +mins || 0;
            var now = new Date();
            var currentHour = now.getHours();
            var currentMinute = now.getMinutes();
            function getTimeTillTomorrow() {
                var minsToMidnight = (60 - currentMinute) * date_1.ONE_MIN;
                var hoursTillMidnight = (24 - (minsToMidnight === 0 ? currentHour : currentHour + 1)) * date_1.ONE_HOUR;
                var totalTimeToday = hoursTillMidnight + minsToMidnight;
                var hoursTillTomorrow = (parsedHour * date_1.ONE_HOUR);
                var minutesTillTomorrow = (parsedMinutes * date_1.ONE_MIN);
                var totalTimeTomorrow = hoursTillTomorrow + minutesTillTomorrow;
                return totalTimeToday + totalTimeTomorrow;
            }
            if (currentHour < parsedHour) {
                var hourDiff = (parsedHour - currentHour) * date_1.ONE_HOUR;
                return (currentHour + hourDiff + (parsedMinutes * date_1.ONE_MIN)) - (currentMinute * date_1.ONE_MIN);
            }
            else if (currentHour === parsedHour) {
                if (parsedMinutes > currentMinute) {
                    return (parsedMinutes - currentMinute) * date_1.ONE_MIN;
                }
                else {
                    return getTimeTillTomorrow() - (currentMinute * date_1.ONE_MIN);
                }
            }
            else {
                return getTimeTillTomorrow();
            }
        }
    }
};
//# sourceMappingURL=time-resolvers.js.map