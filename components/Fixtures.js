import React, { useEffect, useState } from "react";
import { format, compareAsc } from "date-fns";

import {
  StyleSheet,
  View,
  AsyncStorage,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";

import axios from "axios";

function Fixtures() {
  const [data, setData] = useState([]);
  axios.defaults.headers.common["User-Agent"] = "PostmanRuntime/7.26.2";
  const loadData = async () => {
    await axios
      .get("https://fantasy.premierleague.com/api/fixtures/")
      .then((r) => setData(r.data));
  };
  useEffect(() => {
    loadData();
  }, []);
  const teamname = (id) => {
    if (id === 1) {
      return "https://i.imgur.com/7JTTeAc.png";
    } else if (id === 2) {
      return "https://i.imgur.com/kFv99aK.png";
    } else if (id === 3) {
      return "https://i.imgur.com/YDFmxCY.png";
    } else if (id === 4) {
      return "https://i.imgur.com/46l7M2z.png";
    } else if (id === 5) {
      return "https://i.imgur.com/YOQV8hQ.png";
    } else if (id === 6) {
      return "https://i.imgur.com/Q0XUMA4.png";
    } else if (id === 7) {
      return "https://i.imgur.com/GYVPrX3.png";
    } else if (id === 8) {
      return "https://i.imgur.com/kDEYfo6.png";
    } else if (id === 9) {
      return "https://i.imgur.com/MZkunzB.png";
    } else if (id === 10) {
      return "https://i.imgur.com/xIS2TI3.png";
    } else if (id === 11) {
      return "https://i.imgur.com/Hk4Q6hh.png";
    } else if (id === 12) {
      return "https://i.imgur.com/YCWdMxs.png";
    } else if (id === 13) {
      return "https://i.imgur.com/ETNKb1b.png";
    } else if (id === 14) {
      return "https://i.imgur.com/KjYvMjw.png";
    } else if (id === 15) {
      return "https://i.imgur.com/PiDJnEY.png";
    } else if (id === 16) {
      return "https://i.imgur.com/sDfO4VV.png";
    } else if (id === 17) {
      return "https://i.imgur.com/7Ofl2w5.png";
    } else if (id === 18) {
      return "https://i.imgur.com/AtcTcih.png";
    } else if (id === 19) {
      return "https://i.imgur.com/M5966ET.png";
    } else if (id === 20) {
      return "https://i.imgur.com/0fJF6Cx.png";
    }
    return;
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {data.map((d, i) => (
          <View key={d.code}>
            {data[i]?.kickoff_time !== data[i + 1]?.kickoff_time && (
              <Text style={styles.dateText}>
                {format(new Date(d.kickoff_time), "iii dd MMM")}
              </Text>
            )}
            <Button style={styles.button}>
              <View style={styles.btnview}>
                <Image
                  style={styles.logo}
                  resizeMode="contain"
                  source={{ uri: `${teamname(d.team_h)}` }}
                />
                {d.team_a_score === null && d.team_h_score === null && (
                  <Text>{format(new Date(d.kickoff_time), "h m a")}</Text>
                )}
                <Image
                  style={styles.logo}
                  resizeMode="contain"
                  source={{ uri: `${teamname(d.team_a)}` }}
                />
              </View>
            </Button>
          </View>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scroll: {
    // flex: 1,
  },
  button: {
    marginVertical: 5,
  },
  dateText: { textAlign: "center" },
  btnview: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
  },
  logo: {
    width: 50,
    height: 50,
    // marginRight: 10,
  },
});
export default Fixtures;
