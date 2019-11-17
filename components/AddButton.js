import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Animated, Modal } from 'react-native'
import {FontAwesome5, Feather} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {RecipeForm} from './AddRecipeForm'
import * as firebase from 'firebase'
import {Add} from './Add'
// import {getPermissionCamera, getPermissionCameraRoll, selectImage, takePicture} from './IosCamera'

export class AddButton extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      image: '',
      modalVisible: false
    }
  }

  closeModal() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  // buttonSize = new Animated.Value(1)
  // mode = new Animated.Value(0)

  // async handlePress() {
  //   await Animated.sequence([
  //     Animated.timing(this.buttonSize, {
  //       toValue: 0.95,
  //       duration: 50
  //     }),
  //     Animated.timing(this.buttonSize, {
  //       toValue: 1
  //     }),
  //     Animated.timing(this.mode, {
  //       toValue: this.mode._value === 0 ? 1 : 0
  //     })
  //   ]).start()
  // }

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
      allowsEditing: true,
      allowsMultipleSelection: true,
    })
    this.uploadImageToFirebase(image.uri)
  }

  async takePicture() {
    await this.getPermissionCamera()
    await this.getPermissionCameraRoll()
    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
      quality: 1,
      base64: true,
      allowsEditing: true,
      allowsMultipleSelection: true,
    })
    this.uploadImageToFirebase(image.uri)
  }

  async uploadImageToFirebase(uri) {

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
        .child(`userImages/${userId}`);

    let snapshot = await ref.put(blob);

    return await snapshot.ref.getDownloadURL();
};


  render() {
    const sizeStyle = {
      transform: [{ scale: this.buttonSize }]
    }

    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg']
    })

    const thermometerX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, -100]
    })

    const thermometerY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100]
    })

    const timeX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, -24]
    })

    const timeY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -150]
    })

    const activityX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, 50]
    })

    const activityY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100]
    })

    return (
      <View style={{position: 'absolute', alignItems: 'center'}}>
        {/* <Animated.View style={{position: 'absolute', left: thermometerX, top: thermometerY }}>
          <TouchableHighlight style={styles.secondaryButton} onPress={() => this.takePicture()} underlayColor="transparent" >
            <Feather name='camera' size={24} color='black' />
          </TouchableHighlight>
        </Animated.View>
        <Animated.View style={{position: 'absolute', left: timeX, top: timeY }}>
          <TouchableHighlight style={styles.secondaryButton} onPress={() => this.selectImage()} underlayColor="transparent">
            <Feather name='upload' size={24} color='black' />
          </TouchableHighlight>
        </Animated.View>
          <Animated.View style={{position: 'absolute', left: activityX, top: activityY }}>
          <TouchableHighlight style={styles.secondaryButton} underlayColor="transparent" >
            <Feather name='edit' size={24} color='black' />
          </TouchableHighlight>
        </Animated.View>        
        <Animated.View style={[styles.button, sizeStyle]} >
          <TouchableHighlight style={{ alignItems: 'center', justifyContent: 'center'}} underlayColor="transparent">
              <Animated.View style={{ transform: [{ rotate: rotation }] }} >
                <FontAwesome5 stylle={styles.plus} name="plus" size={30} color="#ffffff" />
              </Animated.View>
          </TouchableHighlight>
        </Animated.View> */}
        <View style={styles.button} >
          <TouchableHighlight style={{ alignItems: 'center', justifyContent: 'center'}} underlayColor="transparent">
              <View>
                <FontAwesome5 stylle={styles.plus} name="plus" size={30} color="#ffffff" />
              </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#b0eff5',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
    position: 'absolute',
    top: -75,
    zIndex: 3,
    shadowColor: '#7dd1e3',
    shadowRadius: 5,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    borderWidth: 3, 
    borderColor: '#ffffff'
  },
  secondaryButton: {
    position: 'absolute',
    alignItems: 'center', 
    justifyContent: 'center',
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#b0eff5'
  },
  plus: {
    position: 'absolute'
  }
})