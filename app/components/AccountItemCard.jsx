import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AccountItemCard = ({title,onPress}) => {
  return (
     <Pressable     
                    style={styles.item}
                    onPress={onPress}
                  >
                      <Text style={styles.itemTitle}>{title}</Text>
                      <Text style={styles.start}>tap to change</Text>
                  </Pressable>
  )
}

export default AccountItemCard

const styles = StyleSheet.create({
     item: {
    backgroundColor: "#1E1E1E",

    padding: 10,
    paddingLeft: 0,
   maxWidth: '100%',
    minHeight: 88,
    borderRadius: 20,
    marginRight: 20,
    display: "flex",
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom:'10%'
  },
     itemTitle: {
    fontSize: 24.04,
    fontWeight: '600',
    color: "white",

    marginBottom: 4,
    textAlign:'center',
    //width: "5%",
    paddingHorizontal:30

   // width: 170,
  },
   start: {
    color: "white",
    fontSize: 17.04,
    fontWeight: '400',
    opacity: 0.75,
    fontStyle:'italic'
  },
})