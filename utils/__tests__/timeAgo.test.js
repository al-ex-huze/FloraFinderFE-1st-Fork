const { timeAgo } = require("../timeAgo.js");

describe("timeAgo", () => {
    test("Returns relative time, test confirmed", () => {
        const input = "2020-01-04T00:24:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
    test("Returns relative time, test confirmed", () => {
        const input = "2024-01-04T00:24:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
    test("Returns relative time, test confirmed", () => {
        const input = "2024-05-04T00:24:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
    test("Returns relative time, test confirmed", () => {
        const input = "2024-06-04T00:24:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
    test("Returns relative time, test confirmed", () => {
        const input = "2024-06-14T00:24:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
    test("Returns relative time, test confirmed", () => {
        const input = "2024-06-18T00:24:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
    test("Returns relative time, test confirmed", () => {
        const input = "2024-06-21T00:24:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
    test("Returns relative time, test confirmed", () => {
        const input = "2024-06-21T12:24:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
    test("Returns relative time, test confirmed", () => {
        const input = "2024-06-21T18:24:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
    test("Returns relative time, test confirmed", () => {
        const input = "2024-06-21T19:04:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
    test("Returns relative time, test confirmed", () => {
        const input = "2024-06-21T19:07:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
    test("Returns relative time, test confirmed", () => {
        const input = "2024-06-21T19:08:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
    test("Returns relative time, test confirmed", () => {
        const input = "2024-06-21T19:09:00.000Z";
        const actual = timeAgo(input);
        console.log(actual);
    })
})