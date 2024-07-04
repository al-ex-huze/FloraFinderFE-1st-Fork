import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faHome,
    faCamera,
    faBookmark,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

import { postNewPlantToCollection } from "../api";
import * as Location from "expo-location";

export default function PlantResult({ route, navigation }) {
    const { plant } = route.params;

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const handleSavePlantToCollection = () => {
        const username = "alex";
        const currentTimestamp = new Date().toISOString();
        console.log(currentTimestamp);
        const newCollection = {
            uniqueSerialID: plant.species.scientificNameWithoutAuthor,
            speciesID: Number(plant.gbif.id),
            speciesName: plant.species.commonNames[0],
            geoTag: JSON.stringify({latitude: location.coords.latitude, longitude: location.coords.longitude}),
            matchScore: plant.score,
            dateCollected: currentTimestamp,
            image: plant.images[0].url.m,
            speciesFamily: plant.species.family.scientificNameWithoutAuthor,
        };

        postNewPlantToCollection(username, newCollection)
            .then((response) => {
                console.log(response, "RESPONSE in PLANTRESULT");
            })
            .catch((error) => {
                console.log(response, "RESPONSE in PLANTRESULT");
            });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                You found a {plant.species.commonNames[0]}!
            </Text>
            <Pressable style={styles.resultCard} title="Result Card">
                <View style={styles.resultContainer}>
                    <Text style={styles.label}>Plant Family: </Text>
                    <Text style={styles.value}>
                        {plant.species.family.scientificNameWithoutAuthor}
                    </Text>
                </View>
                <View style={styles.resultContainer}>
                    <Text style={styles.label}>Scientific Name: </Text>
                    <Text style={styles.value}>
                        {plant.species.scientificNameWithoutAuthor}
                    </Text>
                </View>
                <View style={styles.resultContainer}>
                    <Text style={styles.label}>Your Match Score: </Text>
                    <Text style={styles.value}>{plant.score}</Text>
                </View>
            </Pressable>
            <Image
                style={styles.image}
                source={{ uri: plant.images[0].url.m }}
            />
            <Pressable
                style={styles.button}
                title="Go Back"
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>
                    Find Another Plant{" "}
                    <FontAwesomeIcon icon={faCamera} color={"white"} />
                </Text>
            </Pressable>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSavePlantToCollection}
            >
                <Text style={styles.buttonText}>
                    {" "}
                    Save To Collection{" "}
                    <FontAwesomeIcon icon={faBookmark} color={"white"} />
                </Text>
            </TouchableOpacity>
            <Pressable
                style={styles.button}
                title="Home Page"
                onPress={() => navigation.navigate("HomePage")}
            >
                <Text style={styles.buttonText}>
                    Back To Home{" "}
                    <FontAwesomeIcon icon={faHome} color={"white"} />
                </Text>
            </Pressable>
        </View>
    );
}

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
        margin: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
    idContainer: {
        flex: 1,
        alignItems: "center",
    },
    idText: {
        fontSize: 32,
        fontWeight: "bold",
    },
    image: {
        borderRadius: 150 / 2,
        width: 128,
        height: 128,
        paddingVertical: 12,
    },
    container: {
        flex: 1, // makes sure the colour takes up the whole screen
        backgroundColor: "#CCFFCC", // Kate colour change
        alignItems: "center", // horizontal alex
        justifyContent: "center", // vertical alex
    },
    buttonText: {
        color: "white",
    },
    resultContainer: {
        flexDirection: "row",
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
    },
    value: {
        fontSize: 20,
    },
    resultCard: {
        backgroundColor: "white",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        margin: 12,
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#006400",
    },
});
