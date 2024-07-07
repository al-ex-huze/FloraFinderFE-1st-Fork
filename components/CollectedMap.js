import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView, {
    Marker,
    Callout,
    Heatmap,
    PROVIDER_GOOGLE,
} from "react-native-maps";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../contexts/Contexts";
import { getCollectedPlantsList } from "../api";
import {
    parseGeoTagLatitude,
    parseGeoTagLongitude,
} from "../utils/parseGeoTag";

const flowerIconsArr = require("../assets/flowericons/flowerIcons.js"); // moved all to separate file in assets to tidy up

export default function CollectedMap({ navigation }) {
    // const [heatMapPoints, setHeatMapPoints] = useState([]);

    const { user, setUser } = useContext(UserContext);
    const username = user.username;

    const [isLoading, setIsLoading] = useState(true);
    const [plantsArr, setPlantsArr] = useState([]);

    const [flowerIcons, setFlowerIcons] = useState(flowerIconsArr);

    useEffect(() => {
        console.log("USE EFFECT in COLLECTED MAP");
        setIsLoading(true);
        getCollectedPlantsList(username).then((usersPlants) => {
            setPlantsArr(usersPlants);

            // adds coords to heat map
            /*usersPlants.map((plant) => {
                setHeatMapPoints([
                    ...heatMapPoints,
                    {
                        longitude: parseGeoTagLongitude(plant),
                        latitude: parseGeoTagLatitude(plant),
                        weight: 1,
                    },
                ]);
            });
            */

            setIsLoading(false);
        });
    }, []);

    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                // provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 51.4504791,
                    longitude: 0.1740766,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.02,
                }}
            >
                {plantsArr.map((plant, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            longitude: parseGeoTagLongitude(plant),
                            latitude: parseGeoTagLatitude(plant),
                        }}
                        image={
                            flowerIcons[
                                Math.floor(Math.random() * flowerIcons.length)
                            ]
                        }
                    >
                        <Callout
                            onPress={() => {
                                navigation.navigate("CollectedSingleCard", {
                                    plant: plant,
                                });
                            }}
                        >
                            <Text style={styles.callout_text}>
                                CALLOUT TEST
                            </Text>
                            <View style={styles.callout_container}>
                                <View style={styles.card_template}>
                                    <Text>
                                        <Image
                                            // style={styles.card_image}
                                            style={{ height: 100, width: 100 }}
                                            source={{ uri: plant.image }}
                                        />
                                    </Text>
                                    <View style={styles.text_container_1}>
                                        <Text style={styles.text_1}>
                                            {plant.speciesName}
                                        </Text>
                                    </View>
                                    <View style={styles.text_container_2}>
                                        <Text style={styles.text_2}>
                                            {plant.plantId}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Callout>
                    </Marker>
                ))}

                {/* {heatMapPoints[0] ? (
                    <Heatmap
                        opacity={0.5}
                        radius={30}
                        points={heatMapPoints}
                    ></Heatmap>
                ) : null} */}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        color: "006400",
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    callout_text: {
        color: "black",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
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

    callout_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 128,
    },
    card_template: {
        width: "100%",
        height: 128,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    },
    card_image: {
        width: 128,
        height: 128,
        // borderRadius: 10,
    },
    text_container_1: {
        position: "absolute",
        width: "100%",
        height: 32,
        padding: 4,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    text_container_2: {
        position: "absolute",
        width: "100%",
        height: 32,
        bottom: 0,
        padding: 4,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "flex-end",
    },
    text_1: {
        fontSize: 22,
        lineHeight: 24,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    text_2: {
        fontSize: 16,
        lineHeight: 18,
        letterSpacing: 0.25,
        color: "white",
    },
});
