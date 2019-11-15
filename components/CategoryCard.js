import React, { Component } from 'react'
import {Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  TextInput, 
  Button,
  Image,
  TouchableHighlight, 
  SafeAreaView, 
  TouchableOpacity} 
  from 'react-native'

  export default CategoryCard = props => {
    return (
      <View style={styles.container}>
        <Image 
          source={{url: props.category.image}}
          style={{width: 150, height: 150}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.category.name}</Text>
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      margin: 10,
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginLeft: 20,
    },
    text: {
      fontSize: 20,
      marginBottom: 10,
    }
  })