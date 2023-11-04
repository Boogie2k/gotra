import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { Platform } from "react-native";
import { StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateGoalScreen = () => {
  const [date, setDate] = useState(new Date());
  return (
    <SafeAreaView style={styles.container}>
      <GoalScreenNav />

      <ScrollView>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.name}>Name your goal</Text>
          <TextInput style={styles.nameInput} />
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.name}>Describe this goal</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[
              styles.nameInput,
              { textAlignVertical: "top", paddingTop: 9 },
            ]}
          />
        </View>

        <View style={{ marginTop: 15, width: "90%" }}>
          <Text style={styles.name}>Specify a timeframe </Text>
          <View
            style={{
              marginTop: 9,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.dateSta}>Start date</Text>
              <TextInput style={styles.dateInput} />
            </View>
            <View>
              <Text style={styles.dateSta}>Start date</Text>
              <TextInput style={styles.dateInput} />
            </View>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
              Add sub-goals
            </Text>
            <AntDesign
              name="pluscircleo"
              style={{ marginLeft: 9 }}
              size={24}
              color="white"
            />
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "white", fontWeight: 600, fontSize: 22 }}>
            Add Tags
          </Text>

          <View>
            <View style={styles.tagInput}>
              <TextInput
                style={{ color: "white", paddingLeft: 5, width: "70%" }}
              />
              <AntDesign
                name="pluscircleo"
                style={{ marginLeft: 9 }}
                size={24}
                color="white"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableHighlight style={styles.btn}>
        <Text style={{ color: "white", fontSize: 22, fontWeight: 500 }}>
          Create Goal
        </Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default CreateGoalScreen;

const GoalScreenNav = () => {
  return (
    <View style={styles.nav}>
      <AntDesign name="left" size={24} color="white" />
      <Text style={styles.navText}>Create a new goal</Text>
    </View>
  );
};

function TestAppWithComponent() {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <DateTimePicker
        value={new Date(0)}
        onChange={(evt, selectedDate) => {
          setDate(selectedDate);
        }}
      />
      <Text style={{ color: "white" }}>{String(date?.toLocaleString())}</Text>
      <Text style={{ color: "white" }}>
        {String((date?.getTime() ?? 0) / 1000)}
      </Text>
    </>
  );
}

const AppWithImperativePicker = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    selectedDate && setDate(selectedDate);
  };

  const showMode = (currentMode) => {
    DateTimePicker.open({
      value: date,
      onChange,
      display: "default",
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const time = date?.getTime();
  return (
    <>
      <Button onPress={showDatepicker} title="Show date picker!" />
      {/* <Text>selected: {date.toLocaleString()}</Text>}
      {/*<Text>{String(time)}</Text>*/}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingLeft: 15,

    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 20,
  },

  nav: {
    flexDirection: "row",
  },
  navText: {
    color: "white",
    alignItems: "center",
    fontWeight: 600,
    fontSize: 19,
    marginLeft: 90,
    textTransform: "capitalize",
  },
  name: {
    color: "white",
    fontWeight: 600,
    fontSize: 22,
  },
  nameInput: {
    backgroundColor: "#2A2A2A",
    width: "90%",
    minHeight: 57,
    color: "white",
    borderRadius: 20,
    marginTop: 10,
    paddingLeft: 9,
  },

  dateInput: {
    backgroundColor: "#2A2A2A",
    width: 150,
    minHeight: 57,
    borderRadius: 20,
    marginTop: 9,
  },

  dateSta: {
    fontSize: 16,
    fontWeight: 500,
    color: "white",
  },

  tagInput: {
    flexDirection: "row",
    width: "40%",
    backgroundColor: "#2A2A2A",
    minHeight: 57,
    borderRadius: 20,
    alignItems: "center",
  },

  btn: {
    marginTop: 15,
    width: "90%",
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#4845FF",
    borderRadius: 20,
  },
});
