import React, { Component } from 'react'
import {Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  TextInput, 
  Image,
  Keyboard,
  Button,
  Alert,
  TouchableHighlight, 
  TouchableWithoutFeedback,
  SafeAreaView, 
  TouchableOpacity} 
  from 'react-native'
  import {Header} from './Header'
  // import * as ImagePicker from 'react-native-image-picker'
  import * as ImagePicker from 'expo-image-picker'
  import Constants from 'expo-constants';
  import * as Permissions from 'expo-permissions';
  import * as firebase from 'firebase'
  import {FontAwesome5, Feather} from '@expo/vector-icons'
import { FirebaseWrapper } from '../firebase/firebase';
import {RecipeForm} from './AddRecipeForm'


  export class Add extends Component {
    constructor(props) {
      super(props) 
        this.state = {
          recipeName: '',
          image: null,
          modalVisible: false
        }
        this.uploadImageToFirebase = this.uploadImageToFirebase.bind(this)
    }

    closeModal() {
      this.setState({ modalVisible: !this.state.modalVisible })
    }

    async getPermissionCameraRoll() {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status !== 'granted') {
          alert('Please enable camera roll access to upload photos')
        }
      }
    }

    async getPermissionCamera() {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        if (status !== 'granted') {
          alert('Please enable camera access to take photos')
        }
      }
    }

    async selectImage() {
      await this.getPermissionCameraRoll()
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        base64: true,
      })
      this.setState({
        image: image.uri
      })
    }

    async takePicture() {
      await this.getPermissionCamera()
      await this.getPermissionCameraRoll()
      const image = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
        quality: 1,
        base64: true
      })
      this.setState({
        image: image.uri
      })
    }

    async uploadImageToFirebase(uri, recipeName) {

      if (!uri && !recipeName) {
        Alert.alert('Missing Photo', 'Please take or upload a photo of the recipe you would like to add')
      } else {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
              resolve(xhr.response);
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
      });
  
      const userId = firebase.auth().currentUser.uid
  
      const ref = firebase
          .storage()
          .ref()
          .child(`userImages/${userId}/${recipeName}`);
        
      let snapshot = await ref.put(blob);
      const downloadUrl = await snapshot.ref.getDownloadURL();
      recipeName = this.state.recipeName
      await firebase.database().ref(`/users/${userId}/recipes`).push({
        [recipeName]: {
          url: downloadUrl,
        }
      })
      this.setState({
        recipeName: ''
      })
      Alert.alert('Recipe added!', 'View on Recipes page')
    }
  };

    render() {
      return (
        <ScrollView>
        <View style={styles.container}>
          <Text style={styles.addText }>Add a new recipe</Text>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <TextInput placeholder="Recipe name" style={styles.input} value={this.state.recipeName} onChangeText={(text) => this.setState({ recipeName: text })} />
          </TouchableWithoutFeedback>
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => this.state.recipeName ? this.selectImage() : alert('Please enter a recipe name before uploading a photo')}>
              <Feather name="upload" color="black" size={80} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.state.recipeName ? this.takePicture() : alert('Please enter a recipe name before taking a photo')}>
              <Feather name="camera" color="black" size={80} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.setState({ modalVisible: true })}>
              <Feather name="edit" color="black" size={80} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => this.uploadImageToFirebase(this.state.image, this.state.recipeName)}
            >
              <Text style={styles.btnText}>Add Recipe</Text>
            </TouchableOpacity>
          </View>
          <RecipeForm modalVisible={this.state.modalVisible} closeModal={() => this.closeModal()} />
        </View>
        </ScrollView>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e6fcff',
      flexDirection: 'column',
      alignItems: 'center',
      height: 700,
      paddingTop: 125,
    }, 
    addText: {
      textAlign: 'center',
      fontSize: 30,
      padding: 15,
      marginBottom: 20,
    },
    input: {
      width: '75%',
      backgroundColor: 'white',
      height: 50,
      padding: 10,
    },
    icons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '90%',
      marginTop: 40,
      marginBottom: 40,
    },
    img: {
      width: 200,
      height: 200,
    },
    btnContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    userBtn: {
      backgroundColor: "#b0eff5",
      padding: 15,
      width: "75%",
      display: "flex",
      borderRadius: 7,
    },
    btnText: {
      fontSize: 20,
      textAlign: "center",
      color: 'white',
    }
  })