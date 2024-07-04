import axios from "axios";
const FormData = require("form-data"); // this request required the body be sent as a form alex
const API_KEY = "2b10QhGgcy4JKjO6xKQHN1O";
const plantNetApi = axios.create({
    baseURL: "https://my-api.plantnet.org",
});
export const postPhotoToPlantNet = (imageUri) => {
    let form = new FormData(); // i don't really understand formdata but think it may be array related and you append to it ??  alex
    const imageToAppend = {
        uri: imageUri,
        type: "image/jpeg",
        name: "image.jpg",
    };
    form.append("images", imageToAppend);
    return plantNetApi
        .post(`/v2/identify/all?api-key=${API_KEY}&include-related-images=true`, form, {
            headers: { "Content-Type": "multipart/form-data" }, // also don't know why headers had to be declared like this but seems generic alex
        })
        .then((response) => {
    
            return response.data.results[0];
             // only return the first ie best result out of several possibilities returned so the game will feel snappy alex
        })
        .catch((error) => {
            console.log(error.response); // this may return a rejected promise if image isnt identified - not for future debugging alex
        });
};

const floraFinderApi = axios.create({
    baseURL: "http://16.170.228.135:3000/api",
})

export const postNewUser = (newUser) => {

    return floraFinderApi
    .post(`/users`, newUser)
    .then((response) => {
        return response.data.user;
    })
    .catch((error) => {
        console.log(error, "ERROR in API")
    })
}

export const postNewPlantToCollection = (username, newCollection) => {
    console.log(username, "USERNAME in API")
    console.log(newCollection, "NEWCOLLECTION in API")

    return floraFinderApi
    .post(`/users/${username}/collections`, newCollection)
    .then((response) => {
        console.log(response.data.collection, "NEW COLLECTION in API");
    })
    .catch((error) => {
        console.log(error, "ERROR in API")
    })
}

// {"dateCollected": "1720105173123", "geoTag": "{\"latitude\":51.4504627,\"longitude\":0.1840617}", "image": "https://bs.plantnet.org/image/m/8efd9553559d0d2739623bc2b55d5f5cbc3695f6", "matchScore": 0.73118, "speciesFamily": "Cactaceae", "speciesID": "5383983", "speciesName": "Christmas cactus", "uniqueSerialID": "Schlumbergera truncata"} 