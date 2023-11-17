import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";

const Progress = ({ progressProps, navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.head}>Your goal's Progress</Text>
        <AntDesign
          onPress={() => navigation.navigate("ProgressScreen")}
          name="rightsquare"
          size={24}
          color="white"
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={[styles.num]}>{progressProps.not_startedNum}</Text>
          <Text style={styles.status}>Not Started</Text>
        </View>
        <View>
          <Text style={[styles.num]}>{progressProps.completedNum}</Text>
          <Text style={styles.status}>Completed</Text>
        </View>
        <View>
          <Text style={styles.num}>{progressProps.inProgressNum}</Text>
          <Text style={styles.status}>In Progress</Text>
        </View>
      </View>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 2,
    paddingLeft: 15,
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 21,
    minHeight: 140,
    width: 350,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingEnd: 15,
  },
  head: {
    fontWeight: 600,
    fontSize: 18.5243,
    lineHeight: 28,
    /* identical to box height */

    color: "#FFFFFF",
  },

  num: {
    fontWeight: 600,
    fontSize: 38.8746,
    lineHeight: 58,

    color: "#FFFFFF",
    marginLeft: 27,
  },

  status: {
    fontWeight: 400,
    fontSize: 15.9777,
    lineHeight: 24,
    /* identical to box height */

    color: "rgba(255, 255, 255, 0.75)",
  },
});
