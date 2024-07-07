import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView, {
    Marker,
    Callout,
    Heatmap,
    PROVIDER_GOOGLE,
} from "react-native-maps";
import { useContext, useEffect, useState } from "react";
import { WebView } from 'react-native-webview';

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
    // const username = user.username;

    const [isLoading, setIsLoading] = useState(true);
    const [plantsArr, setPlantsArr] = useState([]);

    const [flowerIcons, setFlowerIcons] = useState(flowerIconsArr);

    useEffect(() => {
        console.log("USE EFFECT in COLLECTED MAP");
        setIsLoading(true);
        getCollectedPlantsList(user.username).then((usersPlants) => {
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
        <View style={styles.map_container}>
            <MapView
                style={styles.map_view}
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
                        tooltip={true}
                            onPress={() => {
                                navigation.navigate("CollectedSingleCard", {
                                    plant: plant,
                                });
                            }}
                        >
                            <View style={styles.callout_container}>
                                <View style={styles.callout_template}>
                                        <WebView
                                            style={styles.callout_image}
                                            source={{ uri: plant.image }}
                                        />
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
    map_container: {
        flex: 1,
    },
    map_view: {
        width: "100%",
        height: "100%",
    },
    callout_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        overflow: "hidden"
    },
    callout_template: {
        width: 100,
        height: 100,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
        borderRadius: 10,
    },
    callout_image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    text_container_1: {
        position: "absolute",
        width: "100%",
        height: 14,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    text_container_2: {
        position: "absolute",
        width: "100%",
        height: 14,
        bottom: 0,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "flex-end",
    },
    text_1: {
        fontSize: 10,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    text_2: {
        fontSize: 10,
        letterSpacing: 0.25,
        color: "white",
    },
});
