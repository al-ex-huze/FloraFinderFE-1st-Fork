export const formatName = (name) => {
    const splitName = name.split(" ");
    const capitalizedName = []
    splitName.forEach((word) => {
        capitalizedName.push(word.charAt(0).toUpperCase() + word.slice(1));
    })
    return capitalizedName.join(" ");
}