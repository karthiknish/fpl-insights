import { StatusBar as ExpoBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Splash from "./components/Splash";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fixtures from "./components/Fixtures";
import Stats from "./components/Stats";
import { ThemeContext } from "./theme-context";
import { AsyncStorage, StatusBar } from "react-native";
import Favorites from "./components/Favorites";
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
export default function App() {
  const [theme, setTheme] = useState("light");
  const [fav, setFav] = useState("");
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };
  const retrieveData = async () => {
    const value = await AsyncStorage.getItem("Fav");
    setFav(value);
  };
  useEffect(() => {
    retrieveData();
  }, []);
  const FixtureTab = () => {
    return (
      <TopTab.Navigator
        tabBarOptions={{
          style: {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        }}
      >
        <TopTab.Screen name="Fixtures" component={Fixtures} />
        <TopTab.Screen name="Favorites" component={Favorites} />
      </TopTab.Navigator>
    );
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {fav === null ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splash" component={Splash} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "Home") {
                    iconName = focused ? "ios-home" : "ios-home-outline";
                  } else if (route.name === "Settings") {
                    iconName = focused
                      ? "ios-settings"
                      : "ios-settings-outline";
                  } else if (route.name === "Fixtures") {
                    iconName = focused
                      ? "ios-football"
                      : "ios-football-outline";
                  } else if (route.name === "Stats") {
                    iconName = focused
                      ? "ios-stats-chart"
                      : "ios-stats-chart-outline";
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: "#00F783",
                inactiveTintColor: "gray",
              }}
            >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Fixtures" component={FixtureTab} />
              <Tab.Screen name="Stats" component={Stats} />
              <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
        <ExpoBar style="auto" />
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
}
