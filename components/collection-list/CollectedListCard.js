import { Pressable, StyleSheet, View, Text, Image } from "react-native";

import * as React from "react";
import { timeAgo } from "../../utils/timeAgo";

export default function CollectedListCard({ plant }) {
    return (
        <View style={styles.container}>
            <View style={styles.card_template}>
                <Image
                    style={styles.card_image}
                    source={{ uri: plant.image }}
                />
                <View style={styles.text_container_1}>
                    <Text style={styles.text_1}>{plant.speciesName}</Text>
                </View>
                <View style={styles.text_container_2}>
                    <Text style={styles.text_2}>
                        {timeAgo(plant.dateCollected)}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card_template: {
        width: "100%",
        height: 256,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    },
    card_image: {
        width: "100%",
        height: 256,
        borderRadius: 10,
    },
    text_container_1: {
        position: "absolute",
        width: "100%",
        height: 32,
        padding: 4,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    text_container_2: {
        position: "absolute",
        width: "100%",
        height: 32,
        bottom: 0,
        padding: 4,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "flex-end",
    },
    card_title: {
        color: "white",
    },
    text_1: {
        fontSize: 22,
        lineHeight: 24,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    text_2: {
        fontSize: 16,
        lineHeight: 18,
        letterSpacing: 0.25,
        color: "white",
    },
});
