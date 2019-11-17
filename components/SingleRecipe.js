import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

export class SingleRecipe extends React.Component {
  render() {
    const recipe = this.props.navigation.getParam("recipe");
    console.log(recipe)
    return (
      <ScrollView style={styles.container}>
        <ReactNativeZoomableView>
        <View style={styles.headerContainer} >
            <TouchableOpacity 
              style={styles.backBtn}
              onPress={() => this.props.navigation.navigate("Recipes")}
            >
              <Ionicons name="md-arrow-round-back" size={24} />
              <TouchableOpacity>
                <Text style={styles.backTxt} onPress={() => this.props.navigation.navigate("Recipes")}>All recipes</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View style={styles.recipeHeader}>
              <Text style={styles.headerTxt}>{recipe.name}</Text>
              <Image style={styles.image} source={{ uri: recipe.url }} />
            </View>  
        </ReactNativeZoomableView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c9f9ff',
  },
  backBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
  },
  backTxt: {
    fontSize: 20,
    textAlignVertical: 'center',
    marginLeft: 10,
  },
  headerTxt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 500,
    marginTop: 30,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  recipeHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
})