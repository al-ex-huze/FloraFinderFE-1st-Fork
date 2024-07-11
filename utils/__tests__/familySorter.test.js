const { familySorter } = require ("../familySorter")

describe("familySorter", () => {
    test("takes the scientificname and returns common", () => {
        const input = "Liliaceae";
        const expected = "Lily"

        const actual = familySorter(input);
        expect(actual).toBe(expected);
    })
    test("takes the scientificname and returns common ignoring caps", () => {
        const input = "liliaceae";
        const expected = "Lily"
        
        const actual = familySorter(input);
        expect(actual).toBe(expected);
    })
    test("takes the scientificname and returns common ignoring caps", () => {
        const input = "caryophyllaceae";
        const expected = "Pink"
        
        const actual = familySorter(input);
        expect(actual).toBe(expected);
    })
    test("takes the scientificname and returns common ignoring caps", () => {
        const input = "geraniaceae";
        const expected = "Geranium"
        
        const actual = familySorter(input);
        expect(actual).toBe(expected);
    })
    test("input isnt changed", () => {
        const input = "Liliaceae";

        const actual = familySorter(input);
        expect(input).toBe("Liliaceae");
    })
})