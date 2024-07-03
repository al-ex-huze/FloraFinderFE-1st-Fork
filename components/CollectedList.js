import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";


export default function CollectedList({navigation}) {
return(
    <View style={styles.container}>
    <ScrollView>
        <Text style={styles.heading}> Your Collected List</Text>
        {/* <Pressable style={styles.button} title="Home Page" onPress={() => navigation.navigate("HomePage")}><Text style={styles.buttonText}>Back To Home</Text></Pressable> */}

    </ScrollView>
    </View>
)
}

const styles = StyleSheet.create({

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