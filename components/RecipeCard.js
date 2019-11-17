import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { SingleRecipe } from "./SingleRecipe";
import { FontAwesome5, Feather, Ionicons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      color: "black"
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  handleFavorite() {
    console.log("CLicked!!");
    if (this.state.favorite === false) {
      this.setState = {
        favorite: false,
        color: "black"
      };
    } else {
      this.setState = {
        favorite: true,
        color: "red"
      };
    }
    console.log(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Recipe", {
              recipe: this.props.recipe
            });
          }}
        >
          <Text style={styles.text}>{this.props.recipe.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleFavorite}>
          <Feather
            name="heart"
            size={25}
            color={this.props.recipe.favorite ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    width: "80%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 18
  },
  image: {
    width: 150,
    height: 150
  }
});

export default withNavigation(RecipeCard);
