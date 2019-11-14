import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

export function Post() {
    return (
      <View style={styles.container}>
        <View style={styles.userDateContainer}>
          <Text style={styles.username}>Andi</Text>
          <Text style={styles.date}>11/13/19</Text>
        </View>

        <Text>jewqkjenf n jfenq,en jern jwenr jnwj nerjwenrjw, qn,m rnm,wnerwnj n jnwenr, wmen,q n,</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomColor: '#dadada',
    borderBottomWidth: 3
  },
  userDateContainer: {
  },
  username: {
    fontSize: 20
  },
  date: {

  }
})
