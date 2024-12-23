import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  RefreshControl,
  Button,
  Modal,
  ActivityIndicator,
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
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";




const queryClient = new QueryClient();

export function Home({ navigation, reloadHome, setReloadHome }) {
  return (
  
      <HomeApp
        navigation={navigation}
        reloadHome={reloadHome}
        setReloadHome={setReloadHome}
      />

  );
}

const HomeApp = ({ navigation, reloadHome, setReloadHome }) => {
  /*
  useEffect(() => {
    createTable();
  }, []);
*/

  const [loginVal, setLoginVal] = useState("");
  const [isList, setIsList] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [data, setData] = React.useState([]);


  //const fetched = isRefreshing || "/api/v1/goal/";


  if (!global.btoa) {
    global.btoa = btoa;
  }
  if (!global.atob) {
    global.atob = atob;
  }

  

  const tokens =SecureStore.getItem('gotraKey');

let decodedUser =  jwtDecode(tokens);
  let decodedUserId = decodedUser && decodedUser.userId;

/*   const { isLoading, error, data, refetch }  =    useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`https://gotra-api-inh9.onrender.com/api/v1/goal/`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      }).then((res) =>
        res.json()
      ),
  }); */

  useEffect(() => {
    if (reloadHome) {

      setReloadHome(false);
    }
  }, [reloadHome]);


  const getGoals = async () => {
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("gotraKey");
    

    try {
       const response= await fetch(`https://gotra-api-inh9.onrender.com/api/v1/goal`,{  
      headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type':'application/json'
      }
    });
   

    if(!response.ok){
      setIsError(true);
      setIsLoading(false);
    }

     const result= await response.json();
     console.log(response)
     console.log({result})
      setIsLoading(false);
      setIsError(false);
    setData(result);
   
      
    } catch (error) {
      console.log({error});


       setIsLoading(false);
             setIsError(true);

      
    }finally{
      setIsLoading(false)
    }

  }
  useEffect(()=>{
    getGoals();
   
  },[reloadHome])


  if (isLoading || isRefreshing)

   // console.log({data})

  
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          // onRequestClose={toggleModal}
        >
          <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal>
      </SafeAreaView>
    );

  if (isError)
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text
          style={{
            color: "white",
            marginBottom: 20,
            fontSize: 20,
            fontWeight: '400',
          }}
        >
          Error: something went wrong
        </Text>
        <Button
          onPress={() => {
            setReloadHome(true);
          }}
          title="retry"
        />
      </SafeAreaView>
    );


 /*  let userData =
    data &&
    data.filter((item) => {
      return item.author.some((author) => author._id === decodedUserId);
    }); */
 
    console.log({data})

  const not_startedNum =
   data.length>0 && data.filter((item) => item.notStarted == true);
  const completdNum =
    data.length>0 && data.filter((item) => item.completed == true);

  const inProgressNum =
    data.length>0 &&
    data.filter(
      (item) =>
        item.notStarted !== true &&
        item.completed !== true &&
        item.onHold !== true
    );

  const on_hold_num =
    data.length>0 &&data.filter((item) => item.onHold == true);

  progressProps = {
    not_startedNum: not_startedNum.length,
    completedNum: completdNum.length,
    inProgressNum: inProgressNum.length,
  };
  //  console.log;

  let exceededGoal = data&& data.length>0&&data.filter(
    (item) => item.endDate < new Date().toISOString() && !item.completed
  );

  console.log(exceededGoal.length);

  console.log({loginVal})
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <Nav exceededGoal={exceededGoal} />
      </View>
{/*          <LinearGradient
         colors={[
            "rgba(88, 0, 175, 0.3)", // Start with fully transparent purple
          
           
            "rgba(255, 0, 61, 0.3)"  // End with fully transparent red
             ]}// RGBA colors with 0.5 opacity
  start={{ x: 0, y: 0 }} // Start from the left
  end={{ x: 1, y: 0 }}   // End on the right
        style={styles.background}
      /> */}
      <ScrollView>
        <View style={{ marginTop: 33 }}>
        
          <Progress
            progressProps={progressProps}
            data={data}
            userData={data}
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
                setIsList(true);
              }}
              style={[
                styles.view,
                { backgroundColor: isList ? "#3c3c3c" : "#4845FF" },
              ]}
            >
              List View
            </Text>
            <Text
              onPress={() => {
                setIsList(false);
              }}
              style={[
                styles.view,
                { backgroundColor: isList ? "#4845ff" : "#3c3c3c" },
              ]}
            >
              Board View
            </Text>
          </View>
          <View style={styles.body}>
            <View style={styles.header}>
              <Text style={styles.headText}>Not started</Text>
              <Text
                onPress={() =>
                  navigation.navigate("ProgressScreen", { data })
                }
                style={styles.see}
              >
                See all
              </Text>
            </View>

            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                display: "flex",
                flexDirection: isList ? "column" : "row",
              }}
            >
              {not_startedNum&&not_startedNum.map((item) => {
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

                   {/* <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={["white", "#343434"]}
                      locations={[item.progress / 100, item.progress / 100]} // This makes the first 30% of the gradient white
                      style={styles.progressView}
                    >
                      <View style={styles.progressInnerView}>
                        <Text style={styles.progress}>{item.progress}%</Text>
                      </View>
                    </LinearGradient> */} 
                     <View style={[styles.progressInnerView, styles.progressView]}>
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
              <Text
                onPress={() =>
                  navigation.navigate("ProgressScreen", { data })
                }
                style={styles.see}
              >
                See all
              </Text>
            </View>

            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                display: "flex",
                flexDirection: isList ? "column" : "row",
              }}
            >
              {on_hold_num&&on_hold_num.map((item) => {
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
                      navigation.navigate("GoalDetails", { item })
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

              {/*      <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={["white", "#343434"]}
                      locations={[item.progress / 100, item.progress / 100]} // This makes the first 30% of the gradient white
                      style={styles.progressView}
                    >
                      <View style={styles.progressInnerView}>
                        <Text style={styles.progress}>{item.progress}%</Text>
                      </View>
                    </LinearGradient>  
                    
                    
                    */}

                     <View style={[styles.progressInnerView, styles.progressView]}>
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
              <Text
                onPress={() =>
                  navigation.navigate("ProgressScreen", { data })
                }
                style={styles.see}
              >
                See all
              </Text>
            </View>

            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                display: "flex",
                flexDirection: isList ? "column" : "row",
              }}
            >
              {completdNum&&completdNum.map((item) => {
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

                    {/*  <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={["white", "#343434"]}
                      locations={[item.progress / 100, item.progress / 100]} // This makes the first 30% of the gradient white
                      style={styles.progressView}
                    >
                      <View style={styles.progressInnerView}>
                        <Text style={styles.progress}>{item.progress}%</Text>
                      </View>
                    </LinearGradient>  */}

                     <View style={[styles.progressInnerView, styles.progressView]}>
                        <Text style={styles.progress}>{item.progress}%</Text>
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
              <Text
                onPress={() =>
                  navigation.navigate("ProgressScreen", { data })
                }
                style={styles.see}
              >
                See all
              </Text>
            </View>

            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                display: "flex",
                flexDirection: isList ? "column" : "row",
              }}
            >
              {inProgressNum&&inProgressNum.map((item) => {
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

                {/*   <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={["white", "#343434"]}
                      locations={[item.progress / 100, item.progress / 100]} // This makes the first 30% of the gradient white
                      style={styles.progressView}
                    >
                      <View style={styles.progressInnerView}>
                        <Text style={styles.progress}>{item.progress}%</Text>
                      </View>
                    </LinearGradient>  */}
                     <View style={[styles.progressInnerView, styles.progressView]}>
                        <Text style={styles.progress}>{item.progress}%</Text>
                      </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
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
    //marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  view: {
    color: "white",
    backgroundColor: "#4845FF",
    borderRadius: 20,
    paddingLeft: 21,
    paddingRight: 21,

    minHeight: 33,
    paddingTop: 6,
    paddingBottom: 6,
  },

  body: {
    paddingLeft: 20,
    paddingTop: 20,
  },

  headText: {
    fontWeight: '600',
    color: "#CEAFED",
    fontSize: 21.67,
  },

  see: {
    fontWeight:'400',
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
    fontWeight: '600',
    color: "white",

    marginBottom: 4,
    //width: "5%",

    width: 170,
  },

  start: {
    color: "white",
    fontSize: 17.04,
    fontWeight: '400',
    opacity: 0.75,
  },

  progressView: {
    borderStyle: "solid",
    height: 53,
    width: 53,
    borderRadius: 50, // Adjust this value to get the roundness you want
    alignItems: "center",
    justifyContent: "center",
    //overflow: "hidden",
  },

  progressInnerView: {
    backgroundColor: "#1E1E1E",
    height: 43,
    width: 43,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  progress: {
    color: "white",

    fontSize: 13.74,
    fontWeight: '400',

    opacity: 0.75,
    //  width: 43,
    // height: 43,
    borderRadius: 20,
    // backgroundColor: "red",
    // justifyContent: "center",
    //alignItems: "center",
    //display: "flex",
    //padding: 9,
    //position: "relative",top:50
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
    // borderTopWidth: 4,
    // borderTopColor: "blue",
    width: 170,
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    paddingLeft: 20,
  },
  profile: {
    paddingTop: 20,
    paddingBottom: 20,
    // borderTopWidth: 4,
    //  borderTopColor: "blue",
    //  borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    width: 170,
    justifyContent: "flex-end",
    paddingLeft: 100,
  },
  add: {
    position: "absolute",
    bottom: 36,
    left: '43%',
    width: 56,
    paddingLeft: 4,

    borderRadius: 50,
    minHeight: 60,
    paddingTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  nav:{
    paddingTop: 10,
    zIndex:10
    
  },
   background: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    //backgroundColor: "red",
    // bottom: 0,
    // marginTop: 10,
    height: "32%",
    //top: 200,
    borderWidth: 0,
    borderRadius:32

  },
});
