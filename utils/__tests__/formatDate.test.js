const { formatDate } = require("../formatDate.js");

describe("formatDate", () => {
    test("Takes UTC string and returns formatted inc DST", () => {
        const input = "2020-01-04T00:24:00.000Z";
        const expected = "Sat Jan 04 2020 00:24:00"
        const actual = formatDate(input);
        expect(actual).toBe(expected);
    });
    test("Takes UTC string and returns formatted inc DST", () => {
        const input = "2020-09-16T17:26:00.000Z";
        const expected = "Wed Sep 16 2020 18:26:00"
        const actual = formatDate(input);
        expect(actual).toBe(expected);
    });
    test("Takes UTC string and returns formatted inc DST", () => {
        const input = "2024-06-18T09:05:44.511Z";
        const expected = "Tue Jun 18 2024 10:05:44"
        const actual = formatDate(input);
        expect(actual).toBe(expected);
    });
    test("Takes UTC string and returns formatted inc DST", () => {
        const input = "2024-06-21T19:06:55.468Z";
        const expected = "Fri Jun 21 2024 20:06:55"
        const actual = formatDate(input);
        expect(actual).toBe(expected);
    });
});
