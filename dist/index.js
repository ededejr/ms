"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaysRGX = exports.AmPmRGX = exports.HoursRGX = exports.MinsRGX = void 0;
var time_resolvers_1 = __importDefault(require("./time-resolvers"));
var TimeStringRegex = (function () {
    function TimeStringRegex(rgx, resolvers) {
        this.rgx = rgx;
        this.resolvers = resolvers;
    }
    Object.defineProperty(TimeStringRegex.prototype, "regex", {
        get: function () {
            return this.rgx;
        },
        enumerable: false,
        configurable: true
    });
    TimeStringRegex.prototype.matches = function (time) {
        time = time.trim().replace(/ /g, '');
        return this.rgx.test(time);
    };
    TimeStringRegex.prototype.convertStringToMilliseconds = function (time) {
        if (!this.matches(time)) {
            return;
        }
        var matchResult = time.match(this.rgx);
        var matchGroups = (matchResult || {}).groups;
        if (matchGroups) {
            var totalInMs = 0;
            var _loop_1 = function (groupName) {
                var resolver = this_1.resolvers.find(function (g) { return g.name === groupName; });
                var value = matchGroups[groupName];
                if (value && resolver) {
                    var result = resolver.resolve(+value, value, matchGroups) || 0;
                    if (resolver.name === 'indicator') {
                        return { value: result };
                    }
                    totalInMs += result;
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = Object.keys(matchGroups); _i < _a.length; _i++) {
                var groupName = _a[_i];
                var state_1 = _loop_1(groupName);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return totalInMs;
        }
    };
    return TimeStringRegex;
}());
exports.MinsRGX = new TimeStringRegex(/^(?<mins>\d{1,3})min(?:ute)?s?$/, [
    time_resolvers_1.default.mins
]);
exports.HoursRGX = new TimeStringRegex(/(^(?<hrs>\d{1,2}) ?hrs?) *((?<mins>[0-5]?[0-9]) *min(?:ute)?s?)?$/, [
    time_resolvers_1.default.hrs,
    time_resolvers_1.default.mins,
]);
exports.AmPmRGX = new TimeStringRegex(/^(?<hrs>[0-1]?[0-9])(?:\:(?<mins>[0-5][0-9]))? *(?<indicator>AM|am|PM|pm)$/, [
    time_resolvers_1.default.hrs,
    time_resolvers_1.default.mins,
    time_resolvers_1.default.indicator
]);
exports.DaysRGX = new TimeStringRegex(/^(?<days>\d+) *days(?: *(?:(?<hrs>\d{1,2}) *hrs)? *(?:(?<mins>[0-5]?[0-9]) *min(?:ute)?s?)?)?$/i, [
    time_resolvers_1.default.days,
    time_resolvers_1.default.hrs,
    time_resolvers_1.default.mins
]);
function convertTimeDescriptionToMS(timeString) {
    var _a;
    timeString = timeString.trim().replace(/ /g, '');
    if (exports.AmPmRGX.matches(timeString)) {
        return exports.AmPmRGX.convertStringToMilliseconds(timeString);
    }
    return (_a = [exports.MinsRGX, exports.HoursRGX, exports.DaysRGX]
        .find(function (r) { return r.matches(timeString); })) === null || _a === void 0 ? void 0 : _a.convertStringToMilliseconds(timeString);
}
exports.default = convertTimeDescriptionToMS;
//# sourceMappingURL=index.js.map