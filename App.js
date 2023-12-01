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
import AccountScreen from "./app/AccountScreen";
import { useEffect, useState } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();

  // let loginVal
  const [loginVal, setLoginval] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedout, setIsLoggedOut] = useState(false);
  const [reloadHome, setReloadHome] = useState(false);

  const getData = async () => {
    try {
      const val = await AsyncStorage.getItem("my-key");

      setLoginval(val);
      if (loginVal !== null) {
        // value previously stored
        //  console.log(loginVal);
      } else {
        //console.log("emp");
      }
    } catch (e) {
      // error reading value
      //console.log("err");
    }
  };

  getData();

  let removeValue = async () => {
    try {
      await AsyncStorage.removeItem("my-key");
    } catch (e) {
      // remove error
    }

    // console.log("Done.");
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
          >
            {(props) => (
              <HomeScreen
                {...props}
                reloadHome={reloadHome}
                setReloadHome={setReloadHome}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                {...props}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </Stack.Screen>
        )}

        <Stack.Screen name="CreateGoal">
          {(props) => (
            <CreateGoalScreen
              {...props}
              reloadHome={reloadHome}
              setReloadHome={setReloadHome}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="GoalDetails">
          {(props) => (
            <GoalDetailsScreen
              {...props}
              reloadHome={reloadHome}
              setReloadHome={setReloadHome}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ProgressScreen" component={ProgressScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Account">
          {(props) => (
            <AccountScreen
              {...props}
              isLoggedout={isLoggedout}
              setIsLoggedOut={setIsLoggedOut}
              removeValue={removeValue}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
