import * as React from "react";
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Image,
} from "react-native";
import { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera"; // needed to take picture alex
import { postPhotoToPlantNet } from "../api";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faRefresh,
    faCamera,
    faPlusCircle,
    faTh,
} from "@fortawesome/free-solid-svg-icons";
const ref = React.createRef();

export default function CollectNow({ navigation }) {
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    Flora Finder wants to use your camera?
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    const toggleCameraFacing = () => {
        setFacing((current) => (current === "back" ? "front" : "back"));
    };

    const handleTakePicture = async () => {
        try {
            await ref.current.takePictureAsync().then((photo) => {
                setImageUri(photo.uri);
            });
        } catch (error) {
            console.log(error, "<-- ERROR TAKE PICTURE");
        }
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handlePostPicture = async () => {
        setIsLoading(true);
        const firstMatch = await postPhotoToPlantNet(imageUri)
            .then((firstMatch) => {
                navigation.navigate("PlantResult", { plant: firstMatch });
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error, "error in HANDLEPOST");
            }); // Yusha- turned this to async function, declared variable for async process, copied in line 68, was empty before
    };

    if (isLoading) {
        return (
            <View style={styles.activityIndicatorBackground}>
                <ActivityIndicator
                    style={styles.loadPage}
                    size="large"
                    color="#006400"
                />
                <Text>Fetching plant data...</Text>
            </View>
        );
    }

    return (
        <CameraView ref={ref} style={styles.camera} facing={facing}>
            {imageUri ? (
                <View style={styles.preview_container}>
                    <Image style={styles.preview_image} source={{ uri: imageUri }} />
                </View>
            ) : null}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleCameraFacing}
                >
                    <Text style={styles.buttonText}>
                        {" "}
                        Flip Camera{" "}
                        <FontAwesomeIcon icon={faRefresh} color={"white"} />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleTakePicture}
                >
                    <Text style={styles.buttonText}>
                        {" "}
                        Capture{" "}
                        <FontAwesomeIcon icon={faCamera} color={"white"} />{" "}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePostPicture}
                >
                    <Text style={styles.buttonText}>
                        {" "}
                        Post photo{" "}
                        <FontAwesomeIcon icon={faPlusCircle} color={"white"} />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={pickImageAsync}
                >
                    <Text style={styles.buttonText}>
                        {" "}
                        Gallery <FontAwesomeIcon icon={faTh} color={"white"} />
                    </Text>
                </TouchableOpacity>
            </View>
        </CameraView>
    );
}

const styles = StyleSheet.create({
    preview_container:{
        flex: 1,
        margin: 20,
    },
    preview_image: {
        flex: 1,
    },
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
        backgroundColor: "#006400",
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
    buttonText: {
        color: "white",
    },
    loadPage: {
        backgroundColor: "#CCFFCC",
    },
    activityIndicatorBackground: {
        backgroundColor: "#CCFFCC",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
