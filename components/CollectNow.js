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
} from "react-native";
import { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { postPhotoToPlantNet } from "../api";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faRefresh,
  faCamera,
  faPlusCircle,
  faTh,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";
const ref = React.createRef();

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingPreview, setIsSettingPreview] = useState(false);

  const cameraRef = useRef("");
  const [zoomLevel, setZoomLevel] = useState(0);
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
    setIsSettingPreview(true);
    try {
      await ref.current.takePictureAsync().then((photo) => {
        // it was neccessary to identify the <CameraView.. below with ref={ref} and add ref.current.. here but otherwise a picture is taken and stored in local cache with only the ..takePictureAsync method. can pass in options like quality - alex
        MediaLibrary.saveToLibraryAsync(photo.uri); // this library allows saving to device with this method (is not needed to take photo and send to api) - alex
        setImageUri(photo.uri); // storing the uri in state - alex
        setIsSettingPreview(false);
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
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePostPicture = async () => {
    setIsLoading(true);
    const firstMatch = await postPhotoToPlantNet(imageUri)
      .then((firstMatch) => {
        if (firstMatch.species.commonNames[0] !== undefined) {
          navigation.navigate("PlantResult", { plant: firstMatch });
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
    <CameraView
      ref={ref}
      style={styles.camera}
      facing={facing}
      zoom={zoomLevel}
    >
      <View style={styles.hud_container}>
        <View style={styles.preview_container}>
          {imageUri ? (
            <Image style={styles.preview_image} source={{ uri: imageUri }} />
          ) : null}
        </View>
        <View style={styles.button_container}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.button_text}>
              {" "}
              Flip Camera <FontAwesomeIcon icon={faRefresh} color={"white"} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImageAsync}>
            <Text style={styles.button_text}>
              {" "}
              Gallery <FontAwesomeIcon icon={faTh} color={"white"} />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.zoom_button_container}>
          <TouchableOpacity style={styles.zoom_button} onPress={handleZoomIn}>
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoom_button} onPress={handleZoomOut}>
            <FontAwesomeIcon icon={faMagnifyingGlassMinus} color={"white"} />
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
                <FontAwesomeIcon icon={faCamera} color={"white"} />
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
    backgroundColor: "#006400",
    margin: 2,
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
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
