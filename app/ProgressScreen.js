import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const ProgressScreen = ({ route, navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const { data, userData } = route.params;
  //console.log(data);
  console.log(userData);

  const not_startedNum =
    userData && userData.filter((item) => item.notStarted == true);
  const completdNum =
    userData && userData.filter((item) => item.completed == true);
  const inProgressNum =
    userData &&
    userData.filter(
      (item) =>
        item.notStarted !== true &&
        item.completed !== true &&
        item.onHold !== true
    );

  const on_hold_num =
    userData && userData.filter((item) => item.onHold == true);

  const [firstHalf, setFirstHalf] = useState(true);

  const labels = firstHalf
    ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    : ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let counts = Array(12).fill(0);
  let countsForNotStarted = Array(12).fill(0);
  let countsForOnHold = Array(12).fill(0);
  let countsForInProgress = Array(12).fill(0);
  let countsForCompleted = Array(12).fill(0);

  on_hold_num.forEach((item) => {
    let date = new Date(item.updatedAt);
    let month = date.getMonth(); // Months are zero-based
    countsForOnHold[month]++;
  });
  let slicedCountsForOnHold = firstHalf
    ? countsForOnHold.slice(0, 6)
    : countsForOnHold.slice(6, 12);

  completdNum.forEach((item) => {
    let date = new Date(item.updatedAt);
    let month = date.getMonth(); // Months are zero-based
    countsForCompleted[month]++;
  });
  let slicedCountsForcompleted = firstHalf
    ? countsForCompleted.slice(0, 6)
    : countsForCompleted.slice(6, 12);

  not_startedNum.forEach((item) => {
    let date = new Date(item.updatedAt);
    let month = date.getMonth(); // Months are zero-based
    countsForNotStarted[month]++;
    console.log(month);
  });
  let slicedCountsForNotStarted = firstHalf
    ? countsForNotStarted.slice(0, 6)
    : countsForNotStarted.slice(6, 12);

  inProgressNum.forEach((item) => {
    let date = new Date(item.updatedAt);
    let month = date.getMonth(); // Months are zero-based
    countsForInProgress[month]++;
  });
  let slicedCountsForInProgress = firstHalf
    ? countsForInProgress.slice(0, 6)
    : countsForInProgress.slice(6, 12);

  return (
    <SafeAreaView style={styles.container}>
      <ProgressScreenNav />
      <ScrollView style={{}}>
        <View style={styles.chart}>
          <View style={styles.chartNav}>
            <AntDesign
              onPress={() => {
                setFirstHalf(true);
              }}
              name="left"
              size={24}
              color="white"
            />
            <AntDesign
              onPress={() => {
                setFirstHalf(false);
              }}
              name="right"
              size={24}
              color="white"
            />
          </View>
          <LineChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: slicedCountsForOnHold,
                  color: (opacity = 1) => `rgba(255,96,134, ${opacity})`, // optional
                  strokeWidth: 2, // optional
                },
                {
                  data: slicedCountsForcompleted,
                  color: (opacity = 1) => `rgba(129, 255, 157, ${opacity})`, // optional
                  strokeWidth: 2, // optional
                },
                {
                  data: slicedCountsForNotStarted,
                  color: (opacity = 1) => `rgba(	206, 175, 237, ${opacity})`, // optional
                  strokeWidth: 2, // optional
                },
                {
                  data: slicedCountsForInProgress,
                  color: (opacity = 1) => `rgba(	98, 95, 250, ${opacity})`, // optional
                  strokeWidth: 2, // optional
                },
              ],
              //   legend: ["Rainy Days"], // optional
            }}
            width={screenWidth}
            height={screenHeight / 2.5}
            chartConfig={{
              backgroundColor: "#1E1E1E",
              backgroundGradientFrom: "#161313",
              backgroundGradientTo: "#161313",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 0,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />

          <View style={styles.ballDetails}>
            <View style={styles.ball}></View>
            <Text style={styles.ballText}>In Progress</Text>
            <View style={[styles.ball, { backgroundColor: "#FF6086" }]}></View>
            <Text style={styles.ballText}>On hold</Text>
            <View style={[styles.ball, { backgroundColor: "#81FF9D" }]}></View>
            <Text style={styles.ballText}>Completed</Text>
            <View style={[styles.ball, { backgroundColor: "#CEAFED" }]}></View>
            <Text style={styles.ballText}>Not Started</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 30,
            width: "100%",
            paddingLeft: 20,
            borderLeftWidth: 3,
            borderStyle: "dotted",
            borderLeftColor: "#4845FF",
          }}
        >
          {data.map((item) => {
            //    console.log(item);
            let date = new Date(item.updatedAt);
            let formattedDate =
              date.getDate().toString().padStart(2, "0") +
              "/" +
              (date.getMonth() + 1).toString().padStart(2, "0") +
              "/" +
              date.getFullYear();
            // console.log(formattedDate); // Outputs: 11/12/2023

            return (
              <Pressable
                onPress={() =>
                  navigation.navigate("GoalDetails", { item, data })
                }
                key={item._id}
                horizontal={true}
                style={[
                  styles.item,
                  { justifyContent: "space-between", alignItems: "center" },
                ]}
              >
                <View
                  style={{
                    borderLeftWidth: 3,
                    borderLeftStyle: "solid",
                    borderLeftColor: item.notStarted ? "#CEAFED" : "",
                    borderLeftColor: item.completed ? "#81FF9D" : "",
                    borderLeftColor: item.onHold ? "#FF6086" : "",
                    borderLeftColor:
                      !item.onHold && !item.completed && !item.notStarted
                        ? "#625FFA"
                        : "",
                    paddingLeft: 13,
                  }}
                >
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.start}>{formattedDate}</Text>
                </View>

                <View style={styles.progressView}>
                  <Text style={styles.progress}>{item.progress}%</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgressScreen;

const ProgressScreenNav = () => {
  return (
    <View style={styles.nav}>
      <AntDesign name="left" size={24} color="white" />
      <Text style={styles.navText}>Progress</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingLeft: 20,
    paddingRight: 20,
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
  chart: {
    minHeight: 438,
    //   width: 299,
    //  backgroundColor: "red",
    backgroundColor: "#161313",
    borderRadius: 15,
    justifyContent: "center",

    alignItems: "center",
    position: "relative",
  },

  view: {
    color: "white",
    backgroundColor: "#4845FF",
    borderRadius: 20,
    paddingLeft: 51,
    paddingRight: 51,
    height: 33,
    paddingTop: 6,
  },

  body: {
    paddingLeft: 20,
    paddingTop: 20,
  },

  headText: {
    fontWeight: 600,
    color: "#CEAFED",
    fontSize: 21.67,
  },

  see: {
    fontWeight: 400,
    fontSize: 15,
    color: "white",
    textDecorationLine: "underline",
    opacity: 0.75,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingRight: 20,
    alignItems: "center",
  },
  item: {
    backgroundColor: "#1E1E1E",

    padding: 10,
    paddingLeft: 0,
    width: "100%",
    minHeight: 88,
    borderRadius: 20,
    marginRight: 20,
    display: "flex",
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },

  itemTitle: {
    fontSize: 17.04,
    fontWeight: 600,
    color: "white",
    marginBottom: 4,
  },

  start: {
    color: "white",
    fontSize: 17.04,
    fontWeight: 400,
    opacity: 0.75,
  },

  progressView: {
    width: 53,
    height: 53,
    borderRadius: 50,
    borderWidth: 9,
    borderColor: "#343434",
    borderStyle: "solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  progress: {
    color: "white",

    fontSize: 13.74,
    fontWeight: 400,

    opacity: 0.75,
  },
  ballDetails: {
    flexDirection: "row",
    alignItems: "center",
  },

  ball: {
    backgroundColor: "#625FFA",
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 5,
  },

  ballText: {
    color: "white",
    fontSize: 10,
    fontWeight: 400,
    marginRight: 10,
  },
  chartNav: {
    flexDirection: "row",
    textAlign: "right",

    position: "absolute",
    top: 0,
    right: 0,

    width: 70,
    justifyContent: "space-between",
    //width:'
  },
});
