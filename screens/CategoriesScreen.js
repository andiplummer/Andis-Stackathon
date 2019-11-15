import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  View,
  Button,
  SafeAreaView,
} from 'react-native';
import {Categories} from '../components/Categories'
import {Header} from '../components/Header'

export default class HomeScreen extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text='Categories' />
        <Categories navigation={this.props.navigation} />
      </View>
    )
  }
  
}


const styles = StyleSheet.create({
  container: {
  
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  button: {
    height: 30,
  }
})