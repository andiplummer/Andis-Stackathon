import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native'
import * as firebase from 'firebase'


export default class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  signUp() {
    try {
      firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
      console.log('created user: ', this.state.username)      
    } catch (error) {
      console.log(error)
    }
  }

  signIn() {
    try {
      firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password) 
      console.log('logged in as: ', this.state.username)
    } catch (error) {
      console.log(error)
    }
  }

 render() {
   return (
     <SafeAreaView style={styles.container}>
       <StatusBar
          backgroundColor='#f0ffff'
          barStyle='light-content'
        />
       <Text style={styles.welcome}>Login</Text>
       <TextInput
          style={styles.input}
          placeholder='Username'
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
       />
       <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
       />
       <View style={styles.btnContainer}>
        <TouchableOpacity 
          style={styles.userBtn}
          onPress={() => this.signIn()}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.userBtn}
          onPress={() => this.signUp()}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity >
        <TouchableOpacity 
          style={styles.logout}
          onPress={() => this.signUp()}
        >
          <Text style={styles.btnText}>Sign Out</Text>
        </TouchableOpacity >
       </View>
     </SafeAreaView>
   )
 }
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0feff'
  },
  welcome: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff'
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  userBtn: {
    backgroundColor: '#ffffff',
    padding: 15,
    width: '45%',
    display: 'flex'
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center'
  },
  logout: {
    display: 'none'
  }
})