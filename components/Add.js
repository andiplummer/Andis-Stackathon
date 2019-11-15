import React, { Component } from 'react'
import {Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  TextInput, 
  Image,
  Button,
  TouchableHighlight, 
  SafeAreaView, 
  TouchableOpacity} 
  from 'react-native'
  import {Header} from './Header'
  // import * as ImagePicker from 'react-native-image-picker'
  import * as ImagePicker from 'expo-image-picker'
  import Constants from 'expo-constants';
  import * as Permissions from 'expo-permissions';


  const options = {
    mediaTypes: 'Images',
    base64: true,
    quality: 1,
  }

  export class Add extends Component {
    constructor(props) {
      super(props) 
        this.state = {
          image: null,
        }
    }

    async getPermissionCameraRoll() {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status !== 'granted') {
          alert('Please enable camera roll access to upload photos')
        }
      }
    }

    selectImage() {
      this.getPermissionCameraRoll()
      ImagePicker.launchImageLibraryAsync(options)
    }

    render() {
      return (
        <View style={styles.container}>
          <TouchableOpacity 
            style={styles.addBtn}
            // on Press render drawer nav from bottom to select from camera roll, manual, or take pic
            onPress={()=> this.setState({ modalVisible: true })}
          >
            <Text style={styles.addText}>Add a recipe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.selectImage()}
          >
          </TouchableOpacity>
      
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    }, 
    addBtn: {
      width: '50%',
      backgroundColor: '#e0feff',
      height: 50,
      marginTop: 40,
      borderRadius: 7,
    }, 
    addText: {
      textAlign: 'center',
      fontSize: 20,
      padding: 15,
    },
    modal: {
      height: 300,
    }
  })