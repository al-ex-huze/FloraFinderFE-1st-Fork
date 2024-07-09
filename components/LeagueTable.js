import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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

  const handleDeleteUser = (username) => {
    Alert.alert("Delete User", `Are you sure you want to delete ${username}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteUser(username)
            .then(() => {
              setUsers((prevUsers) =>
                prevUsers.filter((user) => user.username !== username)
              );
            })
            .catch((error) => {
              console.error("Error deleting user:", error);
              Alert.alert("Error", "Failed to delete user. Please try again.");
            });
        },
      },
    ]);
  };

  const tableHead = ["Username", "Email", "Name", "Rank", "Action"];

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
      <ScrollView vertical>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            {tableHead.map((header, index) => (
              <View key={index} style={styles.headerCell}>
                <Text style={styles.headerText}>{header}</Text>
              </View>
            ))}
          </View>
          {users.map((user, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.evenRow : styles.oddRow,
              ]}
            >
              <TouchableOpacity
                style={styles.cell}
                onPress={() => handleUsernamePress(user.username)}
              >
                <Text style={[styles.cellText, styles.linkText]}>
                  {user.username}
                </Text>
              </TouchableOpacity>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{user.email}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{user.name}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteUser(user.username)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
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
  table: {
    borderWidth: 1,
    borderColor: "#006400",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#006400",
  },
  headerCell: {
    flex: 1,
    padding: 10,
    backgroundColor: "#006400",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cell: {
    flex: 1,
    padding: 10,
  },
  cellText: {
    textAlign: "center",
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
  deleteButton: {
    backgroundColor: "#ff4444",
    padding: 5,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
