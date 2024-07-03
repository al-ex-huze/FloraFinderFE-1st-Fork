import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'
import LoginRegister from './components/LoginRegister';
import Login from "./components/Login";
import Register from "./components/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProvider from "./contexts/Contexts"
import CollectedList from './components/collection-list/CollectedList';
import CollectedSingleCard from './components/collection-list/CollectedSingleCard';
import CollectedMap from './components/CollectedMap';
import CollectNow from './components/CollectNow';
import LeagueTable from './components/LeagueTable';
import HomePage from './components/HomePage';
import PlantResult from './components/PlantResult';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginRegister">
                <Stack.Screen name="LoginRegister" component={LoginRegister} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Collected List" component={CollectedList} />
                <Stack.Screen name="CollectedMap" component={CollectedMap} />
                <Stack.Screen name="CollectNow" component={CollectNow} />
                <Stack.Screen name="LeagueTable" component={LeagueTable} />
                <Stack.Screen name="HomePage" component={HomePage} />
                <Stack.Screen name="PlantResult" component={PlantResult} />
                <Stack.Screen name="CollectedSingleCard" component={CollectedSingleCard} />
            </ Stack.Navigator>
    </ NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccffcc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
