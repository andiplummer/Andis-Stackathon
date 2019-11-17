import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar
} from 'react-native'
import * as firebase from 'firebase'
import { FirebaseWrapper } from '../firebase/firebase';
import { throwStatement } from '@babel/types';
import {Actions} from 'react-native-router-flux'


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.resetForm = this.resetForm.bind(this);
  }

  async signIn() {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
      console.log("signed in: ", firebase.auth().currentUser.email);
      this.resetForm();
      this.props.navigation.navigate('Dashboard')
    } catch (error) {
      alert('Username or password incorrect')
      console.log(error);
    }
  }

  resetForm() {
    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            textContentType="emailAddress"
            autoCapitalize="none"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => this.signIn()}
            >
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.redirect}>Need an account? Sign up here!</Text>
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
    width: "75%",
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