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
  import {FontAwesome5, Feather, AntDesign} from '@expo/vector-icons'
  import { FirebaseWrapper } from '../firebase/firebase';
  import {RecipeForm} from './AddRecipeForm'

  export class Add extends Component {
    constructor(props) {
      super(props) 
        this.state = {
          name: '',
          images: [],
          modalVisible: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRemovePhoto = this.handleRemovePhoto.bind(this)
    }

    closeModal() {
      this.setState({ modalVisible: !this.state.modalVisible })
    }

    async getPermissionCameraRoll() {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status !== 'granted') {
          Alert.alert('Oops!', 'Please enable camera roll access to upload photos')
        }
      }
    }

    async getPermissionCamera() {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        if (status !== 'granted') {
          Alert.alert('Oops!', 'Please enable camera access to take photos')
        }
      }
    }

    async selectImage() {
      await this.getPermissionCameraRoll()
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        quality: 1,
        base64: true,
        allowsMultipleSelection: true,
      })
      const savedImg = {
        url: image.uri,
        favorite: false
      }
      this.setState({
        images: [...this.state.images, savedImg]
      })
    }

    async takePicture() {
      await this.getPermissionCamera()
      await this.getPermissionCameraRoll()
      const image = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
        quality: 1,
        base64: true,
        allowsMultipleSelection: true,
      })
      const savedImg = {
        url: image.uri,
        favorite: false
      }
      this.setState({
        images: [...this.state.images, savedImg]
      })
    }

    handleRemovePhoto() {
      this.setState({
        images: [],
        name: ''
      })
      console.log('state', this.state)
    }

    async handleSubmit() {
      if (!this.state.name || !this.state.images) {
        Alert.alert('Oops!', 'Please enter a recipe name and snap a photo to add a recipe')
      } else {
      const userId = firebase.auth().currentUser.uid
      const recipeName = this.state.name
      if (!this.state.images) {
        Alert.alert('Missing Photo', 'Please take or upload a photo of the recipe you would like to add')
      } else {
        this.state.images.forEach(async (image, index) => {
          // Adding images to firebase storage
          const blob = await new Promise( async (resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.responseType = 'blob';
          xhr.open('GET', image.url, true);
          xhr.send(null);
          })
          const ref = await firebase
            .storage()
            .ref()
            .child(`users/${userId}/${recipeName}/recipeImages/${index}`);
          let snapshot = await ref.put(blob);
          const downloadUrl = await snapshot.ref.getDownloadURL();
          
          // Adding images to database as download url 
          await firebase.database().ref(`/users/${userId}/recipes/${recipeName}/images`).push({
            url: downloadUrl,
            favorite: image.favorite
          })
        })
        this.setState({
          name: '',
          images: []
        })
        }
      Alert.alert('Success!', 'Recipe added :)')
      }
    }

    render() {
      return (
        <View>
        <ScrollView>
        <View style={styles.container}>
          <Text style={styles.addText }>Add a new recipe</Text>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <TextInput placeholder="Recipe name" style={styles.input} value={this.state.name} onChangeText={(text) => this.setState({ name: text })} />
          </TouchableWithoutFeedback>
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => this.state.name ? this.selectImage() : Alert.alert('Oops!', 'Please enter a recipe name before uploading a photo')}>
              <Feather name="upload" color="black" size={80} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.state.name ? this.takePicture() : Alert.alert('Oops!', 'Please enter a recipe name before taking a photo')}>
              <Feather name="camera" color="black" size={80} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.setState({ modalVisible: true })}>
              <Feather name="edit" color="black" size={80} />
            </TouchableOpacity>
          </View>
          <View>
            {
              !this.state.images[0] ? null : 
                 <TouchableOpacity onPress={() => (this.handleRemovePhoto())}>
                  <Text style={{fontSize: 24, textAlign: 'center'}} >Clear selected photos</Text>
                </TouchableOpacity>
             
            }
         
            { this.state.images ?
              this.state.images.map((image, index) => {
                  return (
                    <View key={index}>
                      <Image style={styles.img} key={index} source={{ uri: image.url }} />
                      {/* <AntDesign key={index} name="delete" size={24} onPress={() => this.removePhoto(index)} /> */}
                    </View>
                  )
            }) : <Text>No photos selected</Text>
          }
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => this.handleSubmit()}
            >
              <Text style={styles.btnText}>Add Recipe</Text>
            </TouchableOpacity>
          </View>
            
          <RecipeForm modalVisible={this.state.modalVisible} closeModal={() => this.closeModal()} />
        </View>
        </ScrollView>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#c9f9ff",
      flexDirection: 'column',
      alignItems: 'center',
      height: 2000,
      paddingTop: 30,
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
    imageContainer: {
      marginTop: 30,
    },
    img: {
      width: 300,
      height: 300,
      marginTop: 30,
    },
    selected: {
      fontSize: 24,
      marginTop: 40,
    },
    btnContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    userBtn: {
      backgroundColor: "white",
      padding: 15,
      width: "75%",
      display: "flex",
      borderRadius: 7,
    },
    btnText: {
      fontSize: 20,
      textAlign: "center",
      color: 'black',
    }
  })