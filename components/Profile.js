import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import * as firebase from 'firebase'

export class Profile extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const user = firebase.auth().currentUser.email
    console.log('user', user)
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome, {user}!</Text>
      </View>
    )
   
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c9f9ff",
    height: '100%',
  },
  header: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  }
})