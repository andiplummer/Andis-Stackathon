import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native'

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>ReciMe</Text>
        <Text style={styles.subHeading}>Login or create an account to get started</Text>
        <View style={styles.btnContainer}>
        <TouchableOpacity 
          style={styles.userBtn}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
       </View>
       <View style={styles.btnContainer}>
        <TouchableOpacity 
          style={styles.userBtn}
          onPress={() => this.props.navigation.navigate('Signup')}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
       </View>
       <Text onPress={() => this.props.navigation.navigate('Dashboard')}>Continue as guest</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0feff'
  },
  header: {
    textAlign: 'center',
    fontSize: 50,
    marginBottom: 20,
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 40,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userBtn: {
    backgroundColor: '#ffffff',
    padding: 15,
    width: '90%',
    display: 'flex',
    marginBottom: 20,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center'
  },
})