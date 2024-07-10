import React, { useEffect, useState } from "react";
import { getUsers } from "../api/apiFunctions";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const backgroundLeaf = require("../assets/backgroundtest.jpg");

export default function LeagueTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getUsers()
      .then((fetchedUsers) => {
        console.log("Fetched Users:", fetchedUsers);
        if (fetchedUsers) {
          setUsers(fetchedUsers);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      });
  }, []);

  const tableHead = ["Avatar", "Username", "Score", "Rank"];

  const handleUsernamePress = (username) => {
    navigation.navigate("User", { username });
  };

  if (isLoading) {
    return (
      <ImageBackground
        source={backgroundLeaf}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#006400" />
          <Text>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (users.length === 0) {
    return (
      <ImageBackground
        source={backgroundLeaf}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={styles.noDataText}>No data available</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={backgroundLeaf}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.heading}>League Table</Text>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              {tableHead.map((header, index) => (
                <View
                  key={index}
                  style={[styles.headerCell, styles[`column${header}`]]}
                >
                  <Text style={styles.headerText}>{header}</Text>
                </View>
              ))}
            </View>
            <ScrollView>
              {users.map((user, index) => (
                <View
                  key={index}
                  style={[
                    styles.tableRow,
                    index % 2 === 0 ? styles.evenRow : styles.oddRow,
                  ]}
                >
                  <View style={[styles.cell, styles.columnAvatar]}>
                    <View style={styles.avatarContainer}>
                      <Image
                        source={{
                          uri: user.avatar || "https://via.placeholder.com/100",
                        }}
                        style={styles.avatar}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.cell, styles.columnUsername]}
                    onPress={() => handleUsernamePress(user.username)}
                  >
                    <Text
                      style={[styles.cellText, styles.linkText]}
                      numberOfLines={1}
                    >
                      {user.username}
                    </Text>
                  </TouchableOpacity>
                  <View style={[styles.cell, styles.columnScore]}>
                    <Text style={styles.cellText}>{user.total_score}</Text>
                  </View>
                  <View style={[styles.cell, styles.columnRank]}>
                    <Text style={styles.cellText}>{index + 1}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#006400",
  },
  tableContainer: {
    alignItems: "center",
  },
  table: {
    borderWidth: 1,
    borderColor: "#006400",
    width: screenWidth * 0.9,
    backgroundColor: "white",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#006400",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#006400",
  },
  headerCell: {
    padding: 10,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },
  cell: {
    padding: 10,
    justifyContent: "center",
  },
  cellText: {
    textAlign: "center",
    fontSize: 12,
  },
  evenRow: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  oddRow: {
    backgroundColor: "rgba(240, 240, 240, 0.8)",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: "#006400",
    marginTop: 20,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "200%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  columnAvatar: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  columnUsername: { width: "35%", alignItems: "flex-start" },
  columnScore: { width: "25%", alignItems: "center" },
  columnRank: { width: "20%", alignItems: "center" },
});
