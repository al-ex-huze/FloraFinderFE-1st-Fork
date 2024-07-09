import * as React from "react";
import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faLeaf } from "@fortawesome/free-solid-svg-icons";

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
import ProfilePage from "../ProfilePage";
import UserCard from "../UserCard";

import { UserContext } from "../../contexts/Contexts";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function TabNavigator() {
  const { user } = useContext(UserContext);

  if (user.username) {
    return (
      
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarActiveTintColor: "green" }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => <FontAwesomeIcon icon={faHome} color={"green"} />,
          }}
        />
        <Tab.Screen
          name="CollectedListTab"
          component={CollectedListStack}
          options={{
            tabBarLabel: "Collection",
            tabBarIcon: () => <FontAwesomeIcon icon={faLeaf} color={"green"} />,
          }}
        />
      </Tab.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="LoginRegister">
        <Stack.Screen name="LoginRegister" component={LoginRegister} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  }
}

const HomeStack = () => (
  <Stack.Navigator initialRouteName="HomePage">
    <Stack.Screen name="HomePage" component={HomePage} />
    <Stack.Screen name="CollectedList" component={CollectedList} />
    <Stack.Screen name="CollectedMap" component={CollectedMap} />
    <Stack.Screen name="CollectNow" component={CollectNow} />
    <Stack.Screen name="LeagueTable" component={LeagueTable} />
    <Stack.Screen name="PlantResult" component={PlantResult} />
    <Stack.Screen name="CollectedSingleCard" component={CollectedSingleCard} />
    <Stack.Screen name="UserCard" component={UserCard} />
    <Stack.Screen name="ProfilePage" component={ProfilePage} />
  </Stack.Navigator>
);

const CollectedListStack = () => (
  <Stack.Navigator initialRouteName="CollectedList">
    <Stack.Screen name="CollectedList" component={CollectedList} />
    <Stack.Screen name="CollectedMap" component={CollectedMap} />
    <Stack.Screen name="CollectNow" component={CollectNow} />
    <Stack.Screen name="LeagueTable" component={LeagueTable} />
    <Stack.Screen name="HomePage" component={HomePage} />
    <Stack.Screen name="PlantResult" component={PlantResult} />
    <Stack.Screen name="UserCard" component={UserCard} />
    <Stack.Screen name="CollectedSingleCard" component={CollectedSingleCard} />
    <Stack.Screen name="ProfilePage" component={ProfilePage} />
  </Stack.Navigator>
);
