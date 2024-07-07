import { StyleSheet, Text, View } from "react-native";
import * as React from "react";

import UserProvider from "./contexts/Contexts";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./components/navigators/TabNavigator";

export default function App() {
    // see /components/navigators
    return (
        <UserProvider>
            <NavigationContainer>
                <TabNavigator />
            </NavigationContainer>
        </UserProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ccffcc",
        alignItems: "center",
        justifyContent: "center",
    },
});
