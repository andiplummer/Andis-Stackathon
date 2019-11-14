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
  constructor() {
    super()
    this.state = {
      posts: []
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text='Categories' />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button 
              title="Categories"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Recipes"
            />
          </View>
          <View style={styles.button}>
            <Button 
              title="Favorites"
            />
          </View>
        </View>
        <Categories />
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
