import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Pressable,
    ActivityIndicator,
} from "react-native";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/Contexts";

import CollectedListCard from "./CollectedListCard";

import { getCollectedPlantsList } from "../../api";

export default function CollectedList({ navigation }) {
    const { user, setUser } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [plantsArr, setPlantsArr] = useState([]);

    const username = user.username;

    useEffect(() => {
        console.log("USE EFFECT in COLLECTED LIST");
        setIsLoading(true);
        getCollectedPlantsList(username).then((usersPlants) => {
            setPlantsArr(usersPlants);
            setIsLoading(false);
        });
    }, []);

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
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
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
    );
}

const styles = StyleSheet.create({
    scrollView: {},
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CCFFCC",
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
});
