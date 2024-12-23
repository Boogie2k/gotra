import { StyleSheet, Text, View,Modal, Pressable, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { fetchedData } from './fetch'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

const AccountModal = ({modalVisible, setModalVisible,modalType,id}) => {
  console.log({id})

  const [value, setValue] = useState('')

  const onChangeText = (text) => {  
    setValue(text)
  }
  console.log({modalType})


const handleUpdate = async () => {
  const token = await SecureStore.getItemAsync('gotraKey');

  try {
    console.log("Updating with value:", value, "and modalType:", modalType);

    const response = await fetch(`${fetchedData}/login/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',  // Added content-type header
      },
      body: JSON.stringify({
        [modalType]: value  // Use the key as the dynamic modalType
      })
    });   
  
    if (!response.ok) {
      console.error("Response Error:", response);
      Alert.alert('Error', 'Something went wrong');
      return;
    }

    const result = await response.json();
    Alert.alert('Success', `${modalType} updated successfully`);
    console.log("Result:", result);

  } catch (error) {
    console.error("Catch Error:", error);
    Alert.alert('Error', 'Something went wrong');
  } finally {
    setModalVisible(false); 
    setValue('');  // Clear the input value 
    
    // Close the modal
  }
};

const closeModal=()=>{
  setModalVisible(!modalVisible)
  setValue('')
}

  return (
    <Modal
       
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/*  <TextInput placeholder='Enter password' style={{borderBottomWidth:1,marginBottom:10}}/> */}
           <TextInput onChangeText={(newText)=>{setValue(newText)}} value={value} placeholder={`Enter new ${modalType}`} style={{borderBottomWidth:1,marginBottom:10}}/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
             <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleUpdate}>
              <Text style={styles.textStyle}>Update</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  )
}

export default AccountModal

const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
   
    modalView: {
   // margin: 20,
    backgroundColor: 'white',

    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position:'absolute',
    bottom:0,
    width:'100%',
    borderTopStartRadius:20,
    borderTopEndRadius:20
  
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:15,
    minWidth:100,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
 
})