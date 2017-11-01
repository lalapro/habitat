import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

export default class AddEcosystem extends Component {
  static navaigationOptions = {
    title: 'Choose your Ecosystem!'
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >
        {ecobuddies.map((ele, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => {navigate('Title', { 
              avatar: this.props.navigation.state.params.avatar,
              eco: i
            })}}>
              <Image source={ecobuddies[i][1][1]} />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const ecobuddies = [
  [
    [0, require("../assets/habit@/starfish-gray.png")],
    [1, require("../assets/habit@/starfish-sm.png")],
    [2, require("../assets/habit@/starfish-md.png")],
    [3, require("../assets/habit@/starfish-lg.png")]
  ],
  [
    [0, require("../assets/habit@/butterfly-gray.png")],
    [1, require("../assets/habit@/butterfly-sm.png")],
    [2, require("../assets/habit@/butterfly-md.png")],
    [3, require("../assets/habit@/butterfly-lg.png")]
  ],
  [
    [0, require("../assets/habit@/ladybug-gray.png")],
    [1, require("../assets/habit@/ladybug-sm.png")],
    [2, require("../assets/habit@/ladybug-md.png")],
    [3, require("../assets/habit@/ladybug-lg.png")]
  ]
]