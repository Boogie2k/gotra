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
import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Octicons } from "@expo/vector-icons";

import { fetchedData } from "./components/fetch";

const CreateGoalScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subgoals, setSubgoals] = useState([]);
  const [textInputs, setTextInputs] = useState([]);
  const [subgoalText, setSubgoalText] = useState("");

  const [tag, setTag] = useState("");
  const [newTag, setNewTag] = useState([]);

  // Date object
  const newDate = new Date();

  let currentDay = String(newDate.getDate()).padStart(2, "0");

  let currentMonth = String(newDate.getMonth() + 1).padStart(2, "0");

  let currentYear = newDate.getFullYear();

  // we will display the date as DD-MM-YYYY

  let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

  let start = `${currentMonth}-${currentDay}-${currentYear}`;

  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(start);
  // console.log("The current date is " + currentDate);

  let colors;

  let randomColor;

  // Define state for colors
  const [tagColors, setTagColors] = useState([]);

  // Generate colors once when newTag changes
  useEffect(() => {
    const colors = newTag.map(
      () => "#" + Math.floor(Math.random() * 16777215).toString(16)
    );
    setTagColors(colors);
  }, [newTag]);

  const removeTag = (index) => {
    const updatedTags = [...newTag];
    updatedTags.splice(index, 1);

    setNewTag(updatedTags);
  };

  const removeGoal = (index) => {
    const updatedGoal = [...subgoals];
    updatedGoal.splice(index, 1);

    setSubgoals(updatedGoal);
  };
  const indent = textInputs.length;

  const addNewTextInput = () => {
    let index = textInputs.length;
    const newTextInput = (
      <TextInput
        style={{
          backgroundColor: "#2A2A2A",
          width: 200,
          minHeight: 57,
          borderRadius: 20,
          color: "white",
          paddingLeft: 9,
        }}
        key={textInputs.length}
        placeholder={`Text Input ${textInputs.length + 1}`}
        onChangeText={(text) => {
          let newSubgoals = [...subgoals];
          newSubgoals[index] = text;
          setSubgoals(newSubgoals);
        }}
      />
    );

    if (subgoals.includes("")) {
      console.log("The array contains an empty string");
    } else {
      console.log("The array does not contain an empty string");
    }

    setTextInputs([...textInputs, newTextInput]);
  };

  const saveGoal = () => {
    fetch(`https://gotra-api-inh9.onrender.com/api/v1/goal/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tags: newTag,
        subgoals: subgoals,
        startDate,
        endDate,
        notStarted: true,
        progress:0,
        author: ["654e0b31a8bd6ceba9a1bb36"],
      }),
    })
      .then((res) => {
        if (!res.ok) {
          // throw new Error(`${res}`);
          console.log(res);
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  console.log(subgoals);
  return (
    <SafeAreaView style={styles.container}>
      <GoalScreenNav />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 15 }}>
          <Text style={styles.name}>Name your goal</Text>
          <TextInput
            value={title}
            onChangeText={(newText) => {
              setTitle(newText);
            }}
            style={styles.nameInput}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.name}>Describe this goal</Text>
          <TextInput
            value={description}
            onChangeText={(newText) => {
              setDescription(newText);
            }}
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
              <TextInput
                onChangeText={(newText) => {
                  setStartDate(newText);
                }}
                value={startDate}
                style={styles.dateInput}
              />
            </View>
            <View>
              <Text style={styles.dateSta}>End date</Text>
              <TextInput
                style={styles.dateInput}
                value={endDate}
                onChangeText={(newText) => {
                  setEndDate(newText);
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <View
            style={
              {
                //flexDirection: "row",// alignItems: "center"
              }
            }
          >
            <Text style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
              Add sub-goals
            </Text>
            <View style={styles.tagInput}>
              <TextInput
                value={subgoalText}
                onChangeText={(newText) => {
                  setSubgoalText(newText);
                }}
                style={{
                  color: "white",
                  paddingLeft: 5,
                  width: "70%",
                }}
              />
              <AntDesign
                name="pluscircleo"
                style={{ marginLeft: 9 }}
                size={24}
                color="white"
                onPress={() => {
                  if (subgoalText !== "") {
                    setSubgoals([...subgoals, { subgoals_text: subgoalText }]);
                  }

                  console.log(tag);
                  console.log(subgoals);
                }}
              />
            </View>
          </View>
          <View style={{ paddingRight: 50 }}>
            {subgoals &&
              subgoals.map((item, index) => {
                return (
                  <View
                    style={{
                      padding: 9,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 9,

                      backgroundColor: "#2A2A2A",

                      borderRadius: 20,
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "white",
                        width: "30%",
                      }}
                    >
                      {" "}
                      {item.subgoals_text}
                    </Text>
                    <Octicons
                      onPress={() => removeGoal(index)}
                      name="dash"
                      size={24}
                      color="white"
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 17,
                        fontWeight: 400,
                        opacity: 0.75,
                        width: "30%",
                      }}
                    >
                      {currentDate}
                    </Text>
                  </View>
                );
              })}
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "white", fontWeight: 600, fontSize: 22 }}>
            Add Tags
          </Text>

          <ScrollView
            horizontal={true}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexDirection: "row", paddingRight: 30 }}
          >
            <View style={styles.tagInput}>
              <TextInput
                value={tag}
                onChangeText={(newText) => {
                  setTag(newText);
                }}
                style={{
                  color: "white",
                  paddingLeft: 5,
                  width: "70%",
                }}
              />
              <AntDesign
                name="pluscircleo"
                style={{ marginLeft: 9 }}
                size={24}
                color="white"
                onPress={() => {
                  console.log(colors);

                  if (tag !== "") {
                    setNewTag([...newTag, tag]);
                  }

                  //console.log(tag);
                  console.log(newTag);
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {newTag &&
                newTag.map((item, index) => {
                  for (let i = 0; i < 10; i++) {
                    randomColor =
                      "#" + Math.floor(Math.random() * 16777215).toString(16);
                  }
                  colors = randomColor;
                  return (
                    item && (
                      <View
                        style={{
                          flexDirection: "row",
                          padding: 9,
                          backgroundColor: tagColors[index],
                          marginRight: 9,
                          borderRadius: 43,
                        }}
                        key={new Date().getTime()}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginRight: 9,
                            fontSize: 15,
                            fontWeight: 500,
                          }}
                        >
                          {item}
                        </Text>
                        <AntDesign
                          name="minuscircleo"
                          size={20}
                          onPress={() => removeTag(index)}
                          color="white"
                        />
                      </View>
                    )
                  );
                })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableHighlight onPress={saveGoal} style={styles.btn}>
        <Text style={{ color: "white", fontSize: 22, fontWeight: 500 }}>
          Create Goals
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
    color: "white",
    paddingLeft: 9,
  },

  dateSta: {
    fontSize: 16,
    fontWeight: 500,
    color: "white",
  },

  tagInput: {
    flexDirection: "row",
    width: 177,
    backgroundColor: "#2A2A2A",
    minHeight: 57,
    borderRadius: 20,
    alignItems: "center",
    marginRight: 9,
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
