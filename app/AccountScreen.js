import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Modal,
  ActivityIndicator,
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,

} from "react-native";
import React, { useEffect, useState } from "react";

import AccountItemCard from "./components/AccountItemCard";
import AccountModal from "./components/AccountModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from 'expo-secure-store';

const AccountScreen = ({
  navigation,
  isLoggedout,
  setIsLoggedOut,
  removeValue,
}) => {
  //  const [isLoggedout, setIsLoggedOut] = useState(false);
  let logOut = async () => {
    try {
      await SecureStore.deleteItemAsync("gotrakey");
    } catch (e) {
      // remove error
    }
    navigation.goBack();
    removeValue();
    setIsLoggedOut(!isLoggedout);

    console.log("Done.");
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };



   useEffect(() => {
  (async()=>{
    try {
      const val = await SecureStore.getItemAsync('gotraKey'); 
     // await AsyncStorage.removeItem("my-key");


      console.log({vals:val});
        let decodedVal=  jwtDecode(val);
         console.log({decodedVal});
      

     const response = await fetch(`https://gotra-api-inh9.onrender.com/api/v1/login/${decodedVal.userId}`,{
      method:'GET',
      headers:{
        'Authorization':`Bearer ${val}`,
        'Content-Type':'application/json'
      },
     


     });

      const result = await response.json();
      console.log({result});
      setUsername(result.username);
      setEmail(result.email);
      setId(result._id);

    
    } catch (e) {
      // error reading value
      console.log({e});
    }

  })()
  }
  , [modalVisible]);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{paddingTop:20}}>
      
     {/*  <View style={{marginBottom:'20%', marginTop:10}}>
             <Text style={{ color: "white", fontSize: 20 }}>Account status: <Text style={{color:'blue'}}>{'Basic'}</Text></Text> 
                <Button title="Upgrade to Premium"  />

      </View> */}
 


      <AccountItemCard title={username}    onPress={() => {setModalVisible(true); setModalType('username')}}/>
       <AccountItemCard title={email}    onPress={() => {setModalVisible(true);  setModalType('email')}}/>
        <AccountItemCard title={'password'}    onPress={() =>{ setModalVisible(true);setModalType('password')}}/>
           
           <Pressable style={styles.button} onPress={logOut}>
            <Text style={{color:'#fff', textAlign:'center'}}> Logout!</Text>
          </Pressable>

      <AccountModal modalVisible={modalVisible} setModalVisible={setModalVisible} modalType={modalType} id={id} />
      </ScrollView>

    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    //marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,

    //justifyContent: "center",
  
    alignItems: "center",
  },
 button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom:5,
    width:100,
    marginHorizontal:'auto',
  backgroundColor: '#2196F3',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
   
  
});
