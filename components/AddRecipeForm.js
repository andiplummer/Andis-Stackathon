import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { FirebaseWrapper } from "../firebase/firebase";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome5, Feather, Ionicons } from "@expo/vector-icons";
import * as firebase from 'firebase'

export class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      ingredients: null,
      directions: "",
      calories: "",
      favorite: false,
      servingSize: "",
      favorite: false,
    };
  }

  async addRecipe() {
    if (this.state.name && this.state.ingredients) {
      const userId = firebase.auth().currentUser.uid
      await firebase.database().ref(`/users/${userId}/recipes/${this.state.name}/recipe`).push(this.state)
      this.setState({
        name: "",
        imageUrl: "",
        ingredients: "",
        directions: "",
        calories: "",
        favorite: false,
        servingSize: "",
        imageUrl: "",
        favorite: false,
      })
      Alert.alert('Recipe added!', 'View on Recipes page')
    } else {
      Alert.alert('Oops!', 'Please enter recipe name and ingredients to add a recipe')
    } 
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
      >
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity style={styles.backContainer} onPress={() => this.props.closeModal()}>
              <Ionicons
                name="md-arrow-round-back" size={30}
                style={styles.close}
              />
              <Text style={{fontSize: 16}}>Snap a photo instead</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Manually add a recipe</Text>
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>Name:</Text>
                <TextInput
                  onChangeText={text => this.setState({ name: text })}
                  style={styles.input}
                  value={this.state.name}
                />
              </View>
              {/* <View style={styles.inputContainer}>
                <Text style={styles.text}>Image url:</Text>
                <TextInput
                  onChangeText={text => this.setState({ imageUrl: text })}
                  style={styles.input}
                  value={this.state.imageUrl}
                />
              </View> */}
              <View style={styles.inputContainer}>
                <Text style={styles.text}>Ingredients:</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <TextInput
                    onChangeText={text => this.setState({ ingredients: text })}
                    style={styles.multilineInput}
                    multiline={true}
                    placeholder="Please separate ingredients with commas"
                    value={this.state.ingredients}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>Directions:</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <TextInput
                    onChangeText={text => this.setState({ directions: text })}
                    style={styles.multilineInput}
                    multiline={true}
                    value={this.state.directions}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>Serving size:</Text>
                <TextInput
                  onChangeText={text => this.setState({ servingSize: text })}
                  style={styles.input}
                  value={this.state.servingSize}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>Calories:</Text>
                <TextInput
                  onChangeText={text => this.setState({ calories: text })}
                  style={styles.input}
                  value={this.state.calories}
                />
              </View>
              <View style={styles.btnContainer} onPress={Keyboard.dismiss}>
                <TouchableOpacity
                  style={styles.userBtn}
                  onPress={() =>
                    this.addRecipe()}
                >
                  <Text style={styles.btnText}>Add Recipe</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 1100,
    backgroundColor: "#c9f9ff"
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 20,
    width: 80,
  },
  backContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    width: "70%",
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    marginLeft: 10,
  },
  multilineInput: {
    width: "70%",
    backgroundColor: 'white',
    height: 150,
    padding: 10,
    marginLeft: 10,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: '100%',
    marginTop: 30,
  },
  close: {
    textAlign: "left",
    margin: 20
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 15,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  userBtn: {
    backgroundColor: "white",
    padding: 15,
    width: "75%",
    display: "flex",
    borderRadius: 7
  },
  btnText: {
    fontSize: 20,
    textAlign: "center",
    color: "black"
  }
});
