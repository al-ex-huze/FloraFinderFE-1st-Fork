import {Button, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import React, { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera"; // needed to take picture alex
import * as MediaLibrary from "expo-media-library"; // needed to save picture alex
import { postPhotoToPlantNet } from "../api";
const ref = React.createRef();
import * as ImagePicker from "expo-image-picker";

export default function CollectNow({ navigation }) {

    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState("");
    const [identifiedPlant, setIdentifiedPlant] = useState([]);
    const [iddPlantUid, setIddPlantUid] = useState("");
    const [iddPlantMatchScore, setIddPlantMatchScore] = useState("");
    const [iddPlantCommonName, setIddPlantCommonName] = useState("");
    const [iddPlantScientificName, setIddPlantScientificName] = useState("");
    const [iddPlantFamily, setIddPlantFamily] = useState("");
    const [iddPlantGenus, setIddPlantGenus] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    

    const cameraRef = useRef("")
    
    if (!permission) {
        return <View />;
    }
    
    if (!permission.granted) {
    return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}> PERMISSION PLEASE </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    const toggleCameraFacing = () => {
        setFacing((current) => (current === "back" ? "front" : "back"));
    };
    const handleTakePicture = async () => {
        try {
            await ref.current.takePictureAsync().then((photo) => { // it was neccessary to identify the <CameraView.. below with ref={ref} and add ref.current.. here but otherwise a picture is taken and stored in local cache with only the ..takePictureAsync method. can pass in options like quality - alex
                MediaLibrary.saveToLibraryAsync(photo.uri); // this library allows saving to device with this method (is not needed to take photo and send to api) - alex
                setImageUri(photo.uri); // storing the uri in state - alex
            });
        } catch (error) {
            console.log(error, "<-- ERROR");
        }
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.canceled) {
            setImageUri(result.assets[0].uri)
          }
    } 
    

   const handlePostPicture = async () => {
        setIsLoading(true)
        const firstMatch = await postPhotoToPlantNet(imageUri) // passes the uri to the api alex
        .then((firstMatch) => { // best matched object returned and details set in state alex
            setIdentifiedPlant(firstMatch);
            navigation.navigate('PlantResult', { plant: firstMatch })
        setIsLoading(false)
        }); // Yusha- turned this to async function, declared variable for async process, copied in line 68, was empty before
    };

    if(isLoading) {
        return ( <View><ActivityIndicator size="large" color="#0000ff" /></View>)
    }

    return (
        <CameraView ref={ref} style={styles.camera} facing={facing}>
            <View style={styles.idContainer}>
                <Text style={styles.idText}>{iddPlantCommonName}</Text>
                <Text style={styles.idText}>{iddPlantMatchScore}</Text>
                <Text style={styles.idText}>{iddPlantScientificName}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleCameraFacing}
                >
                    <Text style={styles.text}> FLIP CAMERA </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleTakePicture}
                >
                    <Text style={styles.text}> TAKE PICTURE </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePostPicture} 
                    
                >
                     {/* <ActivityIndicator size="large" color="#0000ff" /> */}
                    <Text style={styles.text}> POST PICTURE </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={pickImageAsync}
                >
                    <Text style={styles.text}> PICK IMAGE </Text>
                </TouchableOpacity>
            </View>
        </CameraView>
    );
}
// <TouchableOpacity.. like a button but goes transparent when pressed alex
const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "black",
        margin: 2,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    idContainer: {
        flex: 1,
        alignItems: "center",
    },
    idText: {
        fontSize: 32,
        fontWeight: "bold",
    },
});