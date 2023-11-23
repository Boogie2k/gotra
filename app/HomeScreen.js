import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Progress from "./components/Progress";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode as atob, encode as btoa } from "base-64";

const queryClient = new QueryClient();

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function Home({ navigation }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeApp navigation={navigation} />
    </QueryClientProvider>
  );
}

const HomeApp = ({ navigation }) => {
  /*
  useEffect(() => {
    createTable();
  }, []);
*/

  const [loginVal, setLoginVal] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [enablePTR, setEnablePTR] = React.useState(false);

  const getData = async () => {
    try {
      const val = await AsyncStorage.getItem("my-key");

      setLoginVal(val);
      if (loginVal !== null) {
        // value previously stored
        // console.log(loginVal);
      } else {
        console.log("emp");
      }
    } catch (e) {
      // error reading value
      console.log("err");
    }
  };

  getData();

  if (!global.btoa) {
    global.btoa = btoa;
  }
  if (!global.atob) {
    global.atob = atob;
  }

  let decodedUser = loginVal && jwtDecode(loginVal);
  let decodedUserId = decodedUser && decodedUser.userId;

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`https://gotra-api-inh9.onrender.com/api/v1/goal/`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <Text>loading</Text>;

  if (error) return <Text>errnnors:jjs,,,{error.message}</Text>;

  let userData =
    data &&
    data.filter((item) => {
      return item.author.some((author) => author._id === decodedUserId);
    });

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

  progressProps = {
    not_startedNum: not_startedNum.length,
    completedNum: completdNum.length,
    inProgressNum: inProgressNum.length,
  };
  console.log;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <Nav />
      </View>
      <ScrollView>
        <View style={{ marginTop: 33 }}>
          <Progress
            progressProps={progressProps}
            data={data}
            userData={userData}
            navigation={navigation}
          />
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Text
              onPress={() => {
                userData =
                  data &&
                  data.filter((item) => {
                    return item.author.some(
                      (author) => author._id === decodedUserId
                    );
                  });

                console.log("done");
              }}
              style={styles.view}
            >
              lists
            </Text>
            <Text style={styles.view}>Boards</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.header}>
              <Text style={styles.headText}>Not started</Text>
              <Text style={styles.see}>See all</Text>
            </View>

            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {not_startedNum.map((item) => {
                let date = new Date(item.updatedAt);
                let formattedDate =
                  date.getDate().toString().padStart(2, "0") +
                  "/" +
                  (date.getMonth() + 1).toString().padStart(2, "0") +
                  "/" +
                  date.getFullYear();

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
                      <Text style={styles.progress}>{item.progress}%</Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.body}>
            <View style={styles.header}>
              <Text style={[styles.headText, { color: "#ce275f" }]}>
                On hold
              </Text>
              <Text style={styles.see}>See all</Text>
            </View>

            <ScrollView
              horizontal={true}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {on_hold_num.map((item) => {
                let date = new Date(item.updatedAt);
                let formattedDate =
                  date.getDate().toString().padStart(2, "0") +
                  "/" +
                  (date.getMonth() + 1).toString().padStart(2, "0") +
                  "/" +
                  date.getFullYear();
                return (
                  <Pressable
                    key={item._id}
                    onPress={() =>
                      navigation.navigate("GoalDetails", { item, userData })
                    }
                    style={styles.item}
                  >
                    <View
                      style={{
                        borderLeftWidth: 3,
                        borderLeftStyle: "solid",
                        borderLeftColor: "#CE274F",
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
            </ScrollView>
          </View>
          <View style={styles.body}>
            <View style={styles.header}>
              <Text style={[styles.headText, { color: "#82FF9D" }]}>
                Completed
              </Text>
              <Text style={styles.see}>See all</Text>
            </View>

            <ScrollView
              horizontal={true}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {completdNum.map((item) => {
                let date = new Date(item.updatedAt);
                let formattedDate =
                  date.getDate().toString().padStart(2, "0") +
                  "/" +
                  (date.getMonth() + 1).toString().padStart(2, "0") +
                  "/" +
                  date.getFullYear();
                return (
                  <Pressable
                    key={item._id}
                    onPress={() =>
                      navigation.navigate("GoalDetails", { item, data })
                    }
                    style={styles.item}
                  >
                    <View
                      style={{
                        borderLeftWidth: 3,
                        borderLeftStyle: "solid",
                        borderLeftColor: "#82FF9D",
                        paddingLeft: 13,
                      }}
                    >
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.start}>{formattedDate}</Text>
                    </View>

                    <View style={styles.progressView}>
                      <View style={{}}>
                        <Text style={styles.progress}>{item.progress}%</Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.body}>
            <View style={styles.header}>
              <Text style={[styles.headText, { color: `rgb(	98, 95, 250)` }]}>
                In Progress
              </Text>
              <Text style={styles.see}>See all</Text>
            </View>

            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {inProgressNum.map((item) => {
                let date = new Date(item.updatedAt);
                let formattedDate =
                  date.getDate().toString().padStart(2, "0") +
                  "/" +
                  (date.getMonth() + 1).toString().padStart(2, "0") +
                  "/" +
                  date.getFullYear();

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
                        borderLeftColor: `rgb(	98, 95, 250)`,
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
            </ScrollView>
          </View>
        </View>
        <View></View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.home}>
          <AntDesign name="home" size={24} color="#4845FF" />
        </View>
        <TouchableHighlight
          title="Go to Details"
          onPress={() =>
            navigation.navigate("CreateGoal", {
              decodedUserId,
            })
          }
          style={styles.add}
        >
          <AntDesign name="pluscircle" size={46} color="grey" />
        </TouchableHighlight>
        <View style={styles.profile}>
          <MaterialIcons
            onPress={() => {
              navigation.navigate("Account");
            }}
            name="account-circle"
            size={24}
            color="white"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    width: 265,
    minHeight: 88,
    borderRadius: 20,
    marginRight: 20,
    display: "flex",
    marginTop: 10,
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

  logo: {
    borderWidth: 3,
    //backgroundColor: "white",
    borderColor: "white",
    color: "white",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
  },

  home: {
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 4,
    borderTopColor: "blue",
    width: 170,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingLeft: 20,
  },
  profile: {
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 4,
    borderTopColor: "blue",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: 170,
    justifyContent: "flex-end",
    paddingLeft: 100,
  },
  add: {
    position: "absolute",
    bottom: 36,
    left: 163.5,
    width: 56,
    paddingLeft: 4,
    borderBottomWidth: 6,
    borderBottomColor: "blue",
    borderRadius: 50,
    minHeight: 60,
    paddingTop: 5,
  },
});
