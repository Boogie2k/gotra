import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./app/HomeScreen";

export default function App() {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({});
