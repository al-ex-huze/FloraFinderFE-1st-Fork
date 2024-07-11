import * as React from "react";
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Image,
    ImageBackground
} from "react-native";
import { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { postPhotoToPlantNet } from "../api/apiFunctions";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faCamera,
    faTh,
    faMagnifyingGlassPlus,
    faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";
const ref = React.createRef();

const backgroundLeaf = require("../assets/backgroundtest.jpg");

export default function CollectNow({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSettingPreview, setIsSettingPreview] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(0);

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
    const handlePostPicture = async () => {
        setIsLoading(true);
        const firstMatch = await postPhotoToPlantNet(imageUri)
            .then((firstMatch) => {
                if (firstMatch.species.commonNames[0] !== undefined) {
                    navigation.navigate("Found Plant", { plant: firstMatch });
                    setImageUri("");
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error, "error in HANDLEPOST");
                setIsLoading(false);
                Alert.alert("Unable to ID image", "Please try again", [
                    {
                        text: "OK",
                        style: "default",
                    },
                ]);
            });
    };
    const handleZoomIn = () => {
        if (zoomLevel < 1) {
            setZoomLevel(zoomLevel + 0.1);
        }
    };
    const handleZoomOut = () => {
        if (zoomLevel > 0) {
            setZoomLevel(zoomLevel - 0.1);
        }
    };
    if (isLoading) {
        return (
            <ImageBackground
            source={backgroundLeaf}
            style={styles.imageBackground}
            resizeMode="cover"
        >
            <View style={styles.overlay} />
            <View style={styles.activity_indicator_background}>
                <ActivityIndicator
                    style={styles.load_page}
                    size="large"
                    color="#006400"
                />
                <Text>Analysing plant data...</Text>
            </View>
            </ImageBackground>
        )
    }
    return (
        <CameraView
            ref={ref}
            style={styles.camera}
            zoom={zoomLevel}
            focusMode={"off"}
        >
            <View style={styles.hud_container}>
                <View style={styles.preview_container}>
                    {imageUri ? (
                        <Image
                            style={styles.preview_image}
                            source={{ uri: imageUri }}
                        />
                    ) : null}
                </View>
                <View style={styles.zoom_button_container}>
                    <TouchableOpacity
                        style={styles.zoom_button}
                        onPress={handleZoomIn}
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlassPlus}
                            color={"white"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.zoom_button}
                        onPress={handleZoomOut}
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlassMinus}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.gallery_button_container}>
                    <TouchableOpacity
                        style={styles.gallery_button}
                        onPress={pickImageAsync}
                    >
                        <FontAwesomeIcon icon={faTh} color={"white"} />
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
                                    style={styles.iconButtonStyle}
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
                            <Text style={styles.button_text}>ID Plant</Text>
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
    gallery_button_container: {
        flex: 1,
        alignSelf: "flex-end",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    gallery_button: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#006400",
        margin: 2,
        borderWidth: 1,
        borderColor: "white",
    },
    zoom_button_container: {
        flex: 1,
        alignSelf: "flex-end",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    zoom_button: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#006400",
        margin: 2,
        borderWidth: 1,
        borderColor: "white",
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
        borderWidth: 1,
        borderColor: "white",
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
        backgroundColor: "transparent",
    },
    activity_indicator_background: {
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    activity_indicator_preview: {
        flex: 1,
    },
    iconButtonStyle: {
        marginTop: -8,
    },
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
});
