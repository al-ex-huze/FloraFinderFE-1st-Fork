import * as React from 'react'
import { StyleSheet, Pressable, View, Text, Image } from "react-native";
const favicon = require("../assets/favicon.png")




export default function LoginRegister() {
return (
    <View style={styles.container}>
        <Image source={favicon}  />
            <Pressable
                style={styles.button}
                title="Login"
                onPress={() => {
                    navigation.navigate("CameraViewer");
                }}
            >
                <Text style={styles.text}>Login</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                title="Register"
                onPress={() => {
                    navigation.navigate("CameraViewer");
                }}
            >
                <Text style={styles.text}>Register</Text>
            </Pressable>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // makes sure the colour takes up the whole screen
        backgroundColor: "#FF00FF", // Kate colour change
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
        backgroundColor: "black",
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
});