import axios from "axios";
const FormData = require("form-data");

const API_KEY = "2b10QhGgcy4JKjO6xKQHN1O";
const plantNetApi = axios.create({
  baseURL: "https://my-api.plantnet.org",
});

export const postPhotoToPlantNet = (imageUri) => {
  let form = new FormData();
  const imageToAppend = {
    uri: imageUri,
    type: "image/jpeg",
    name: "image.jpg",
  };
  form.append("images", imageToAppend);
  return plantNetApi
    .post(
      `/v2/identify/all?api-key=${API_KEY}&include-related-images=true`,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((response) => {
      return response.data.results[0];
    })
    .catch((error) => {
      console.log(error.response); // this may return a rejected promise if image isnt identified - FOR future debugging alex
    });
};

const floraFinderApi = axios.create({
  baseURL: "http://16.170.228.135:3000/api",
});

export const postNewUser = (newUser) => {
  console.log("postNewUser API");
  return floraFinderApi
    .post(`/users`, newUser)
    .then((response) => {
      return response.data.user;
    })
    .catch((error) => {
      console.log(error, "ERROR in API");
    });
};

export const postNewPlantToCollection = (username, newCollection) => {
  console.log("postNewPlant API");
  return floraFinderApi
    .post(`/users/${username}/collections`, newCollection)
    .then((response) => {
      console.log(response.data.collection, "NEW COLLECTION RETURNED in API");
      return response.data.collection;
    })
    .catch((error) => {
      console.log(error, "ERROR in API");
    });
};

export const getUserByUsername = (username) => {
  console.log("getUser API");
  return floraFinderApi.get(`/users/${username}`).then((response) => {
    return response.data.user;
  });
};

export const getCollectedPlantsList = (username) => {
  console.log("getPlantList API");
  return floraFinderApi
    .get(`/users/${username}/collections`)
    .then((response) => {
      console.log(response.data.collections, "GET Collection in API");
      return response.data.collections;
    });
};

export const getUsers = () => {
  return floraFinderApi
    .get("/users")
    .then((response) => {
      console.log("Fetched Users:", response.data.users);
      return response.data.users;
    })
    .catch((error) => {
      console.log(error, "ERROR fetching users");
    });
};

export const postLogin = (credentials) => {
  console.log("postLogin API");
  return floraFinderApi
    .post(`/users/login`, credentials)
    .then((response) => {
      console.log("Posted User:", response.data.user);
      return response.data.user;
    })
    .catch((error) => {
      console.log(error, "ERROR posting user");
    });
};

export const deleteUser = (username) => {
  return floraFinderApi
    .delete(`/users/${username}`)
    .then((response) => {
      console.log("Deleted User:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error, "ERROR deleting user");
      throw error;
    });
};
