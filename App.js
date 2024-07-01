import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'
import LoginRegister from './components/LoginRegister';
import Login from "./components/Login";
import Register from "./components/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginRegister">
                <Stack.Screen name="LoginRegister" component={LoginRegister} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </ Stack.Navigator>
    </ NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF00FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
