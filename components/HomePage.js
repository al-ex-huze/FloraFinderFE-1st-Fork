import React from "react";
import { StyleSheet, Pressable, Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faLeaf, faBars, faMapMarker, faCamera } from '@fortawesome/free-solid-svg-icons';


export default function HomePage({ navigation }) {
return (
    <View style={styles.container}>
            <Text style={styles.heading}>Home <FontAwesomeIcon icon={faHome} color={"#006400"}/></Text>
            <Pressable
                style={styles.button}
                title="LeagueTable"
                onPress={() => {
                    navigation.navigate("LeagueTable");
                }}
            >
                <Text style={styles.buttonText}>League Table   <FontAwesomeIcon icon={faBars} color={"white"}/> </Text>
            </Pressable>
            <Pressable
                style={styles.button}
                title="CollectedList"
                onPress={() => {
                    navigation.navigate("CollectedList");
                }}
            >
                <Text style={styles.buttonText}>Collected List   <FontAwesomeIcon icon={faLeaf} color={"white"}/></Text>
            </Pressable>
            <Pressable
                style={styles.button}
                title="CollectedMap"
                onPress={() => {
                    navigation.navigate("CollectedMap");
                }}
            >
                <Text style={styles.buttonText}>Collected Map   <FontAwesomeIcon icon={faMapMarker} color={"white"}/></Text>
            </Pressable>
            <Pressable
                style={styles.button}
                title="CollectNow"
                onPress={() => {
                    navigation.navigate("CollectNow");
                }}
            >
                <Text style={styles.buttonText}>Collect Now   <FontAwesomeIcon icon={faCamera} color={"white"}/></Text>
            </Pressable>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // makes sure the colour takes up the whole screen
        backgroundColor: "#CCFFCC", // Kate colour change
        alignItems: "center", // horizontal alex
        justifyContent: "center", // vertical alex
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#006400",
        width: "50%", // percentages need to be in in quotes alex
        margin: 12,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    titleText: {
        color: "006400"
    },
    buttonText : {
        color: "white",
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#006400",
     },
});