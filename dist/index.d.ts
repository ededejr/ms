import { TimeDelineation } from './time-resolvers';
declare class TimeStringRegex {
    private rgx;
    private resolvers;
    constructor(rgx: RegExp, resolvers: TimeDelineation[]);
    get regex(): RegExp;
    matches(time: string): boolean;
    convertStringToMilliseconds(time: string): number | undefined;
}
export declare const MinsRGX: TimeStringRegex;
export declare const HoursRGX: TimeStringRegex;
export declare const AmPmRGX: TimeStringRegex;
export declare const DaysRGX: TimeStringRegex;
export default function convertTimeDescriptionToMS(timeString: string): number | undefined;
export {};
//# sourceMappingURL=index.d.ts.map