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
          <TouchableOpacity>
            <Text style={styles.redirect} onPress={() => this.props.navigation.navigate('Signup')}>Need an account? Sign up here!</Text>
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
    backgroundColor: "#e0feff"
  },
  welcome: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20
  },
  input: {
    width: "90%",
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
    width: "90%",
    display: "flex",
    borderRadius: 7,
  },
  btnText: {
    fontSize: 18,
    textAlign: "center"
  },
  redirect: {
    marginTop: 10,
  }
});