import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Octicons } from "@expo/vector-icons";

const CreateGoalScreen = ({ route, setReloadHome, navigation }) => {
  const [loader, setLoader] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [mode, setMode] = useState("date");
  const [showStartDate, setShowStartDate] = useState(false);
  const [startmode, setStartMode] = useState("date");
  const [newEndDate, setNewEndDate] = useState(new Date());
  const [newStartDate, setNewStartDate] = useState(new Date());

  let currentStartDay = String(newStartDate.getDate()).padStart(2, "0");
  let currentStartMonth = String(newStartDate.getMonth() + 1).padStart(2, "0");
  let currentStartYear = newStartDate.getFullYear();

  // we will display the date as DD-MM-YYYY

  let currentStartDate = `${currentStartMonth}-${currentStartDay}-${currentStartYear}`;
  let initialStartDate = `${currentStartDay}-${currentStartMonth}-${currentStartYear}`;

  let currentDay = String(newEndDate.getDate()).padStart(2, "0");
  let currentMonth = String(newEndDate.getMonth() + 1).padStart(2, "0");
  let currentYear = newEndDate.getFullYear();

  // we will display the date as DD-MM-YYYY

  let currentDate = `${currentMonth}-${currentDay}-${currentYear}`;
  let initialDate = `${currentMonth}-${currentDay}-${currentYear}`;

  const { decodedUserId } = route.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subgoals, setSubgoals] = useState([]);
  const [subgoalText, setSubgoalText] = useState("");
  const [tag, setTag] = useState("");
  const [newTag, setNewTag] = useState([]);

  // Date object

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

  useEffect(() => {
    if (isSuccessModal) {
      setTimeout(() => {
        setIsSuccessModal(false);
      }, 2000);
    }
    return () => {
      if (isErrorModal) {
        setTimeout(() => {
          setIsErrorModal(false);
        }, 2000);
      }
    };
  }, [isSuccessModal, isErrorModal]);

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

  console.log(`${currentMonth}-${currentDay}-${currentYear}`);
  const saveGoal = () => {
    if (!title) {
      alert("title cannot be empty");
    } else if (!description) {
      alert("description cannot be empty");
    } else if (title && description) {
      setLoader(true);

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
          startDate: currentStartDate,
          endDate: currentDate,
          notStarted: true,
          progress: 0,
          author: decodedUserId,
          progress: 0,
          completed: false,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            // throw new Error(`${res}`);
            console.log(res);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setReloadHome(true);
          setLoader(false);
          setIsSuccessModal(true);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          setIsErrorModal(true);
        });
    }
  };

  const onChange = (event, selectedDate) => {
    setNewEndDate(selectedDate);
    setShowDate(false);
  };

  const showMode = (modeToShow) => {
    setShowDate(true);
    setMode(modeToShow);
  };

  const onChangeStartDate = (event, selectedDate) => {
    setNewStartDate(selectedDate);
    setShowStartDate(false);
  };

  const showStartMode = (modeToShow) => {
    setShowStartDate(true);
    setStartMode(modeToShow);
  };
  console.log(currentStartDate);
  return (
    <SafeAreaView style={styles.container}>
      <GoalScreenNav
        loader={loader}
        setLoader={setLoader}
        navigation={navigation}
      />
      {isSuccessModal && (
        <Text style={styles.successModal}> Goal Is Created </Text>
      )}
      {isErrorModal && (
        <Text style={[styles.successModal, { backgroundColor: "red" }]}>
          {" "}
          Goal couldn't be created{" "}
        </Text>
      )}

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
              <View style={[styles.dateInput, { flexDirection: "row" }]}>
                <Text style={{ color: "white" }}>{currentStartDate}</Text>
                {showStartDate && (
                  <DateTimePicker
                    value={newStartDate}
                    mode={startmode}
                    is24Hour={true}
                    onChange={onChangeStartDate}
                  />
                )}
                <AntDesign
                  onPress={() => {
                    showStartMode("date");
                  }}
                  name="down"
                  size={24}
                  color="white"
                />
              </View>
            </View>
            <View>
              <Text style={styles.dateSta}>End date</Text>
              <View style={[styles.dateInput, { flexDirection: "row" }]}>
                <Text style={{ color: "white" }}>{initialDate}</Text>
                {showDate && (
                  <DateTimePicker
                    value={newEndDate}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
                <AntDesign
                  onPress={() => {
                    showMode("date");
                  }}
                  name="down"
                  size={24}
                  color="white"
                />
              </View>
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
                    setSubgoals([
                      ...subgoals,
                      { subgoals_text: subgoalText, isCompleted: false },
                    ]);
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

const GoalScreenNav = ({ loader, navigation }) => {
  return (
    <View style={styles.nav}>
      <AntDesign
        name="left"
        size={24}
        color="white"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.navText}>Create a new goal</Text>
      {loader && (
        <ActivityIndicator
          style={{ marginLeft: 40 }}
          size="large"
          color="#0000ff"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingLeft: 15,

    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    //marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 20,
  },

  successModal: {
    backgroundColor: "green",

    color: "white",
    position: "absolute",
    zIndex: 1,
    top: 60,
    right: 0,
    left: 0,

    textAlign: "center",
    fontSize: 24,
    fontStyle: "italic",
  },

  nav: {
    flexDirection: "row",
    paddingBottom: 20,
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 9,
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
