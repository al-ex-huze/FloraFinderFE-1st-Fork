import * as React from "react";

import LoginRegister from "../LoginRegister";
import Login from "../Login";
import Register from "../Register";
import CollectedList from "../collected-list/CollectedList";
import CollectedSingleCard from "../collected-list/CollectedSingleCard";
import CollectedMap from "../CollectedMap";
import CollectNow from "../CollectNow";
import LeagueTable from "../LeagueTable";
import HomePage from "../HomePage";
import PlantResult from "../PlantResult";

import { UserContext } from "../../contexts/Contexts";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faHome,
    faLeaf,
} from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// nav bar needs to have a tab.screen per tab and then all the stack.screens in each

export function TabNavigator() {
    const { user } = useContext(UserContext);

    if (user.username) { // if user is logged in show the tab navigator 
        return (
            <Tab.Navigator
                screenOptions={{ headerShown: false, tabBarActiveTintColor: 'green' }}
            >
                <Tab.Screen
                    name="HomeTab"
                    component={HomeStack}
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: () => {
                            return (
                                <FontAwesomeIcon
                                    icon={faHome}
                                    color={"green"}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="CollectedListTab"
                    component={CollectedListStack}
                    options={{
                        tabBarLabel: "Collection",
                        tabBarIcon: () => {
                            return (
                                <FontAwesomeIcon
                                    icon={faLeaf}
                                    color={"green"}
                                />
                            );
                        },
                    }}
                />
            </Tab.Navigator>
        );
    } else if (!user.username) {
        // if not logged in only show login stack
        return (
            <Stack.Navigator initialRouteName="LoginRegister">
                <Stack.Screen name="LoginRegister" component={LoginRegister} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        );
    }
}

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen name="LoginRegister" component={LoginRegister} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="CollectedList" component={CollectedList} />
            <Stack.Screen name="CollectedMap" component={CollectedMap} />
            <Stack.Screen name="CollectNow" component={CollectNow} />
            <Stack.Screen name="LeagueTable" component={LeagueTable} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="PlantResult" component={PlantResult} />
            <Stack.Screen
                name="CollectedSingleCard"
                component={CollectedSingleCard}
            />
        </Stack.Navigator>
    );
};

const CollectedListStack = () => {
    return (
        <Stack.Navigator initialRouteName="CollectedList">
            <Stack.Screen name="LoginRegister" component={LoginRegister} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="CollectedList" component={CollectedList} />
            <Stack.Screen name="CollectedMap" component={CollectedMap} />
            <Stack.Screen name="CollectNow" component={CollectNow} />
            <Stack.Screen name="LeagueTable" component={LeagueTable} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="PlantResult" component={PlantResult} />
            <Stack.Screen
                name="CollectedSingleCard"
                component={CollectedSingleCard}
            />
        </Stack.Navigator>
    );
};
