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
import Icon from 'react-native-vector-icons/Ionicons';

export default class CategoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      image: ''
    }
  }
  

  async addCategory() {
    // make call to firebase
    await FirebaseWrapper.GetInstance().CreateNewDocument('categories', {
      name: this.state.name,
      image: this.state.image
    })
    this.setState({
      name: '',
      image: ''
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
            <Icon 
              name='ios-backspace'
              size={30}
              style={styles.close}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Add a new category</Text>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text>Name: </Text>
              <TextInput 
              onChangeText={(text) => this.setState({ name: text})}
              value={this.state.name}
              style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text>Image Url:</Text>
              <TextInput 
                onChangeText={(text) => this.setState({ image: text})}
                value={this.state.image}
                style={styles.input}
              />
            </View> 
            </View>
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
  header: {
    textAlign: 'center',
    fontSize: 30
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dadada',
    height: 25,
    width: 250,
    margin: 20
  }, 
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  close: {
    textAlign: 'right',
    margin: 20,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: 40,
  }
})