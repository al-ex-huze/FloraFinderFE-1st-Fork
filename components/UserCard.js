import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { getUserByUsername } from "../api";

const UserCard = ({ route }) => {
  const { username } = route.params;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserByUsername(username)
      .then((fetchedUser) => {
        setUser(fetchedUser);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setIsLoading(false);
      });
  }, [username]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006400" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>This user data is not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user.avatar || "https://via.placeholder.com/150" }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          {user.total_score !== undefined && (
            <Text style={styles.score}>Total Score: {user.total_score}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 12,
  },
  avatar: {
    width: "100%",
    height: "200%",
    resizeMode: "cover",
    position: "absolute",
    top: 0, // Align to the top
    left: 0,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: "#666",
    marginBottom: 1,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 1,
  },
  score: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
export default UserCard;
