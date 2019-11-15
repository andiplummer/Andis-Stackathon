import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  Image,
  TouchableOpacity
} from 'react-native'
import CategoryForm from './AddCategoryForm';
import RecipeForm from './AddRecipeForm'
import Icon from 'react-native-vector-icons/Ionicons';


export class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      modalVisible: false,
    }
  }

  closeModal() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
        <TouchableOpacity onPress={()=> this.setState({ modalVisible: true })} style={styles.buttonContainer}>
          <Icon
            name="md-add-circle-outline"
            size={35}
          />
        </TouchableOpacity>
        {
          this.props.text === 'Categories' ? 
            <CategoryForm modalVisible={this.state.modalVisible} closeModal={() => this.closeModal()} />
            : 
            <RecipeForm modalVisible={this.state.modalVisible} closeModal={() => this.closeModal()} />
        }
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
  },
  buttonContainer: {
    marginRight: 10,
  }
})