import * as React from 'react'
import { StyleSheet, Pressable, View, Text, Image, ImageBackground } from "react-native";
const backgroundLeaf = require("../assets/backgroundtest.jpg");

export default function LoginRegister({ navigation }) {
return (
    <ImageBackground 
    source={backgroundLeaf}
    style={styles.background}
    resizeMode="cover"
    >

    <View style={styles.container}>
       
            <Pressable
                style={styles.button}
                title="Login"
                onPress={() => {
                    navigation.navigate("Login");
                }}
            >
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                title="Register"
                onPress={() => {
                    navigation.navigate("Register");
                }}
            >
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>
            <Pressable style={styles.button} title="TempLogin" onPress={() => {navigation.navigate("HomePage");}}><Text style={styles.buttonText}>TempLogin</Text></Pressable>
    </View>
    </ImageBackground>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // makes sure the colour takes up the whole screen
        alignItems: "center", // horizontal alex
        justifyContent: "flex-start", // vertical alex
        marginTop: 202,
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
        marginTop: 12,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    buttonText: {
        color: "white",
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#006400",
     },
     background: {
        flex: 1,
      },
      overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0.5, 0.5, 0.5, 0.8)', // Adjust the rgba value for transparency (0.5 is 50% transparency)
    },
});