import * as React from 'react'
import { View, Text, StyleSheet, Button, Image, Pressable, TouchableOpacity } from "react-native";

export default function PlantResult({route, navigation}) {
   const {plant}=route.params
return(

<View style={styles.container}>
    <Text style={styles.heading}>You found a {plant.species.commonNames[0]}!</Text>
    <Pressable style={styles.resultCard} title="Result Card">
            <View style={styles.resultContainer}>
                <Text style={styles.label}>Plant Family: </Text>
                <Text style={styles.value}>{plant.species.family.scientificNameWithoutAuthor}</Text>
            </View>

            <View style={styles.resultContainer}>
                <Text style={styles.label}>Scientific Name: </Text>
                <Text style={styles.value}>{plant.species.scientificNameWithoutAuthor}</Text>
            </View>

            <View style={styles.resultContainer}>
                 <Text style={styles.label}>Your Match Score: </Text>
                 <Text style={styles.value}>{plant.score}</Text>
            </View>
    </Pressable>

            <Image style={styles.image} source={{uri:plant.images[0].url.m}} />
            
            <Pressable style={styles.button} title="Go Back" onPress={() => navigation.goBack()}><Text style={styles.buttonText}>Find Another Plant</Text></Pressable>
            <TouchableOpacity
                    style={styles.button}
                    // onPress={savePlantToList} too be added later
                >
                    <Text style={styles.buttonText}> Save To Collection </Text>
                </TouchableOpacity>
                <Pressable style={styles.button} title="Home Page" onPress={() => navigation.navigate("HomePage")}><Text style={styles.buttonText}>Back To Home</Text></Pressable>
            
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
        backgroundColor: "#006400",
        margin: 10,
        
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
    image: {
        borderRadius: 150/2,
        width: 128,
        height: 128,
        paddingVertical: 12,
    },
    container: {
        flex: 1, // makes sure the colour takes up the whole screen
        backgroundColor: "#CCFFCC", // Kate colour change
        alignItems: "center", // horizontal alex
        justifyContent: "center", // vertical alex
    },
    buttonText : {
        color: "white"
    },
    resultContainer : {
        flexDirection: "row",
        
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
        
    },
    value: {
        fontSize: 20,
    },
    resultCard: {
        backgroundColor: "white",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        margin: 12,
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#006400",
    
     },
});