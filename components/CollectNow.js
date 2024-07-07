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
    const [isSettingPreview, setIsSettingPreview] = useState(false);

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
        setIsSettingPreview(true);
        try {
            await ref.current.takePictureAsync().then((photo) => {
                setImageUri(photo.uri);
                setIsSettingPreview(false);
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
                setImageUri("");
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error, "error in HANDLEPOST");
            }); // Yusha- turned this to async function, declared variable for async process, copied in line 68, was empty before
    };

    if (isLoading) {
        return (
            <View style={styles.activity_indicator_background}>
                <ActivityIndicator
                    style={styles.load_page}
                    size="large"
                    color="#006400"
                />
                <Text>Fetching plant data...</Text>
            </View>
        );
    }

    return (
        <CameraView ref={ref} style={styles.camera} facing={facing}>
            <View style={styles.hud_container}>
                <View style={styles.preview_container}>
                    {imageUri ? (
                        <Image
                            style={styles.preview_image}
                            source={{ uri: imageUri }}
                        />
                    ) : null}
                </View>

                <View style={styles.button_container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraFacing}
                    >
                        <Text style={styles.button_text}>
                            {" "}
                            Flip Camera{" "}
                            <FontAwesomeIcon icon={faRefresh} color={"white"} />
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={pickImageAsync}
                    >
                        <Text style={styles.button_text}>
                            {" "}
                            Gallery{" "}
                            <FontAwesomeIcon icon={faTh} color={"white"} />
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.camera_button_container}>
                    {isSettingPreview ? (
                        <View style={styles.activity_indicator_preview}>
                            <ActivityIndicator size="large" color="#006400" />
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.camera_button}
                            onPress={handleTakePicture}
                        >
                            <Text style={styles.button_text}>
                                <FontAwesomeIcon
                                    icon={faCamera}
                                    color={"white"}
                                />
                            </Text>
                        </TouchableOpacity>
                    )}
                    {imageUri && !isSettingPreview ? (
                        <TouchableOpacity
                            style={styles.camera_button}
                            onPress={handlePostPicture}
                        >
                            <Text style={styles.button_text}>ID</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        </CameraView>
    );
}

const styles = StyleSheet.create({
    hud_container: {
        flex: 1,
    },
    preview_container: {
        flex: 1,
        margin: 40,
    },
    preview_image: {
        flex: 1,
        height: "30%",
        borderRadius: 10,
    },
    camera: {
        flex: 1,
    },
    button_container: {
        flex: 1,
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
    camera_button_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    camera_button: {
        alignItems: "center",
        justifyContent: "center",
        width: 75,
        height: 75,
        borderRadius: 50,
        elevation: 3,
        backgroundColor: "#006400",
        margin: 2,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    button_text: {
        color: "white",
    },
    load_page: {
        backgroundColor: "#CCFFCC",
    },
    activity_indicator_background: {
        backgroundColor: "#CCFFCC",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    activity_indicator_preview: {
        flex: 1,
    },
});
