import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

import { formatDate } from "../../utils/formatDate";

export default function CollectedSingleCard({ route }) {
    const { plant } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.cardContainer}>
                    <Text style={styles.nameText}>{plant.speciesName}</Text>
                    <Image style={styles.image} source={{ uri: plant.image }} />
                    <Text style={styles.titleText}>Member of the</Text>
                    <Text style={styles.text}>{plant.speciesFamily}</Text>
                    <Text style={styles.titleText}>Family</Text>
                    <Text style={plant.matchScore > 0.5 ? styles.scoreTextGood : styles.scoreTextBad}>{(plant.matchScore * 100).toFixed(2)}%</Text>
                    <Text style={styles.text}>Collected on {formatDate(plant.dateCollected)}</Text>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 16,
        width: 256,
        height: 256,
    },
    container: {
        flex: 1,
        backgroundColor: "#CCFFCC",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        marginHorizontal: 10,
    },
    cardContainer: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: "#006400",
        alignItems: "center",
        justifyContent: "center",
    },
    titleText: {
        fontSize: 32,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    nameText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white",
    },
    text: {
        fontSize: 24,
        letterSpacing: 0.25,
        color: "white",
    },
    scoreTextGood: {
        fontSize: 40,
        fontWeight: "bold",
        color: "green",
    },
    scoreTextBad: {
        fontSize: 40,
        fontWeight: "bold",
        color: "red",
    },
});
