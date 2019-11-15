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

  const options = {
    title: 'Add a new recipe',
    takePhotoButtonTitle: 'Take photo',
    chooseFromLibraryButtonTitle: 'Choose photo from library'
  }

  export class Add extends Component {
    constructor(props) {
      super(props) 
        this.state = {
          avatarSource: null
        }
    }

    selectImage() {
      // alert('clicked')
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            avatarSource: source,
          });
        }
      });
    }

    render() {
      return (
        <View style={styles.container}>
          <Text>Add a recipe</Text>
          <TouchableOpacity
            onPress={this.selectImage}
          >
            <Text>Select Image</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row'
    }
  })