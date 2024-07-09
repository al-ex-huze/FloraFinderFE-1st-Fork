import React, { useEffect, useState } from "react";
import { getUsers } from "../api";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

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

  const tableHead = ["Avatar", "Username", "Rank"];

  const handleUsernamePress = (username) => {
    navigation.navigate("UserCard", { username });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006400" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>League Table</Text>
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
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
                <View style={[styles.cell, styles.columnRank]}>
                  <Text style={styles.cellText}>{index + 1}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#CCFFCC",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCFFCC",
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
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#006400",
  },
  headerCell: {
    padding: 10,
    backgroundColor: "#006400",
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
    backgroundColor: "#FFFFFF",
  },
  oddRow: {
    backgroundColor: "#F0F0F0",
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
  columnAvatar: { flex: 0.2, alignItems: "center", justifyContent: "center" },
  columnUsername: { flex: 0.5, alignItems: "flex-start" },
  columnRank: { flex: 0.3, alignItems: "center" },
});
