import React, { useState, useEffect } from "react";

import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  AsyncStorage,
} from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";
import teams from "../intro.json";
function Splash() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(teams);
  }, []);
  const handleFav = async (id) => {
    try {
      await AsyncStorage.setItem("Fav", id.toString());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.head} category="h5">
        Select Favorite team
      </Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {data.map((d) => (
          <Button
            onPress={() => handleFav(d.id)}
            key={d.id}
            style={styles.button}
            size="giant"
            appearance="ghost"
          >
            <View style={styles.loop}>
              <Image
                resizeMode="contain"
                style={styles.logo}
                source={{ uri: d.img }}
              />
              <Text category="h6">{d.name}</Text>
            </View>
          </Button>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00FF87",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  head: {
    marginTop: 50,
  },
  button: {
    marginVertical: 5,
    justifyContent: "flex-start",
  },
  scroll: {
    paddingVertical: 20,
    marginTop: 10,
  },
  loop: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
export default Splash;
