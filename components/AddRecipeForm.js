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
import { throwStatement } from '@babel/types';

export default class RecipeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      image: '',
      ingredients: [],
      directions: [],
      calories: 0,
      tags: [],
      favorite: false,
      servingSize: 0,
    }
  }
  

  async addRecipe() {
    // make call to firebase
    await FirebaseWrapper.GetInstance().CreateNewDocument('recipes', {
      name: this.state.name,
      image: this.state.image,
      ingreients: this.state.ingredients,
      directions: this.state.directions,
      calories: this.state.calories,
      tags: this.state.tags,
      favorite: this.state.favorite,
      servingSize: this.state.servingSize
    })
    this.setState({
      name: '',
      image: '',
      ingredients: [],
      directions: [],
      calories: 0,
      tags: [],
      favorite: false,
      servingSize: 0,
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
          <Text style={styles.header}>Add a new recipe</Text>
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
              <Text>Image url:</Text>
              <TextInput 
                onChangeText={(text) => this.setState({ image: text})}
                value={this.state.image}
                style={styles.input}
              />
            </View> 
            <View style={styles.inputContainer}>
              <Text>Ingredients:</Text>
              <TextInput 
                onChangeText={(text) => this.setState({ ingredients: text})}
                value={this.state.ingredients}
                style={styles.input}
              />
            </View> 
            <View style={styles.inputContainer}>
              <Text>Directions:</Text>
              <TextInput 
                onChangeText={(text) => this.setState({ directions: text})}
                value={this.state.directions}
                style={styles.input}
              />
            </View> 
            <View style={styles.inputContainer}>
              <Text>Serving size:</Text>
              <TextInput 
                onChangeText={(text) => this.setState({ servingSize: text})}
                value={this.state.servingSize}
                style={styles.input}
              />
            </View> 
            <View style={styles.inputContainer}>
              <Text>Calories:</Text>
              <TextInput 
                onChangeText={(text) => this.setState({ calories: text})}
                value={this.state.calories}
                style={styles.input}
              />
            </View> 
            <View style={styles.inputContainer}>
              <Text>Tags:</Text>
              <TextInput 
                onChangeText={(text) => this.setState({ servingSize: text})}
                value={this.state.servingSize}
                style={styles.input}
              />
            </View> 
            </View>
        </View>
        <Button title="Add Recipe" 
          onPress={() => this.addRecipe()} 
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