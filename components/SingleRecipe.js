import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { FlatList } from "react-native-gesture-handler";

export class SingleRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      directions: [],
      imageUrl: '',
      favorite: false,
      servingSize: '',
      calories: '',
      images: [],
      recipeName: ""
    };
  }

  componentDidMount() {
    const recipe = this.props.navigation.getParam("recipe");
    const recipeName = this.props.navigation.getParam("recipeName");
    const images = this.props.navigation.getParam("images");

    this.setState({
      recipeName: recipeName
    });

    if (recipe) {
      this.setState({
        recipe: recipe
      })
      const recipeKey = Object.keys(recipe);
      const recipeObj = recipe[recipeKey];
      let keys = Object.keys(recipeObj)
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] && keys[i] !== 'ingredients') {
          this.setState({
            [keys[i]]: recipeObj[keys[i]]
          })
        }
        if (keys[i] === 'ingredients') {
          let ingredientsArr = []
          recipeObj[keys[i]].split(',').forEach(ingredient => {
            let word = []
            ingredient = ingredient.split('')
            for (let i = 1; i < ingredient.length; i++) {
              if (i === 1) {
                if (ingredient[i - 1] === ' ') {
                  word.push(ingredient[i].toUpperCase())
                } else {
                  word.push(ingredient[i - 1], ingredient[i])
                }
              } else {
                word.push(ingredient[i])
              }
            }
            ingredientsArr.push(word.join(''))
          })
          this.setState({
            ingredients: ingredientsArr
          })
        }
      }
    }

    if (images) {
      let imagesArr = [];
      const imageKeys = Object.keys(images);
      for (let i = 0; i < imageKeys.length; i++) {
        imagesArr.push(images[imageKeys[i]].url);
      }
      imagesArr = imagesArr.reverse();
      this.setState({
        images: imagesArr,
        recipeName: recipeName
      });
    }
  }

  render() {
    console.log("STATEEEE", this.state);
    return (
      <ScrollView style={styles.container}>
        <ReactNativeZoomableView style={{marginBottom: 20}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => this.props.navigation.navigate("Recipes")}
            >
              <Ionicons name="md-arrow-round-back" size={24} />
              <TouchableOpacity>
                <Text
                  style={styles.backTxt}
                  onPress={() => this.props.navigation.navigate("Recipes")}
                >
                  All recipes
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View style={styles.recipeHeader}>
            {this.state.recipeName ? (
              <Text style={styles.headerTxt}>{this.state.recipeName}</Text>
            ) : null}
            {this.state.images ? this.state.images.map((url, index) => {
              return (
                <Image key={index} style={styles.image} source={{ uri: url }} />
              );
            }) : null}
    
          </View>
          <View style={styles.ingredientsContainer}>
              <Text style={styles.sectionHeader}>Ingredients</Text>
              { !this.state.ingredients[0] ? <Text style={styles.plainText}>No ingredients to display</Text> : null }
              { this.state.ingredients ? this.state.ingredients.map((ingredient, index) => {
              return <Text style={styles.plainText} key={index}>{ingredient}</Text>
            }) : null  }
          </View> 
          <View style={styles.ingredientsContainer}>
              <Text style={styles.sectionHeader}>Directions</Text>
              { !this.state.directions[0] ? <Text style={styles.plainText}>No directions to display</Text> : null }
              { this.state.directions ? 
                <Text style={styles.plainText}>{this.state.directions}</Text>
             : null }
          </View> 
          <View style={styles.ingredientsContainer}>
            <Text style={styles.sectionHeader}>Nutrition information</Text>
            {
              !this.state.servingSize && !this.state.calories ? <Text style={styles.plainText}>No nutrition information to display</Text> : null
            }
              { this.state.servingSize ? 
                <View style={styles.nutrition}>
                  <Text style={styles.plainText}>Serving size:</Text>
                  <Text style={styles.plainText} style={styles.plainText}>{this.state.servingSize}</Text>                
                </View>
             : null}
             { this.state.calories ? 
                <View style={styles.nutrition}>
                  <Text style={styles.plainText}>Calories:</Text>
                  <Text style={styles.plainText}>{this.state.calories}</Text>                
                </View>
             : null}
          </View> 
        </ReactNativeZoomableView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c9f9ff",
    paddingBottom: 20,
  },
  backBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 20
  },
  backTxt: {
    fontSize: 20,
    textAlignVertical: "center",
    marginLeft: 10
  },
  headerTxt: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 30,
    marginTop: 10
  },
  image: {
    width: '80%',
    height: 400,
    marginTop: 30,
    alignSelf: "center",
    resizeMode: 'contain'
  },
  recipeHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  ingredientsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 40,
    marginTop: 10,
    width: '80%',
    paddingBottom: 5,
  },
  sectionHeader: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5,
  },
  plainText: {
    fontSize: 16,
    marginLeft: 5,
  },
  nutrition: {
    display: 'flex',
    flexDirection: 'row'
  }
});
