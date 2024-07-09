const { parseGeoTagLatitude, parseGeoTagLongitude } = require("../parseGeoTag");

describe("parseGeoTagLatitude", () => {
    test("Takes plantArray element and returns latitude as integer", () => {
        const input = {
            dateCollected: "2024-07-06 10:32:43",
            geoTag: '{"latitude":50.4504434,"longitude":0.194113}',
            image: "https://bs.plantnet.org/image/m/adb376e1a182364eaa45909dfa10c2554322cb9f",
            matchScore: 0.32,
            plantId: 2,
            speciesFamily: "Araceae",
            speciesID: 2869755,
            speciesName: "Peace Lily",
            username: "Ff57",
        };

        const expected = 50.4504434;
        const actual = parseGeoTagLatitude(input);

        expect(actual).toBe(expected);
        expect(typeof actual).toBe("number");
        console.log(actual, "ACTUAL LATITUDE");
    });
    test("doesn't mutate input", () => {
        const input = {
            dateCollected: "2024-07-06 10:32:43",
            geoTag: '{"latitude":50.4504434,"longitude":0.194113}',
            image: "https://bs.plantnet.org/image/m/adb376e1a182364eaa45909dfa10c2554322cb9f",
            matchScore: 0.32,
            plantId: 2,
            speciesFamily: "Araceae",
            speciesID: 2869755,
            speciesName: "Peace Lily",
            username: "Ff57",
        };

        const actual = parseGeoTagLatitude(input);

        expect(input).toEqual({
            dateCollected: "2024-07-06 10:32:43",
            geoTag: '{"latitude":50.4504434,"longitude":0.194113}',
            image: "https://bs.plantnet.org/image/m/adb376e1a182364eaa45909dfa10c2554322cb9f",
            matchScore: 0.32,
            plantId: 2,
            speciesFamily: "Araceae",
            speciesID: 2869755,
            speciesName: "Peace Lily",
            username: "Ff57",
        });
        console.log(actual, "ACTUAL LATITUDE");
    });
});

describe("parseGeoTagLongitude", () => {
    test("Takes plantArray element and returns longitude as integer", () => {
        const input = {
            dateCollected: "2024-07-06 10:32:43",
            geoTag: '{"latitude":50.4504434,"longitude":0.194113}',
            image: "https://bs.plantnet.org/image/m/adb376e1a182364eaa45909dfa10c2554322cb9f",
            matchScore: 0.32,
            plantId: 2,
            speciesFamily: "Araceae",
            speciesID: 2869755,
            speciesName: "Peace Lily",
            username: "Ff57",
        };

        const expected = 0.194113;
        const actual = parseGeoTagLongitude(input);

        expect(actual).toBe(expected);
        expect(typeof actual).toBe("number");
        console.log(actual, "ACTUAL LONGITUDE");
    });
    test("doesn't mutate input", () => {
        const input = {
            dateCollected: "2024-07-06 10:32:43",
            geoTag: '{"latitude":50.4504434,"longitude":0.194113}',
            image: "https://bs.plantnet.org/image/m/adb376e1a182364eaa45909dfa10c2554322cb9f",
            matchScore: 0.32,
            plantId: 2,
            speciesFamily: "Araceae",
            speciesID: 2869755,
            speciesName: "Peace Lily",
            username: "Ff57",
        };

        const actual = parseGeoTagLongitude(input);

        expect(input).toEqual({
            dateCollected: "2024-07-06 10:32:43",
            geoTag: '{"latitude":50.4504434,"longitude":0.194113}',
            image: "https://bs.plantnet.org/image/m/adb376e1a182364eaa45909dfa10c2554322cb9f",
            matchScore: 0.32,
            plantId: 2,
            speciesFamily: "Araceae",
            speciesID: 2869755,
            speciesName: "Peace Lily",
            username: "Ff57",
        });
        console.log(actual, "ACTUAL LONGITUDE");
    });
});
