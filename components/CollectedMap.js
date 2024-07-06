import React from "react";
import {
    StyleSheet,
    View,
} from "react-native";
import MapView, { Marker, Heatmap, PROVIDER_GOOGLE } from "react-native-maps";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../contexts/Contexts";
import { getCollectedPlantsList } from "../api";
import {
    parseGeoTagLatitude,
    parseGeoTagLongitude,
} from "../utils/parseGeoTag";

const flowerIcon1 = require("../assets/flowericons/flowerIcon1.png");
const flowerIcon2 = require("../assets/flowericons/flowerIcon2.png");
const flowerIcon3 = require("../assets/flowericons/flowerIcon3.png");
const flowerIcon4 = require("../assets/flowericons/flowerIcon4.png");
const flowerIcon5 = require("../assets/flowericons/flowerIcon5.png");
const flowerIcon6 = require("../assets/flowericons/flowerIcon6.png");
const flowerIcon7 = require("../assets/flowericons/flowerIcon7.png");

export default function CollectedMap({ navigation }) {
    // const [heatMapPoints, setHeatMapPoints] = useState([]);

    const { user, setUser } = useContext(UserContext);
    const username = user.username;

    const [isLoading, setIsLoading] = useState(true);
    const [plantsArr, setPlantsArr] = useState([]);

    const [flowerIcons, setFlowerIcons] = useState([
        flowerIcon1,
        flowerIcon2,
        flowerIcon3,
        flowerIcon4,
        flowerIcon5,
        flowerIcon6,
        flowerIcon7,
    ]);

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
                    />
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
});
