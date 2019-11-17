import React, { Component } from 'react'
import {Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  TextInput, 
  Image,
  TouchableHighlight, 
  SafeAreaView, 
  TouchableOpacity} 
  from 'react-native'
  import * as firebase from 'firebase'

  export class Recipes extends Component {
  
    constructor(props) {
      super(props)
      this.state = {
        recipes: []
      }
    }

    async getImageUrl() {
      const userId = firebase.auth().currentUser.uid
      const ref = firebase
            .storage()
            .ref()
            .child(`userImages/${userId}`);
      ref.getDownloadURL().then(function(url) {
      return url
      })
    }

    render() {
      return (
        <ScrollView style={styles.container}>
        </ScrollView>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#e6fcff'
    }
  })