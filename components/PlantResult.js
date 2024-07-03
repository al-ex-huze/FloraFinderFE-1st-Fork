import * as React from 'react'
import { View, Text, StyleSheet, Button } from "react-native";



export default function PlantResult({route, navigation}) {

    const {plant} = route.params

return(

<View style={styles.container}>
            <Text style={styles.text}>Common Name: {plant.species.commonNames[0]}</Text>
            <Text style={styles.text}>Scientific Name: {plant.species.scientificNameWithoutAuthor}</Text>
            <Text style={styles.text}>Match Score: {plant.score}</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
</View>

)
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "black",
        margin: 2,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
    idContainer: {
        flex: 1,
        alignItems: "center",
    },
    idText: {
        fontSize: 32,
        fontWeight: "bold",
    },
});