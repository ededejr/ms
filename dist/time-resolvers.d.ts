export interface TimeDelineation {
    name: string;
    resolve: (value: number, valueString?: string, groups?: {
        [key: string]: string;
    }) => number;
}
declare const _default: {
    [key: string]: TimeDelineation;
};
export default _default;
//# sourceMappingURL=time-resolvers.d.ts.map