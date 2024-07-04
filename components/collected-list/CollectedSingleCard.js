import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
} from "react-native";

import { formatDate } from "../../utils/formatDate";

export default function CollectedSingleCard({ route }) {
    const { plant } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.card_template}>
                    <Image
                        style={styles.card_image}
                        source={{ uri: plant.image }}
                    />
                    <View style={styles.text_container_1}>
                        <Text style={styles.text_1}>{plant.speciesName}</Text>
                    </View>
                    <View style={styles.text_container_2}>
                        <Text
                            style={
                                plant.matchScore > 0.5
                                    ? styles.scoreTextGood
                                    : styles.scoreTextBad
                            }
                        >
                            {(plant.matchScore * 100).toFixed(2)}%
                        </Text>
                        <Text style={styles.text_2}>
                            Member of the {plant.speciesFamily} Family
                        </Text>
                        <Text style={styles.text_2}>
                            Collected on {formatDate(plant.dateCollected)}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#CCFFCC",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        marginHorizontal: 10,
    },
    card_template: {
        width: "100%",
        height: "100%",
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    },
    card_image: {
        width: "100%",
        aspectRatio: 75 / 100,
        borderRadius: 10,
    },
    text_container_1: {
        position: "absolute",
        width: "100%",
        height: "10%",
        padding: 4,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    text_container_2: {
        flexDirection: "column",
        position: "absolute",
        width: "100%",
        height: "20%",
        bottom: 0,
        padding: 4,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "flex-end",
    },
    text_1: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
    },
    text_2: {
        fontSize: 16,
        color: "white",
        flex: 1 / 2,
    },
    scoreTextGood: {
        fontSize: 32,
        fontWeight: "bold",
        color: "green",
        flex: 1,
    },
    scoreTextBad: {
        fontSize: 32,
        fontWeight: "bold",
        color: "red",
        flex: 1,
    },
});
