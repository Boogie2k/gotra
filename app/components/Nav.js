import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const Nav = ({ refetch }) => {
  const relodFunc = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.navContainer}>
      <Text style={styles.head}>GOTra</Text>

      <View style={styles.noti}>
        <AntDesign
          name="search1"
          size={24}
          color="white"
          onPress={() => {
            refetch();
          }}
        />
        <AntDesign name="bells" size={24} color="white" />
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
