
![FloraFinder](assets/FloraFinderCropped.png)


## Introduction:
Welcome to the FloraFinder repository!

FloraFinder is an expo mobile app designed to enable users the quick identification of plants from images captured using a camera or stored on their phone. It processes images and efficiently stores the results into a collection for future reference. The app leverages a plant image classification model to provide users with valuable information about the plant they have captured and allow them to store their discoveries for future reference.


## Installation and Setup:


#### Core Packages:
* Expo
* Axios
* React
* React Native
* React Hook Form

1) Clone or download this repository to your local machine.

2) Install the required packages using the command in your terminal: **npm install**

3) Create a new file in the root of the repository:  **.plant_net.js** 

4) Save the following in the file:  **export const API_KEY  = "2b10TmBct7Bagi6rhgRXCuwX"**



 ## Usage:


To run the project type the following into your terminal:

**npx expo start**

Ensure the app is using **Expo Go** - it will state it clearly in the terminal

To run the project on expo go on your **phone** scan the QR code from your terminal using your camera.



 ## How it works:

**Image Upload** - Users can upload images of plants directly through the app using their phone to capture them or by uploading a stored image from their gallery.

**API Processing** - The app sends the uploaded image to the PlantNet API where the plant image classification model works its magic. 

**Plant identification** - The App provides the top probable result, scientific name, plant family and match score making it easy for users to identify the plant they have discovered.

**Map** - Users can view a map screen which indicates the locations of all their previous discoveries.

**Plant storage** - The user can opt to save their new discovery to the FloraFinder API which stores it in a collection on the app. They can sort and filter their results by different categories as well as view each plant individually which displays the plant's details plus the location where they found it.

**Profile and league table** - Users can view their total score on their profile page before comparing it to other users of FloraFinder on the league table.


## Additional Resources:

* [FloraFinder Backend API](https://github.com/Esther299/Flora-Finder-BE.git)
* [PlantNet API](https://my-api.plantnet.org/)
* [Expo documentation](https://docs.expo.dev/)