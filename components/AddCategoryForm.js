import React, { Component } from 'react'
import { View, 
  StyleSheet, 
  Text, 
  Button, 
  Modal, 
  TouchableHighlight,
  TouchableOpacity
 } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { FirebaseWrapper } from '../firebase/firebase';

export default class CategoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      image: ''
    }
  }
  

  async addCategory() {
    console.log('heloooo', this.state.text)
    // make call to firebase
    await FirebaseWrapper.GetInstance().CreateNewDocument('categories', {
      name: this.state.name,
      image: this.state.image
    })
    this.props.closeModal()
  }

  render() {
    return (
      <Modal 
        animationType='slide'
        transparent={false}
        visible={this.props.modalVisible}
      >
        <View style={{marginTop: 25}}>
          <TouchableOpacity onPress={() => {
            this.props.closeModal()
          }}>
            <Text style={styles.close}>Back</Text>
          </TouchableOpacity>
          <TextInput 
            onChangeText={(text) => this.setState({ name: text})}
            value={this.state.name}
            style={styles.input}
          />
          <TextInput 
            onChangeText={(text) => this.setState({ image: text})}
            value={this.state.image}
            style={styles.input}
          />
        </View>
        <Button title="Add Category" 
          onPress={() => this.addCategory()} 
        />

      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dadada',
    height: 25,
    margin: 20
  }, 
  close: {
    textAlign: 'right',
    margin: 20,
  }
})