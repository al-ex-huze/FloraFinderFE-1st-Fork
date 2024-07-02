import * as React from 'react'
import { StyleSheet, Pressable, View, Text, Image } from "react-native";
const favicon = require("../assets/FloraFinderCropped.png")



export default function LoginRegister({ navigation }) {
return (
    <View style={styles.container}>
        <Image source={favicon} style={styles.image}  />
            <Pressable
                style={styles.button}
                title="Login"
                onPress={() => {
                    navigation.navigate("Login");
                }}
            >
                <Text style={styles.text}>Login</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                title="Register"
                onPress={() => {
                    navigation.navigate("Register");
                }}
            >
                <Text style={styles.text}>Register</Text>
            </Pressable>
            <Pressable style={styles.button} title="TempLogin" onPress={() => {navigation.navigate("ProfileScreen");}}><Text style={styles.text}>TempLogin</Text></Pressable>
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
    image: {
        width: '80%', 
        resizeMode: 'contain',
    },
});