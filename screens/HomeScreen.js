import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  View,
  Button,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {Post} from '../components/Posts';
import { TextInput } from 'react-native-gesture-handler';
import { FirebaseWrapper } from '../firebase/firebase';
import {Header} from '../components/Header'

export default class HomeScreen extends React.Component{
  constructor() {
    super()
    this.state = {
      modalVisible: false,
      text: '',
      posts: []
    }
  }

  // async componentDidMount() {
  //   // sets up listener and gets any info in posts collection in db and adds to state 
  //   await FirebaseWrapper.GetInstance().SetupCollectionListener('/posts', (posts) => {
  //     this.setState({ posts })
  //   })
  // }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button 
              title="Folders"
              color='#ffffff'
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button style={styles.button}
              title="Recipes"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button style={styles.button}
              title="Favorites"
            />
          </View>
        </View>
        
        <ScrollView>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </ScrollView>

        <ModalExample modalVisible={this.state.modalVisible} />
      </View>
    )
  }
  
}

HomeScreen.navigationOptions = {
  header: null,
};

class ModalExample extends Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false,

    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <TextInput value={this.state.text} onChange={(text) => this.setState({ text })} />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  button: {
    backgroundColor: '#ff009d',
    height: 30,
    borderRadius: 7,
    borderStyle: 'solid',
    borderColor: '#ff009d'
  }
})
