import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {Header} from '../components/Header'

export default function RecipesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header text='Recipes' />
    </ScrollView>
  );
}

RecipesScreen.navigationOptions = {
  title: 'Recipes',
};

const styles = StyleSheet.create({
  container: {
  },
});
