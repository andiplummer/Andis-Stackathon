import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Image,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
import RecipeCard  from "./RecipeCard";

export class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;
    const ref = firebase
      .database()
      .ref()
      .child(`/users/${userId}/recipes`);
    ref.on("value", this.getData);
    // this.setState({ loaded: true })
  }

  getData(data) {
    if (!data.val()) {
      console.log("no data");
    } else {
      let names = [];
      const recipes = data.val();
      const keys = Object.keys(recipes);
      for (let i = 0; i < keys.length; i++) {
        let currentKey = keys[i];
        let obj = {
          [currentKey]: recipes[currentKey]
        }
        names.push(obj);
      }
      this.setState({
        recipes: names
      });
      return names;
    }
  }

  render() {
    return (
        this.state.recipes ? 
        <ScrollView style={styles.container}>
          <Text style={styles.welcome}>My Recipes</Text>
          <View style={styles.recipeNameContainer}>
            { this.state.recipes.map((recipe, index) => <RecipeCard key={index} recipe={recipe} />) }
          </View>
        </ScrollView>
        : 
        <ScrollView style={styles.container}>
          <Text style={styles.welcome}>Loading recipes...</Text>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c9f9ff",
  },
  welcome: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 30,
    marginBottom: 20,
  },
  recipeNameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  }
});
