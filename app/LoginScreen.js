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
import { jwtDecode } from "jwt-decode";
import { decode as atob, encode as btoa } from "base-64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

const LoginScreen = ({ navigation, isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(isLoggedIn);
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

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("my-key", value);
    } catch (e) {
      // saving error
    }
  };

  if (!global.btoa) {
    global.btoa = btoa;
  }
  if (!global.atob) {
    global.atob = atob;
  }

  const loginFunc = () => {
    if (!email || !password) {
      alert("credentials can not be empty");
    } else {
      fetch("https://gotra-api-inh9.onrender.com/api/v1/login/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
            console.log("errrrd");
          }
          return res.json();
        })
        .then((data) => {
          // console.log(data);

          if (data.token) {
            // console.log(data.token);
            let user = jwtDecode(data.token);

            AsyncStorage.setItem("my-key", data.token);
            setIsLoggedIn(!isLoggedIn);
            //user && console.log(user);
            // console.log(user);
          }
          // navigation.navigate("Home", { name: "HomePge" });
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
          alert(err);
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <LoginScreenNav />
      <View>
        <Text style={styles.login}>Login</Text>
        <Text
          style={{
            marginLeft: 20,
            marginTop: 15,
            fontWeight: 400,
            fontSize: 20,
          }}
        >
          Please sign in to continue
        </Text>
        <View style={styles.form}>
          <Text style={styles.titles}>Your Email</Text>
          <TextInput
            value={email}
            onChangeText={(newText) => {
              setEmail(newText);
            }}
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

        <TouchableHighlight onPress={loginFunc} style={styles.loginBtn}>
          <Text style={{ color: "white", fontWeight: 500, fontSize: 20 }}>
            Login
          </Text>
        </TouchableHighlight>

        <View style={styles.confirm}>
          <Text style={{ color: "white" }}>Don't Have an account? </Text>
          <Text
            onPress={() =>
              navigation.navigate("Register", { name: "Register" })
            }
            style={{ color: "white", textDecorationLine: "underline" }}
          >
            Sign Up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const LoginScreenNav = () => {
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
    marginTop: 40,
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
