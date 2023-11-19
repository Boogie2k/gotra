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

const ProgressScreen = ({ route }) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const { data } = route.params;
  //console.log(data);
  // console.log(data);

  const not_startedNum = data && data.filter((item) => item.notStarted == true);
  const completdNum = data && data.filter((item) => item.completed == true);
  const inProgressNum =
    data &&
    data.filter(
      (item) =>
        item.notStarted !== true &&
        item.completed !== true &&
        item.onHold !== true
    );

  const on_hold_num = data && data.filter((item) => item.onHold == true);

  let progressProps = {
    not_startedNum: not_startedNum.length,
    completedNum: completdNum.length,
    inProgressNum: inProgressNum.length,
  };

  const [firstHalf, setFirstHalf] = useState(true);

  const labels = firstHalf
    ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    : ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const datas = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Rainy Days"], // optional
  };
  let counts = Array(12).fill(0);

  not_startedNum.forEach((item) => {
    let date = new Date(item.updatedAt);
    let month = date.getMonth(); // Months are zero-based
    counts[month]++;
  });
  let slicedCountsForOnHold = firstHalf
    ? counts.slice(0, 6)
    : counts.slice(6, 12);

  completdNum.forEach((item) => {
    let date = new Date(item.updatedAt);
    let month = date.getMonth(); // Months are zero-based
    counts[month]++;
  });
  let slicedCountsForcompleted = firstHalf
    ? counts.slice(0, 6)
    : counts.slice(6, 12);

  not_startedNum.forEach((item) => {
    let date = new Date(item.updatedAt);
    let month = date.getMonth(); // Months are zero-based
    counts[month]++;
  });
  let slicedCountsForNotStarted = firstHalf
    ? counts.slice(0, 6)
    : counts.slice(6, 12);

  inProgressNum.forEach((item) => {
    let date = new Date(item.updatedAt);
    let month = date.getMonth(); // Months are zero-based
    counts[month]++;
  });
  let slicedCountsForInProgress = firstHalf
    ? counts.slice(0, 6)
    : counts.slice(6, 12);

  console.log(counts);
  return (
    <SafeAreaView style={styles.container}>
      <ProgressScreenNav />
      <ScrollView style={{}}>
        <View style={styles.chart}>
          <Text
            onPress={() => {
              setFirstHalf(!firstHalf);
            }}
            style={{ color: "white" }}
          >
            Next
          </Text>
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
              legend: ["Rainy Days"], // optional
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
                    borderLeftColor: "#CEAFED",
                    paddingLeft: 13,
                  }}
                >
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.start}>{formattedDate}</Text>
                </View>

                <View style={styles.progressView}>
                  <Text style={styles.progress}>0%</Text>
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
});
