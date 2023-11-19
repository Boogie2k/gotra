import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { fetchedData } from "./components/fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GoalDetailsScreen = ({ route, navigation }) => {
  const { item, data } = route.params;
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [startDate, setStartDate] = useState(item.startDate);
  const [endDate, setEndDate] = useState(item.endDate);
  const [subgoals, setSubgoals] = useState(item.subgoals);
  const [completed, setCompleted] = useState(item.completed);
  const [tag, setTag] = useState(item.tags);
  const [onHold, setOnHold] = useState(item.onHold);

  let colors = ["#FF003D", "#431571", "#FF7A00"];

  const prog = subgoals.filter((item) => item.isCompleted == true);
  //(prog.length);

  let progress = (prog.length / subgoals.length) * 100;

  let progressPercentage = Math.floor(progress);

  if (completed == true) {
    progressPercentage = 100;
  }

  useEffect(() => {
    if (progressPercentage == 100) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [progressPercentage]);

  const deleteGoal = () => {
    fetch(`https://gotra-api-inh9.onrender.com/api/v1/goal/${item._id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log("Goal deleted successfully");
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation: " + error);
      });
  };
  const saveGoal = () => {
    fetch(`https://gotra-api-inh9.onrender.com/api/v1/goal/${item._id}/`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        startDate: startDate,
        endDate: endDate,
        subgoals,
        tags: tag,
        onHold: onHold,
        completed,
        notStarted: false,
        progress: progressPercentage,
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
      })
      .catch((err) => console.log(err));
  };

  let startDateFormat = new Date(startDate);
  let formattedStartDate =
    (startDateFormat.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    startDateFormat.getDate().toString().padStart(2, "0") +
    "/" +
    startDateFormat.getFullYear();
  //console.log(formattedDate); // Outputs: 11/12/2023
  let endDateFormat = new Date(endDate);
  let formattedendDate =
    (endDateFormat.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    endDateFormat.getDate().toString().padStart(2, "0") +
    "/" +
    endDateFormat.getFullYear();
  //console.log(formattedDate); // Outputs: 11/12/2023

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("my-key", item._id);
    } catch (e) {
      // saving error
    }
  };

  //storeData();

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("my-key");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  removeValue();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("my-key");
      if (value !== null) {
        // value previously stored
        console.log(value);
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
      <GoalDetailsNav deleteGoal={deleteGoal} saveGoal={saveGoal} />

      <ScrollView>
        {/*     <Text>GoalDetailsScreen</Text> */}
        <TextInput
          value={title}
          style={styles.header}
          onChangeText={(newTitle) => setTitle(newTitle)}
        />

        <View style={styles.desc}>
          <Text style={styles.descText}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={2}
            style={styles.descInput}
            value={description}
            onChangeText={(newText) => setDescription(newText)}
          />
        </View>

        <View style={styles.tl}>
          <Text style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
            Timeline
          </Text>
          <View style={{ minHeight: 60, justifyContent: "space-between" }}>
            <Text style={{ color: "white", fontWeight: 500, fontSize: 16 }}>
              Start Date
            </Text>
            <TextInput
              style={{ color: "white", fontSize: 17, opacity: 0.75 }}
              value={formattedStartDate}
              onChangeText={(newText) => {
                setStartDate(newText);
              }}
            />
          </View>
          <View style={{ minHeight: 60, justifyContent: "space-between" }}>
            <Text style={{ color: "white", fontWeight: 500, fontSize: 16 }}>
              End Date
            </Text>
            <TextInput
              style={{ color: "white", fontSize: 17, opacity: 0.75 }}
              value={formattedendDate}
              onChangeText={(newText) => {
                setEndDate(newText);
              }}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#0b3b16",
            width: 340,
            borderRadius: 50,
            minHeight: 34,
            marginTop: 15,
            marginBottom: 15,
            position: "relative",
          }}
        >
          {progressPercentage ? (
            <Text
              style={{
                color: "white",
                textAlign: "center",
                opacity: 1,
                alignItems: "center",
                backgroundColor: "#0A9228",
                borderRadius: 50,
                minHeight: 34,
                width: `${progressPercentage}%`,
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {progressPercentage}%
            </Text>
          ) : (
            <Text
              style={{
                color: "white",
                textAlign: "center",
                minHeight: 34,
                alignItems: "center",
                opacity: 0.35,
                borderRadius: 50,

                fontSize: 18,
                fontWeight: 500,
              }}
            >
              0%
            </Text>
          )}
        </View>

        <View>
          <Text style={{ color: "white", fontWeight: 600, fontSize: 22 }}>
            sub-goals
          </Text>

          <View>
            {subgoals.map((subgoal, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: 30,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#2A2A2A",
                      minHeight: 57,
                      flexDirection: "row",
                      width: 245,
                      borderRadius: 20,
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: 15,
                      paddingRight: 15,
                      marginTop: 10,
                    }}
                  >
                    <TextInput
                      style={{
                        color: "white",

                        opacity: 0.75,
                        width: "80%",
                        fontSize: 18,
                      }}
                      value={subgoal.subgoals_text}
                      onChangeText={(newText) => {
                        const newSubgoals = [...subgoals];
                        newSubgoals[index].subgoals_text = newText;
                        setSubgoals(newSubgoals);
                      }}
                    />
                    <AntDesign
                      onPress={() => {
                        const newStatus = [...subgoals];
                        newStatus[index].isCompleted = !subgoal.isCompleted;
                        setSubgoals(newStatus);
                        setOnHold(false);

                        if (!subgoal.isCompleted) {
                          setCompleted(false);
                        }
                      }}
                      name="checkcircleo"
                      size={24}
                      color={
                        subgoal.isCompleted || completed ? "#00FF00" : "white"
                      }
                    />
                  </View>
                  <Text
                    style={{
                      color: "white",
                      opacity: 0.75,
                      textDecorationLine: "underline",
                    }}
                  >
                    {formattedStartDate}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "white", fontWeight: 600, fontSize: 22 }}>
            Tags
          </Text>

          <View style={{ flexDirection: "row" }}>
            {tag.map((item, index) => {
              let text = item;

              return (
                <ScrollView key={index} horizontal={true}>
                  <TextInput
                    value={text}
                    onChangeText={(newText) => {
                      const newTag = [...tag];
                      newTag[index] = newText;
                      setTag(newTag);
                    }}
                    style={{
                      backgroundColor: colors[index % colors.length],
                      width: 84,
                      minHeight: 38,
                      borderRadius: 43,
                      color: "white",
                      textAlign: "center",
                      marginTop: 9,
                      marginRight: 9,
                    }}
                  />
                </ScrollView>
              );
            })}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 30,
            marginTop: 30,
          }}
        >
          <Text style={{ color: "white", fontWeight: 600, fontSize: 22 }}>
            Status
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Entypo
              onPress={() => {
                if (progressPercentage == 100 || completed == true) {
                  alert(false);
                } else {
                  setOnHold(!onHold);
                }
              }}
              name="circle"
              size={24}
              color={onHold ? "red" : "white"}
            />
            <Text style={{ color: "white", fontWeight: 500, fontSize: 17 }}>
              on hold
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo
              name="circle"
              size={24}
              color={progressPercentage == 100 ? "green" : "white"}
              onPress={() => {
                if (subgoals.length && progressPercentage !== 100) {
                  alert(false);
                } else {
                  setCompleted(!completed);

                  setOnHold(false);
                }
              }}
            />
            <Text style={{ color: "white", fontWeight: 500, fontSize: 17 }}>
              completed
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const GoalDetailsNav = ({ saveGoal, deleteGoal }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 15,
        marginBottom: 20,
      }}
    >
      <AntDesign name="left" size={24} color="white" />
      <Text style={{ fontSize: 20, fontWeight: 600, color: "white" }}>
        Goal Details
      </Text>
      <View style={{ flexDirection: "row" }}>
        <AntDesign
          color="white"
          style={{ marginRight: 9 }}
          name="save"
          size={24}
          onPress={saveGoal}
        />
        <Ionicons
          name="trash-bin-sharp"
          size={24}
          color="white"
          onPress={deleteGoal}
        />
      </View>
    </View>
  );
};

export default GoalDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingLeft: 15,

    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 20,
  },

  header: {
    fontSize: 30,
    // fontWeight: 600,
    color: "white",
  },
  desc: {
    marginTop: 20,
    marginBottom: 20,
    paddingRight: 20,
  },
  descText: {
    fontSize: 22,
    fontWeight: 600,
    color: "white",
  },
  descInput: {
    fontSize: 18,
    color: "white",
    textAlignVertical: "top",
    paddingTop: 9,
    opacity: 0.75,
  },
  tl: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 50,
  },
});
