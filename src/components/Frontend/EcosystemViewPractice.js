import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image, PanResponder } from 'react-native';

export default class EcosystemViewPractice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            data: [1,2,3,4,5]
        }
        this.animate = this.animate.bind(this);
        this.animations = [];
        if (!!this.props.location.tasks) {
          
          this.props.location.tasks.forEach((ele, index) => {
            this.animations[index] = new Animated.ValueXY({x: Math.random() * 100, y:  Math.random() * 100})
          })
        }
        
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (event, gestureState) => true,
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
            onPanResponderMove: Animated.event([
                null, {dx: this.x, dy: this.y}
            ])
            // onPanResponderRelease: (event, gestureState) => {
            //     Animated.spring(this, {
            //         toValue: {x: 0, y: 0}                    
            //     }).start();
            // }
        });
    }

    componentDidMount() {
        this.animate()
  }
    animate(){
        return this.animations.map((ele, i) => {
            let height = 300 * Math.random() * 0.6;
            let width = 300 * Math.random() * 0.9;
            Animated.timing(ele, {
                toValue: {x: width, y: height},
                duration: 6000,
                delay: 500
            }).start();
            return <Animated.View {...this.panResponder.panHandlers} key={i} style={ele.getLayout()}>
                    <Image source={toast[0][1]} style={{borderRadius: 50, width: 60, height: 50}}/>
                </Animated.View>
            });
    }

    render() {
        setInterval(this.animate, 1500);
        return (
            <View>
                {this.animate()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  ball: {
    height: 60,
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
  }
})

const toast = [
  [0, require("../assets/Ecosystem/toast0.png")],
  [1, require("../assets/Ecosystem/toast1.png")],
  [2, require("../assets/Ecosystem/toast2.png")]
];

const tree = [
  [0, require("../assets/Ecosystem/tree0.png")],
  [1, require("../assets/Ecosystem/tree1.png")],
  [2, require("../assets/Ecosystem/tree2.png")]
];