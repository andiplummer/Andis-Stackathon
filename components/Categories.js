import React, { Component } from 'react'
import {Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  TextInput, 
  Image,
  TouchableHighlight, 
  SafeAreaView, 
  TouchableOpacity} 
  from 'react-native'
import CategoryForm from './AddCategoryForm'
import CategoryCard from './CategoryCard'
import { FirebaseWrapper } from '../firebase/firebase';

export class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  async componentDidMount() {
    await FirebaseWrapper.GetInstance().SetupCollectionListener('categories', (categories) => {
      this.setState({ categories })
    })
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.categories.map(category => {
            return <CategoryCard navigation={this.props.navigation} category={category} key={category.id} />
          })
        }
      </ScrollView>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
  },
  addBtn: {
    textAlign: 'center',
    fontSize: 15,
  }
})
