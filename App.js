import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./app/HomeScreen";
import CreateGoalScreen from "./app/CreateGoalScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetailsScreen from "./app/GoalDetailsScreen";
import ProgressScreen from "./app/ProgressScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RegisterScreen from "./app/RegisterScreen";
import LoginScreen from "./app/LoginScreen";
import { useState } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();

  // let loginVal
  const [loginVal, setLoginval] = useState("");

  //storeData();

  const getData = async () => {
    try {
      const val = await AsyncStorage.getItem("my-key");

      setLoginval(val);
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

  let removeValue = async () => {
    try {
      await AsyncStorage.removeItem("my-key");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  //removeValue();

  // console.log(loginVal);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loginVal !== null ? (
          <Stack.Screen
            name="Home"
            options={{
              title: "",
            }}
            component={HomeScreen}
          />
        ) : (
          <Stack.Screen
            name="Login"
            options={{
              title: "",
            }}
            component={LoginScreen}
          />
        )}
        <Stack.Screen name="CreateGoal" component={CreateGoalScreen} />
        <Stack.Screen name="GoalDetails" component={GoalDetailsScreen} />
        <Stack.Screen name="ProgressScreen" component={ProgressScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
