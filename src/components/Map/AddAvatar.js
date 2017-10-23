import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Image, Dimensions, TouchableOpacity } from "react-native";
import { StackNavigator, NavigationActions } from 'react-navigation';


export default class AddAvatar extends React.Component {
  static navigationOptions = {
    title: 'Choose your ecobuddy!'
  };


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {images.map((pic, key) => {
          return (
            <TouchableOpacity key={key} onPress={() => navigate('Title', {avatar: pic[0]})}>
              <Image
                source={pic[1]}
                style={styles.ecobuds}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    );
  }
}

const images = [
  [0, require("../assets/home2.png")],
  [1, require("../assets/work2.png")],
  [2, require("../assets/gym.png")],
  [3, require("../assets/egg5.png")]
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ecobuds: {
    width: 100,
    height: 100
  }
})
