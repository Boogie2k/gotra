import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const Nav = ({ exceededGoal }) => {
  console.log(exceededGoal);

  const notif = () => {
    alert(
      `${exceededGoal.length} Goals is past their end date and not completed `
    );
  };
  return (
    <View style={styles.navContainer}>
      <Text style={styles.head}>GOTra</Text>

      <View style={styles.noti}>
        <AntDesign name="search1" size={24} color="white" />
        <Pressable onPress={notif} style={{ position: "relative" }}>
          <AntDesign name="bells" size={24} color="white" />
          <Text
            style={{
              color: "white",
              position: "absolute",
              bottom: 10,
              backgroundColor: "blue",
              borderRadius: 25,
              right: 0,
              fontSize: 16,
              fontWeight: 400,
              width: 20,
              height: 20,
            }}
          >
            {exceededGoal && exceededGoal.length}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({
  navContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
  },
  head: {
    fontWeight: 600,
    fontSize: 28.6356,

    /* identical to box height */

    color: "white",
  },
  noti: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 70,
  },
});
