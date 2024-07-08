import React, { useEffect, useState } from "react";
import { getUsers } from "../api";
import { Table, Row, Rows } from "react-native-table-component";
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from "react-native";
export default function LeagueTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const tableHead = ["Username", "Email", "Name", "Rank"];
  const tableData =
    users.length > 0
      ? users.map((user, index) => [
          user.username,
          user.email,
          user.name,
          index + 1,
        ])
      : [];
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
        <Table borderStyle={styles.tableBorder}>
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={StyleSheet.flatten(styles.headerText)}
          />
          <Rows
            data={tableData}
            textStyle={StyleSheet.flatten(styles.rowText)}
          />
        </Table>
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
  tableBorder: {
    borderWidth: 2,
    borderColor: "#006400",
  },
  head: {
    height: 40,
    backgroundColor: "#006400",
  },
  headerText: {
    margin: 6,
    textAlign: "center",
    color: "white",
  },
  rowText: {
    margin: 6,
    textAlign: "center",
    color: "#000000",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: "#006400",
    marginTop: 20,
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
  buttonText: {
    color: "white",
  },
});
