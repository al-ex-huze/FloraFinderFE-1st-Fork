import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/Contexts";
import RNPickerSelect from "react-native-picker-select";
import CollectedListCard from "./CollectedListCard";

import { getCollectedPlantsList } from "../../api/apiFunctions";
const backgroundLeaf = require("../../assets/backgroundtest.jpg");

export default function CollectedList({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [plants, setPlants] = useState([]);
  const [speciesFamilies, setSpeciesFamilies] = useState([]);
  const [selectedSpeciesFamily, setSelectedSpeciesFamily] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const username = user.username;

  useEffect(() => {
    getCollectedPlantsList(username, {
      speciesFamily: selectedSpeciesFamily,
      sortBy,
      orderBy,
    })
      .then((fetchedPlants) => {
        setIsLoading(false);
        setPlants(fetchedPlants);
        const uniqueSpeciesFamilies = [
          ...new Set(fetchedPlants.map((plant) => plant.speciesFamily)),
        ];
        setSpeciesFamilies(uniqueSpeciesFamilies);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, [username, selectedSpeciesFamily, sortBy, orderBy]);

  const handleReset = () => {
    setSelectedSpeciesFamily("");
    setSortBy("");
    setOrderBy("");
  };

  if (isLoading) {
    return (
      <View style={styles.activityIndicatorBackground}>
        <ActivityIndicator
          style={styles.loadPage}
          size="large"
          color="#006400"
        />
        <Text>Fetching list data...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={backgroundLeaf}
      style={styles.background}
      resizeMode="repeat"
    >
      <View style={styles.overlay}></View>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.query_container}>
            <View style={styles.query_button_container}>
              <RNPickerSelect
                onValueChange={(value) => setSelectedSpeciesFamily(value)}
                items={speciesFamilies.map((family) => ({
                  label: family,
                  value: family,
                }))}
                placeholder={{ label: "Filter", value: null }}
                style={pickerSelectStyles}
              ></RNPickerSelect>
            </View>
            <View style={styles.query_button_container}>
              <RNPickerSelect
                onValueChange={(value) => setSortBy(value)}
                items={[
                  { label: "Date Collected", value: "dateCollected" },
                  { label: "Match Score", value: "matchScore" },
                  { label: "Species Name", value: "speciesName" },
                ]}
                placeholder={{ label: "Sort", value: null }}
                style={pickerSelectStyles}
              ></RNPickerSelect>
            </View>
            <View style={styles.query_button_container}>
              <Pressable
                style={styles.icon_button}
                onPress={() => setOrderBy(orderBy === "ASC" ? "DESC" : "ASC")}
              >
                <Ionicons
                  name={orderBy === "DESC" ? "arrow-down" : "arrow-up"}
                  size={24}
                  color="white"
                />
              </Pressable>
            </View>
            <View style={styles.query_button_container}>
              <Pressable style={styles.reset_button} onPress={handleReset}>
                <Text style={styles.button_text}>Reset</Text>
              </Pressable>
            </View>
          </View>
          {plants.map((plant, index) => (
            <Pressable
              key={index}
              title="CollectedSingleCard"
              style={styles.card}
              onPress={() => {
                navigation.navigate("Single Plant", {
                  plant: plant,
                });
              }}
            >
              <CollectedListCard plant={plant} />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollView: {},
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    margin: 10,
  },
  background: {
    flexGrow: 1,
  },
  backgroundImage: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  query_container: {
    zIndex: 2000,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  query_button_container: {
    zIndex: 2000,
    flex: 1,
    margin: 1,
  },

  reset_button: {
    zIndex: 2000,
    flex: 1,
    backgroundColor: "#006400",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button_text: {
    color: "white",
    fontWeight: "bold",
  },
  dropDownContainerStyle: {
    backgroundColor: "green",
  },
  listItemLabelStyle: {
    color: "white",
  },
  icon_button: {
    padding: 15,
    width: 60,
    alignItems: "center",
    backgroundColor: "#006400",
    borderRadius: 10,
  },
});
const pickerSelectStyles = {
  inputIOS: {
    zIndex: 2000,
    flex: 1,
    backgroundColor: "#006400",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 0,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#006400",
  },
  inputAndroid: {
    zIndex: 2000,
    flex: 1,
    backgroundColor: "#006400",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 0,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#006400",
  },
  placeholder: {
    color: "white",
    fontWeight: "bold",
  },
};
