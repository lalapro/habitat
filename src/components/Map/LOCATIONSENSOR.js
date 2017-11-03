import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image, PanResponder, Easing } from 'react-native';


const { width, height } = Dimensions.get("window");

const ceiling = height * 1/3 - 50;
const sides = width - 50;

export default class LocationSensor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      position: new Animated.ValueXY({x: this.getRandomInt(50, 300), y: this.getRandomInt(50, 300)}),
      version: props.version
    }
    this.animate = this.animate.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    Animated.timing(this.state.position, {
			toValue: ({x: this.getRandomInt(50, 300), y: this.getRandomInt(100, 400)}),
			duration: this.getRandomInt(3500, 5000),
      delay: this.getRandomInt(200, 1500),
      userNativeDriver: true
		}).start(() => this.animate());
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


  render() {
    return (
      <View>
        <Animated.View style={this.state.position.getLayout()}>
          <View style={{width: sizeKey[this.state.version], height: sizeKey[this.state.version]}}>
            <Image source={ecobuddies[this.props.img][this.state.version][1]} style={{resizeMode: 'contain', width: "100%", height: "100%"}}/>
          </View>
        </Animated.View>
      </View>
    )
  }
}

const sizeKey = {
  0: 25, // dead
  1: 10, // inprogress
  2: 25, // complete
  3: 50, // complete upgrade
  4: 50  // dead upgrade
}



const styles = StyleSheet.create({
  ball: {
    height: 40,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black'
  },
  square: {
      height: 60,
      width: 60,
      borderWidth: 30,
      borderColor: 'red'
  },
  image: {
    width: 100,
    height: 100
  }
})

const ecobuddies = [
  [
    [0, require("../assets/habit@/starfish-gray.png")],
    [1, require("../assets/habit@/starfish-sm.png")],
    [2, require("../assets/habit@/starfish-md.png")],
    [3, require("../assets/habit@/starfish-lg.png")],
    [4, require("../assets/habit@/starfish-gray.png")]
  ],
  [
    [0, require("../assets/habit@/butterfly-gray.png")],
    [1, require("../assets/habit@/butterfly-sm.png")],
    [2, require("../assets/habit@/butterfly-md.png")],
    [3, require("../assets/habit@/butterfly-lg.png")],
    [4, require("../assets/habit@/butterfly-gray.png")]
  ],
  [
    [0, require("../assets/habit@/ladybug-gray.png")],
    [1, require("../assets/habit@/ladybug-sm.png")],
    [2, require("../assets/habit@/ladybug-md.png")],
    [3, require("../assets/habit@/ladybug-lg.png")],
    [0, require("../assets/habit@/ladybug-gray.png")],
  ]
]
