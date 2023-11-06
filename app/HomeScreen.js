import {
  RootTagContext,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Progress from "./components/Progress";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchedData } from "./components/fetch";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const queryClient = new QueryClient();

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

  let not_started;
  let completed;
  let in_progress;
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch(`${fetchedData}snippets/`).then((res) => res.json()),
  });

  if (isLoading) return <Text>loading</Text>;

  if (error) return <Text>errnnors:jjs,,,{error.message}</Text>;

  // data && console.log(data);

  const not_startedNum =
    data && data.filter((item) => item.not_started == true);
  const completdNum = data && data.filter((item) => item.completed == true);
  const inProgressNum =
    data &&
    data.filter(
      (item) =>
        item.not_started !== true &&
        item.completed !== true &&
        item.on_hold !== true
    );

  const on_hold_num = data && data.filter((item) => item.on_hold == true);

  progressProps = {
    not_startedNum: not_startedNum.length,
    completedNum: completdNum.length,
    inProgressNum: inProgressNum.length,
  };

  console.log(inProgressNum.length);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <Nav />
      </View>
      <ScrollView>
        <View style={{ marginTop: 33 }}>
          <Progress progressProps={progressProps} />
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={styles.view}>lists</Text>
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
                return (
                  <View
                    key={item.id}
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
                      <Text style={styles.start}>{item.start}</Text>
                    </View>

                    <View style={styles.progressView}>
                      <Text style={styles.progress}>{item.progress}%</Text>
                    </View>
                  </View>
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
                item.tag.map((tag) => console.log(tag));
                console.log(item);
                return (
                  <View key={item.id} style={styles.item}>
                    <View
                      style={{
                        borderLeftWidth: 3,
                        borderLeftStyle: "solid",
                        borderLeftColor: "#CE274F",
                        paddingLeft: 13,
                      }}
                    >
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.start}>{item.start}</Text>
                    </View>

                    <View style={styles.progressView}>
                      <Text style={styles.progress}>{item.progress}%</Text>
                    </View>
                  </View>
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
                return (
                  <View key={item.id} style={styles.item}>
                    <View
                      style={{
                        borderLeftWidth: 3,
                        borderLeftStyle: "solid",
                        borderLeftColor: "#82FF9D",
                        paddingLeft: 13,
                      }}
                    >
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.start}>{item.start}</Text>
                    </View>

                    <View style={styles.progressView}>
                      <Text style={styles.progress}>{item.progress}%</Text>
                    </View>
                  </View>
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
          onPress={() => navigation.navigate("CreateGoal")}
          style={styles.add}
        >
          <AntDesign name="pluscircle" size={46} color="grey" />
        </TouchableHighlight>
        <View style={styles.profile}>
          <MaterialIcons name="account-circle" size={24} color="white" />
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
