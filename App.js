import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./app/HomeScreen";
import CreateGoalScreen from "./app/CreateGoalScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetailsScreen from "./app/GoalDetailsScreen";
import ProgressScreen from "./app/ProgressScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          options={{
            title: "",
          }}
          component={HomeScreen}
        />
        <Stack.Screen name="CreateGoal" component={CreateGoalScreen} />
        <Stack.Screen name="GoalDetails" component={GoalDetailsScreen} />
        <Stack.Screen name="ProgressScreen" component={ProgressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
