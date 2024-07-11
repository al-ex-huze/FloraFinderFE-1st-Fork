const familiesObj = require("./families-data")

export const familySorter = (sciName) => {
    const famRefObj = familiesObj;
    const splitName = sciName.split(" ");
    const capitalizedName = []
    splitName.forEach((word) => {
        capitalizedName.push(word.charAt(0).toUpperCase() + word.slice(1));
    }) 
    const cappedSciName = capitalizedName.join(" ");
    return famRefObj[cappedSciName];
}