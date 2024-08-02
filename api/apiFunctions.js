import axios from "axios";
const FormData = require("form-data");

const plantNetApi = axios.create({
  baseURL: "https://my-api.plantnet.org",
});
const API_KEY = "2b10TmBct7Bagi6rhgRXCuwX";

const floraFinderApi = axios.create({
  baseURL: "http://16.170.228.135:3000/api",
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
      handleApiError(error, "postPhotoToPlantNet");
    });
};

export const postNewUser = (newUser) => {
  console.log("postNewUser API");
  return floraFinderApi
    .post(`/users`, newUser)
    .then((response) => {
      return response.data.user;
    })
    .catch((error) => {
      handleApiError(error, "postNewUser");
    });
};

export const postNewPlantToCollection = (username, newCollection) => {
  console.log("postNewPlant API");
  return floraFinderApi
    .post(`/users/${username}/collections`, newCollection)
    .then((response) => {
      return response.data.collection;
    })
    .catch((error) => {
      handleApiError(error, "postNewPlantToCollection");
    });
};

export const getUserByUsername = (username) => {
  console.log("getUser API");
  return floraFinderApi
    .get(`/users/${username}`)
    .then((response) => {
      return response.data.user;
    })
    .catch((error) => {
      handleApiError(error, "getUserByUsername");
    });
};

export const getCollectedPlantsList = (username, options) => {
  console.log("getPlantList API");
  const { speciesFamily, sortBy, orderBy } = options;

  let url = `/users/${username}/collections`;

  const queryParams = [];
  if (speciesFamily) queryParams.push(`speciesFamily=${speciesFamily}`);
  if (sortBy) queryParams.push(`sortBy=${sortBy}`);
  if (orderBy) queryParams.push(`orderBy=${orderBy}`);

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }
  console.log(url);
  return floraFinderApi
    .get(url)
    .then((response) => response.data.collections)
    .catch((error) => {
      handleApiError(error, "getCollectedPlantsList");
    });
};

export const getUsers = () => {
  console.log("getUsers API");
  return floraFinderApi
    .get("/users")
    .then((response) => {
      return response.data.users;
    })
    .catch((error) => {
      handleApiError(error, "getUsers");
    });
};

export const postLogin = (credentials) => {
  console.log("postLogin API");
  return floraFinderApi
    .post(`/users/login`, credentials)
    .then((response) => {
      return response.data.user;
    })
    .catch((error) => {
      handleApiError(error, "postLogin");
    });
};

export const deleteUser = (username) => {
  console.log("deleteUser API");
  return floraFinderApi
    .delete(`/users/${username}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      handleApiError(error, "deleteUser");
    });
};

export const getCollections = () => {
  return floraFinderApi
    .get("/collections")
    .then((response) => {
      return response.data.collections;
    })
    .catch((error) => {
      handleApiError(error, "getCollections");
    });
};
