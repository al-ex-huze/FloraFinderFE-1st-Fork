import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getUserByUsername, deleteUser } from "../api";
import { UserContext } from "../contexts/Contexts";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";

const backgroundLeaf = require("../assets/backgroundtest.jpg");

export default function ProfilePage() {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    getUserByUsername(user.username)
      .then((fetchedUser) => {
        setUser(fetchedUser);
      })
      .catch((error) => {
        console.error("Error fetching profile", error);
      });
  }, [user.username]);

  const handleDeleteUser = () => {
    Alert.alert("Delete Account", `Are you sure you want to delete your account, ${user.username}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteUser(user.username)
            .then(() => {
              setUser({});
            //   navigation.navigate("LoginRegister");
            })
            .catch((error) => {
              console.error("Error deleting user:", error);
              Alert.alert("Error", "Failed to delete user. Please try again.");
            });
        },
      },
    ]);
  };

  return (
    <ImageBackground
      source={backgroundLeaf}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.imageBackground}></View>
      <View>
        <Text style={styles.heading}>My Profile</Text>
        {user ? (
          <View style={styles.userInfo}>
            <Text>Username: {user.username}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Name: {user.name}</Text>
            <Text>Total Score: {user.total_score}</Text>
            {user.avatar ? (
              <View style={styles.avatarContainer}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <Text style={styles.avatarLabel}>Avatar</Text>
              </View>
            ) : (
              <Text>No avatar available!</Text>
            )}
            <Pressable style={styles.deleteButton} onPress={handleDeleteUser}>
              <Text style={styles.deleteButtonText} >Delete Account</Text>
              <FontAwesomeIcon icon={faUserXmark} color={"white"} size={25}/>
            </Pressable>
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  heading: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    color: "#006400",
    marginBottom: 10,
    fontFamily: 'Inter_900Black', 
    fontSize: 25,
    textAlign: 'center'
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
    borderRadius: 10,
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 200,
    borderRadius: 50,
  },
  avatarLabel: {
    marginTop: 10,
    color: "#006400",
    fontSize: 16,
  },
  deleteButton: {
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
  deleteButtonText: {
    color: "white",
    
  },
});
