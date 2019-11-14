import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native'
import CategoryForm from './AddCategoryForm';

export class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
  }
})