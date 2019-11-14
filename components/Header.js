import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native'

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ReciMe</Text>
      <Text style={styles.text}>+</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff009d',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  text: {
    fontSize: 40,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    color: '#ffffff'
  },
  button: {
    alignSelf: 'stretch',
    color: '#ffffff',
    width: 30,
    height: 30
  }
})