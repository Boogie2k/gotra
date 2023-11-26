import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Modal,
  ActivityIndicator,
  Button,
} from "react-native";
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

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  //removeValue();
  return (
    <View style={styles.container}>
      <Text onPress={logOut} style={{ color: "white" }}>
        Logout!{" "}
      </Text>

      <View style={styles.container}>
        <Button title="Toggle Modal" onPress={toggleModal} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal>
      </View>
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});
