import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import React, { useState } from "react";

const AccountScreen = ({
  navigation,
  isLoggedout,
  setIsLoggedOut,
  removeValue,
}) => {
  //  const [isLoggedout, setIsLoggedOut] = useState(false);
  let logOut = async () => {
    try {
      await AsyncStorage.removeItem("my-key");
    } catch (e) {
      // remove error
    }
    navigation.goBack();
    removeValue();
    setIsLoggedOut(!isLoggedout);

    console.log("Done.");
  };

  //removeValue();
  return (
    <View style={styles.container}>
      <Text onPress={logOut} style={{ color: "white" }}>
        Logout!{" "}
      </Text>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
