export const parseGeoTagLatitude = (plantArrElement) => {
    const geoTagPair = plantArrElement.geoTag;
    return JSON.parse(geoTagPair).latitude;
}
export const parseGeoTagLongitude = (plantArrElement) => {
    const geoTagPair = plantArrElement.geoTag;
    return JSON.parse(geoTagPair).longitude;
}