import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { ThemeContext } from "../theme-context";
import { Button, Layout } from "@ui-kitten/components";

function Settings() {
  const themeContext = useContext(ThemeContext);
  const [fav, setFav] = useState("");
  const loadFav = async () => {
    try {
      const a = await AsyncStorage.getItem("Fav");
      setFav(a);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadFav();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button
          style={{ marginVertical: 4 }}
          onPress={themeContext.toggleTheme}
        >
          TOGGLE THEME
        </Button>
        <Text>{fav}</Text>
      </Layout>
    </View>
  );
}

export default Settings;
