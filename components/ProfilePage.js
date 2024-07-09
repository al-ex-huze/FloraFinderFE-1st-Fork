import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { getUserByUsername } from "../api";
import { UserContext } from "../contexts/Contexts";

const backgroundLeaf = require("../assets/backgroundtest.jpg");

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user.username) {
      getUserByUsername(user.username)
        .then((fetchedUser) => {
          console.log("Fetched User Data:", fetchedUser);
          setUserData(fetchedUser);
        })
        .catch((error) => {
          console.error("Error fetching profile", error);
        });
    }
  }, [user.username]);

  return (
    <ImageBackground
      source={backgroundLeaf}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.overlay}></View>
      <View style={styles.container}>
        <Text style={styles.heading}>My Profile</Text>
        {user ? (
          <View style={styles.userInfo}>
            <Text style={styles.label}>Username: {user.username}</Text>
            <Text style={styles.label}>Email: {user.email}</Text>
            <Text style={styles.label}>Name: {userData.name}</Text>
            <Text style={styles.label}>Total Score: {user.total_score}</Text>
            {userData.avatar ? (
              <View style={styles.avatarContainer}>
                <Image source={{ uri: userData.avatar }} style={styles.avatar} />
                <Text style={styles.avatarLabel}>Avatar</Text>
              </View>
            ) : (
              <Text>No avatar available!</Text>
            )}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50, 
  },
  heading: {
    color: "#006400",
    marginBottom: 20,
    fontFamily: 'Inter_900Black',
    fontSize: 25,
  },
  userInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#006400",
    borderRadius: 60, 
    padding: 10, 
  },
  avatar: {
    width: 100,
    height: 180,
    borderRadius: 50,
  },
  avatarLabel: {
    marginTop: 10,
    fontSize: 16,
    
  },
})
