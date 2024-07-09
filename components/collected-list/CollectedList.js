import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/Contexts";
import DropDownPicker from "react-native-dropdown-picker";
import CollectedListCard from "./CollectedListCard";

import { getCollectedPlantsList } from "../../api";
const backgroundLeaf = require("../../assets/backgroundtest.jpg");

export default function CollectedList({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [plantsArr, setPlantsArr] = useState([]);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [originalPlants, setOriginalPlants] = useState([])

  const username = user.username;

  useEffect(() => {
    
    setIsLoading(true);
    getCollectedPlantsList(username).then((usersPlants) => {
      setItems(() => {
        const plantFamily = usersPlants.map((plant) => {
          {
            return plant.speciesFamily
          }
        });
        let uniqueItems = plantFamily.filter((plantFam, index) => plantFamily.indexOf(plantFam) === index)
        

        let noDuplicates = uniqueItems.map((plantFamily) => {
            {
                return { label: plantFamily, value: plantFamily }
            }
        })
    

        return noDuplicates
      });
      setPlantsArr(usersPlants);
      setOriginalPlants(usersPlants)
      setIsLoading(false);
    });
  }, []);




  const sortByRecency = () => {
    let newPlants = [...plantsArr];

    newPlants.sort((a, b) => {
      const aDate = new Date(a.dateCollected);
      const bDate = new Date(b.dateCollected);
      return bDate - aDate;
    });

    setPlantsArr(newPlants);
  };

  const sortByRating = () => {
    let newPlants = [...plantsArr];

    newPlants.sort((a, b) => {
      return b.matchScore - a.matchScore;
    });

    setPlantsArr(newPlants);
  };

  const sortByPlantName = () => {
    let newPlants = [...plantsArr];

    newPlants.sort((a, b) => a.speciesName.localeCompare(b.speciesName));

    setPlantsArr(newPlants);
  };

  const filterByFamily = (item) => {

    const val = item[0].value

    let newPlants = [...plantsArr];

    const filteredPlants = newPlants.filter((plant) => 
      plant.speciesFamily === val
    );

    setPlantsArr(filteredPlants);
    setValue(filteredPlants)
   
  };

  const handleReset = () => {
    
    setPlantsArr(originalPlants)
  }

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
      resizeMode="repeat" // or "cover"
    >
      <View style={styles.overlay}></View>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Pressable
            style={styles.button}
            title="Sort By Recency"
            onPress={sortByRecency}
          >
            <Text style={styles.buttonText}>Sort by Recency</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            title="Sort By Rating"
            onPress={sortByRating}
          >
            <Text style={styles.buttonText}>Sort by Score</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            title="Sort by Plant Name"
            onPress={sortByPlantName}
          >
            <Text style={styles.buttonText}>Sort by Plant Species Name A-Z</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            title="Reset"
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
          
            <DropDownPicker style ={styles.dropdown}
              open={open}
              listMode="SCROLLVIEW"
              placeholder="Filter by Plant Family"
              placeholderStyle={{
                color: "white",
                fontWeight: "bold"
              }}
              multipleText={'Filter By Plant Family'}
              showTickIcon={true}
              value={value}
              multiple={true}
              min={0}
              max={50}
              items={items}
              closeAfterSelecting={true}
              onSelectItem={(item) => {
                
                filterByFamily(item)
                setOpen(false)
              }}
              setOpen={setOpen}
            />
          
          {plantsArr.map((plant, index) => (
            <Pressable
              key={index}
              style={styles.card}
              title="CollectedSingleCard"
              onPress={() => {
                navigation.navigate("CollectedSingleCard", {
                  plant: plant,
                });
              }}
            >
              <CollectedListCard plant={plant} />
            </Pressable>
          ))}

          <Pressable
            style={styles.button}
            title="Home Page"
            onPress={() => navigation.navigate("HomePage")}
          >
            <Text style={styles.buttonText}>Back To Home</Text>
          </Pressable>
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
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
  dropdown:{
    backgroundColor: "#006400",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
   buttonText: {
    color: "white",
  },
});
