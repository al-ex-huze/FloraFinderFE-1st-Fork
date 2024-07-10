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
    const [openFilter, setOpenFilter] = useState(false);
    const [openSort, setOpenSort] = useState(false);
    const [valueFilter, setValueFilter] = useState([]);
    const [valueSort, setValueSort] = useState([]);
    const [originalPlants, setOriginalPlants] = useState([]);
    const [itemsSort, setItemsSort] = useState([
        { label: "Score", value: "Score" },
        { label: "Date", value: "Date" },
        { label: "Name", value: "Name" },
    ]);
    const username = user.username;

    useEffect(() => {
        setIsLoading(true);
        getCollectedPlantsList(username).then((usersPlants) => {
            setItems(() => {
                const plantFamily = usersPlants.map((plant) => {
                    {
                        return plant.speciesFamily;
                    }
                });
                let uniqueItems = plantFamily.filter(
                    (plantFam, index) => plantFamily.indexOf(plantFam) === index
                );

                let noDuplicates = uniqueItems.map((plantFamily) => {
                    {
                        return { label: plantFamily, value: plantFamily };
                    }
                });

                return noDuplicates;
            });
            setPlantsArr(usersPlants);
            setOriginalPlants(usersPlants);
            setIsLoading(false);
        });
    }, []);

    const sortBy = (item) => {
        console.log(item);
        let newPlants = [...plantsArr];
        const val = item[0].value;

        if (val === "Date") {
            newPlants.sort((a, b) => {
                const aDate = new Date(a.dateCollected);
                const bDate = new Date(b.dateCollected);
                return bDate - aDate;
            });

            setPlantsArr(newPlants);
            setValueSort(newPlants);
        }
        if (val === "Score") {
            newPlants.sort((a, b) => {
                return b.matchScore - a.matchScore;
            });

            setPlantsArr(newPlants);
            setValueSort(newPlants);
        } else if (val === "Name") {
            newPlants.sort((a, b) =>
                a.speciesName.localeCompare(b.speciesName)
            );

            setPlantsArr(newPlants);
            setValueSort(newPlants);
        }
    };
    const filterByFamily = (item) => {
        const val = item[0].value;

        let newPlants = [...plantsArr];

        const filteredPlants = newPlants.filter(
            (plant) => plant.speciesFamily === val
        );

        setPlantsArr(filteredPlants);
        setValueFilter(filteredPlants);
    };

    const handleReset = () => {
        setPlantsArr(originalPlants);
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

                            <DropDownPicker
                                style={styles.dropdown}
                                open={openFilter}
                                dropDownContainerStyle={
                                    styles.dropDownContainerStyle
                                }
                                listMode="SCROLLVIEW"
                                placeholder="Filter"
                                placeholderStyle={{
                                    color: "white",
                                    fontWeight: "bold",
                                }}
                                multipleText={"Filter"}
                                showTickIcon={true}
                                value={valueFilter}
                                itemSeparator={true}
                                listItemLabelStyle={styles.listItemLabelStyle}
                                multiple={true}
                                min={0}
                                max={50}
                                items={items}
                                closeAfterSelecting={true}
                                onSelectItem={(item) => {
                                    filterByFamily(item);
                                    setOpenFilter(false);
                                }}
                                setOpen={setOpenFilter}
                            />
                        </View>

                        <View style={styles.query_button_container}>
                            <DropDownPicker
                                style={styles.dropdown}
                                dropDownContainerStyle={
                                    styles.dropDownContainerStyle
                                }
                                open={openSort}
                                listMode="SCROLLVIEW"
                                placeholder="Sort"
                                placeholderStyle={{
                                    color: "white",
                                    fontWeight: "bold",
                                }}
                                multipleText={"Sort"}
                                itemSeparator={true}
                                value={valueSort}
                                listItemLabelStyle={styles.listItemLabelStyle}
                                multiple={true}
                                min={0}
                                max={10}
                                items={itemsSort}
                                closeAfterSelecting={true}
                                onSelectItem={(item) => {
                                    sortBy(item);
                                    setOpenSort(false);
                                }}
                                setOpen={setOpenSort}
                            />
                        </View>

                        <View style={styles.query_button_container}>
                            <Pressable
                                style={styles.reset_button}
                                title="Reset"
                                onPress={handleReset}
                            >
                                <Text style={styles.button_text}>Reset</Text>
                            </Pressable>
                        </View>

                    </View>

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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
    },
    query_button_container: {
      flex: 1,
      margin: 1,
    },
    dropdown: {
        flex: 1,
        backgroundColor: "#006400",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 0,
    },
    reset_button: {
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
});
