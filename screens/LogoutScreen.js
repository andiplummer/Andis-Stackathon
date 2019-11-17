import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar
} from 'react-native'
import * as firebase from 'firebase'
import { FirebaseWrapper } from '../firebase/firebase';
import { throwStatement } from '@babel/types';
import {Actions} from 'react-native-router-flux'


export default class LogoutScreen extends Component {
  constructor(props) {
    super(props);
  }

  async signOut() {
    await firebase.auth().signOut()
    this.props.navigation.navigate('Welcome')
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>Are you sure you'd like to logout?</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => this.signOut()}
            >
              <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Recipes')}>
            <Text style={styles.redirect}>Stay logged in</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c9f9ff"
  },
  welcome: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20
  },
  input: {
    width: "50%",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#ffffff"
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userBtn: {
    backgroundColor: "#ffffff",
    padding: 15,
    width: "75%",
    display: "flex",
    borderRadius: 7,
  },
  btnText: {
    fontSize: 18,
    textAlign: "center"
  },
  redirect: {
    marginTop: 20,
    fontSize: 16
  }
});