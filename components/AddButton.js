import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Animated } from 'react-native'
import {FontAwesome5, Feather} from '@expo/vector-icons'

export class AddButton extends React.Component {

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  buttonSize = new Animated.Value(1)
  mode = new Animated.Value(0)

  handlePress() {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 100
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1
      }),
      Animated.timing(this.mode, {
        toValue: this.mode._value === 0 ? 1 : 0
      })
    ]).start() 
  }

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
        <Animated.View style={{position: 'absolute', left: thermometerX, top: thermometerY }}>
          <View style={styles.secondaryButton}>
            <Feather name='thermometer' size={24} color='#e0feff' />
          </View>
        </Animated.View>
        <Animated.View style={{position: 'absolute', left: timeX, top: timeY }}>
          <View style={styles.secondaryButton}>
            <Feather name='clock' size={24} color='#e0feff' />
          </View>
        </Animated.View>
        <Animated.View style={{position: 'absolute', left: activityX, top: activityY }}>
          <View style={styles.secondaryButton}>
            <Feather name='activity' size={24} color='#e0feff' />
          </View>
        </Animated.View>
        <Animated.View style={[styles.button, sizeStyle]} >
          <TouchableHighlight underlayColor="#e0feff" onPress={this.handlePress}>
              <Animated.View style={{ transform: [{ rotate: rotation }] }} >
                <FontAwesome5 name="plus" size={24} color="#ffffff" />
              </Animated.View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e0feff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    position: 'absolute',
    top: -60,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e0feff'
  }
})