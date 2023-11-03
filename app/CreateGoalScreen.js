import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { Platform } from "react-native";
import { StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CreateGoalScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GoalScreenNav />

      <ScrollView>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.name}>Name your goal</Text>
          <TextInput style={styles.nameInput} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateGoalScreen;

const GoalScreenNav = () => {
  return (
    <View style={styles.nav}>
      <AntDesign name="left" size={24} color="white" />
      <Text style={styles.navText}>Create a new goal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingLeft: 9,

    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  nav: {
    flexDirection: "row",
  },
  navText: {
    color: "white",
    alignItems: "center",
    fontWeight: 600,
    fontSize: 19,
    marginLeft: 90,
    textTransform: "capitalize",
  },
  name: {
    color: "white",
    fontWeight: 600,
    fontSize: 22,
  },
  nameInput: {
    backgroundColor: "#2A2A2A",
    width: 332,
    minHeight: 57,
    color: "white",
    borderRadius: 20,
  },
});
