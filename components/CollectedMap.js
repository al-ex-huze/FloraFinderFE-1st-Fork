import React from "react";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import MapView, {
    Marker,
    Callout,
    Heatmap,
    PROVIDER_GOOGLE,
} from "react-native-maps";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";

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

    const [isLocating, setIsLocating] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [flowerIcons, setFlowerIcons] = useState(flowerIconsArr);
    const [plantsArr, setPlantsArr] = useState([]);

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
        });

        (async () => {
            setIsLocating(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }
            let location = await Location.getCurrentPositionAsync();
            setLocation(location);
            setIsLocating(false);
        })();

        setIsLoading(false);
    }, []);

    if (isLoading || isLocating) {
        return (
            <View style={styles.activityIndicatorBackground}>
                <ActivityIndicator
                    style={styles.loadPage}
                    size="large"
                    color="#006400"
                />
                <Text>Loading map...</Text>
            </View>
        );
    }
    return (
        <View style={styles.map_container}>
            <MapView
                style={styles.map_view}
                showsUserLocation={true}
                followsUserLocation={true}
                // provider={PROVIDER_GOOGLE}
                region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
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
        overflow: "hidden",
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
        paddingHorizontal: "7%",
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    text_container_2: {
        position: "absolute",
        width: "100%",
        height: 14,
        bottom: 0,
        paddingHorizontal: "7%",
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
