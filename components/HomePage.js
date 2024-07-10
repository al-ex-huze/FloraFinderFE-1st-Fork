import React from "react";
import { StyleSheet, Pressable, Text, View, ImageBackground, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faLeaf, faBars, faMapMarker, faCamera, faCircleDot, faUser } from '@fortawesome/free-solid-svg-icons';
const logo = require("../assets/FloraFinderLogo.png");

const backgroundLeaf = require("../assets/backgroundtest.jpg");

export default function HomePage({ navigation }) {
  return (
    <ImageBackground
      source={backgroundLeaf}
      style={styles.background}
      resizeMode="cover" // or "repeat"
    >
      <View style={styles.overlay}></View>
      <View style={styles.container}>
      <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logo} />
            </View>
        <Text style={styles.heading}>Home  <FontAwesomeIcon icon={faHome} color={"#006400"} size={35}/></Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("League Table")}
        >
          <Text style={styles.buttonText}>League Table   <FontAwesomeIcon icon={faBars} color={"white"}/></Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Collected Plants")}
        >
          <Text style={styles.buttonText}>Collected List   <FontAwesomeIcon icon={faLeaf} color={"white"}/></Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Collected Map")}
        >
          <Text style={styles.buttonText}>Collected Map  <FontAwesomeIcon icon={faMapMarker} color={"white"}/></Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Collect Now")}
        >
          <Text style={styles.buttonText}>Collect Now   <FontAwesomeIcon icon={faCamera} color={"white"}/></Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>My Profile  <FontAwesomeIcon icon={faUser} color={"white"}/></Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the background covers the entire screen
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#006400",
    width: "50%",
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
    color: "006400",
  },
  buttonText: {
    color: "white",
  },
  heading: {
    color: "#006400",
    marginTop: 10,
    fontFamily: 'Inter_900Black', 
    fontSize: 25,
    
},
logoContainer: {
  position: 'absolute',
  top: -75,
  left: 0,
  right: 0,
  alignItems: 'center',
  marginBottom: 0,
  marginTop: 0,
  
},
logo: {
  height: 250,
  resizeMode: 'contain',
},
});
