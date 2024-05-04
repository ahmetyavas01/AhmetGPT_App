import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={styles.Header}>
      <Text style={styles.HeaderText}>Welcome to AhmetGPT 👋🏻</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  HeaderText:{
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '23%',
  },
  Header:{
    width:'100%',
    height:'20%',
    backgroundColor:'#363062',
    borderBottomLeftRadius:60,
  }
})