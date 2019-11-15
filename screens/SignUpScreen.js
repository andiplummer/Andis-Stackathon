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

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.resetForm = this.resetForm.bind(this);
  }

  async signUp() {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      const userId = firebase.auth().currentUser.uid;
      const email = firebase.auth().currentUser.identifier;
      await FirebaseWrapper.GetInstance().CreateNewDocument(`users`, {
        id: userId,
        email: this.state.email
      });
      this.resetForm();
      this.props.navigation.navigate('Login')
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
        <Text style={styles.welcome}>Sign Up</Text>
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
            onPress={() => this.signUp()}
          >
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.redirect} onPress={() => this.props.navigation.navigate('Login')}>Already have an account? Login here!</Text>
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
    display: "flex"
  },
  btnText: {
    fontSize: 18,
    textAlign: "center"
  },
  redirect: {
    marginTop: 10,
  }
});