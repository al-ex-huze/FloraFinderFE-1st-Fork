import React from "react";
import { StyleSheet, Pressable, Button, Text, View, TouchableOpacity } from "react-native";
import MapView, { Marker, Heatmap, PROVIDER_GOOGLE  } from "react-native-maps";
import { useState } from "react";
const flowerIcon1 = require("../assets/flowericons/flowerIcon1.png")
const flowerIcon2 = require("../assets/flowericons/flowerIcon2.png")
const flowerIcon3 = require("../assets/flowericons/flowerIcon3.png")
const flowerIcon4 = require("../assets/flowericons/flowerIcon4.png")
const flowerIcon5 = require("../assets/flowericons/flowerIcon5.png")
const flowerIcon6 = require("../assets/flowericons/flowerIcon6.png")
const flowerIcon7 = require("../assets/flowericons/flowerIcon7.png")

export default function CollectedMap() {
        const [markersArr, setMarkersArr] = useState([]);
        const [heatMapPoints, setHeatMapPoints] = useState([]);
        const [flowerIcons, setFlowerIcons] = useState([
            flowerIcon1,
            flowerIcon2,
            flowerIcon3,
            flowerIcon4,
            flowerIcon5,
            flowerIcon6,
            flowerIcon7,
        ]);
        const handleMapPress = (mapPressEvent) => {
            let newMarker = {
                coordinate: mapPressEvent.coordinate,
                icon: flowerIcons[Math.floor(Math.random() * flowerIcons.length)], // random index generator ie * 7 for 0-6
            };
            setMarkersArr([...markersArr, newMarker]);
            setHeatMapPoints([
                ...heatMapPoints,
                {
                    longitude: mapPressEvent.coordinate.longitude,
                    latitude: mapPressEvent.coordinate.latitude,
                    weight: 1,
                },
            ]);
        };
        const handleReset = () => {
            setMarkersArr([]);
            setHeatMapPoints([]);
        };
        return (
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    // provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: 51.4504791,
                        longitude: 0.1740766,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.02, // delta relates to how zoomed in the map is and some function is performed on either one, relative to the width/height alex
                    }}
                    onPress={(e) => handleMapPress(e.nativeEvent)}
                >
                    {markersArr.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                longitude: marker.coordinate.longitude,
                                latitude: marker.coordinate.latitude,
                            }}
                            image={marker.icon}
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
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                    {markersArr.length === 0 ? (
                        <Text style={styles.text}>Press map to pin markers</Text>
                    ) : (
                        <Text style={styles.text}>RESET</Text>
                    )}
                </TouchableOpacity>
            </View>
        );
    } 


const styles = StyleSheet.create({
    titleText: {
        color: "006400"
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    button: {
        position: "absolute", // overlay on map
        width: "100%",
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
    
});