import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = ({ navigation }) => {
  let loginVal;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerFunc = () => {
    fetch("https://gotra-api-inh9.onrender.com/api/v1/register/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigation.navigate("Login", { name: "Login" });
      })
      .catch((err) => console.log(err));
  };

  const getData = async () => {
    try {
      loginVal = await AsyncStorage.getItem("my-key");
      if (loginVal !== null) {
        // value previously stored
        console.log(loginVal);
      } else {
        console.log("emp");
      }
    } catch (e) {
      // error reading value
      console.log("err");
    }
  };

  getData();
  return (
    <SafeAreaView style={styles.container}>
      <RegisterScreenNav />
      <View>
        {/*   <TouchableHighlight
          onPress={() => {
            navigation.goBack();
          }}
        >
           <Image source={require("./assets/chevron-left.png")} />
        </TouchableHighlight> */}
        <Text style={styles.login}>Create my Account</Text>

        <View style={styles.form}>
          <Text style={styles.titles}>Username</Text>
          <TextInput
            value={username}
            onChangeText={(newText) => {
              setUsername(newText);
            }}
            style={styles.inputs}
            placeholder="Username"
          />
          <Text style={styles.titles}>Your Email</Text>
          <TextInput
            value={email}
            onChangeText={(newText) => setEmail(newText)}
            style={styles.inputs}
            placeholder="enter your email"
          />
          <Text style={styles.titles}>password</Text>
          <TextInput
            value={password}
            onChangeText={(newText) => {
              setPassword(newText);
            }}
            style={styles.inputs}
            placeholder="enter your Password"
          />
        </View>

        <TouchableHighlight onPress={registerFunc} style={styles.loginBtn}>
          <Text style={{ color: "white", fontWeight: 500, fontSize: 20 }}>
            Create my Account
          </Text>
        </TouchableHighlight>

        <View style={styles.confirm}>
          <Text style={{ color: "white" }}>Already Have an account? </Text>
          <Text
            onPress={() => {
              navigation.navigate("Login", { name: "Login" });
            }}
            style={{
              color: "#fff",
              textDecorationLine: "underline",
            }}
          >
            Login
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const RegisterScreenNav = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontWeight: 600,
          fontSize: 28.6356,

          /* identical to box height */

          color: "white",
        }}
      >
        GOTra
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  login: {
    fontSize: 32,
    fontWeight: 600,
    color: "#fff",
    marginLeft: 20,
    marginTop: 15,
  },
  form: {
    marginLeft: 20,
    marginTop: 20,
  },
  titles: { fontWeight: 500, fontSize: 20, color: "#fff", marginTop: 5 },
  inputs: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#fff",
    width: 330,
    height: 48,
    borderRadius: 100,
    marginTop: 15,
    color: "#fff",
    paddingLeft: 20,
  },
  loginBtn: {
    backgroundColor: "#1E1E1E",
    width: 330,
    height: 47,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
    fontSize: 16,
    fontWeight: 500,
    marginTop: 70,
    marginLeft: 20,
  },
  confirm: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 2,
  },
  sm: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
