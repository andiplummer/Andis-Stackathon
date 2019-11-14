import React, { Component } from 'react'
import {Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  TextInput, 
  TouchableHighlight, 
  SafeAreaView, 
  TouchableOpacity} 
  from 'react-native'
import CategoryForm from './AddCategoryForm'

export class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      categories: []
    }
  }

  closeModal() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> this.setState({ modalVisible: true })} style={styles.buttonContainer}>
          <Text style={styles.addBtn}>New Category</Text>
        </TouchableOpacity>
        <CategoryForm modalVisible={this.state.modalVisible} closeModal={() => this.closeModal()} />
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
  },
  addBtn: {
    textAlign: 'center',
    fontSize: 15,
  }
})
