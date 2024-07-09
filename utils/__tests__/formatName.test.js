const { formatName } = require("../formatName")

describe("formatName", () => {
    test("Takes a string and returns with each word capitalized", () => {
        const input = "Lemon geranium";

        const expected = "Lemon Geranium"

        const actual = formatName(input);

        expect(actual).toBe(expected)
    })
    test("Takes a string of multiple words and returns with each word capitalized", () => {
        const input = "The great big australian spider eating plant";

        const expected = "The Great Big Australian Spider Eating Plant"

        const actual = formatName(input);

        expect(actual).toBe(expected)
    })
    test("Doesnt change input (string)", () => {
        const input = "Lemon geranium";

        const actual = formatName(input);

        expect(input).toBe("Lemon geranium")
    })
})