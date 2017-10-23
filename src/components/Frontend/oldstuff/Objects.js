// import React, { Component } from 'react';
// import { View, StyleSheet, Animated, Dimensions, Image, PanResponder } from 'react-native';
//
// export default class Objects extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			tasks: [],
// 			data: [1,2,3,4,5]
// 		}
// 		this.animate = this.animate.bind(this);
// 		this.animations = [];
// 		this.props.data.tasks.forEach((ele, index) => {
// 			this.animations[index] = new Animated.ValueXY({x: Math.random() * 350, y:  Math.random() * 500})
// 		});
// 		this.panResponder = PanResponder.create({
// 			onMoveShouldSetPanResponder: (event, gestureState) => true,
// 			onStartShouldSetPanResponder: (event, gestureState) => true,
// 			onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
// 			onPanResponderMove: Animated.event([
// 				null, {dx: this.x, dy: this.y}
// 			])
// 			// onPanResponderRelease: (event, gestureState) => {
// 			// 	Animated.spring(this, {
// 			// 		toValue: {x: 0, y: 0}
// 			// 	}).start();
// 			// }
// 		});
// 	}
//
// 	componentDidMount() {
// 		this.animate()
//   }
//
// 	animate(){
// 		return this.animations.map((ele, i) => {
// 			// console.log(this.panResponder)
// 			let height = Dimensions.get('window').height * Math.random() * 0.6;
// 			let width = Dimensions.get('window').width * Math.random() * 0.9;
// 			Animated.timing(ele, {
// 				toValue: {x: width, y: height},
// 				duration: Math.random() * 2000 + 500,
// 				delay: 500
// 			}).start();
// 			return <Animated.View {...this.panResponder.panHandlers} key={i} style={ele.getLayout()}>
// 					<Image source={require('../assets/cute.png')} style={{borderRadius: 50, width: 60, height: 50}}/>
// 				</Animated.View>
// 			});
// 	}
//
// 	render() {
// 		// setInterval(this.animate, 1500);
// 		return (
// 			<View>
// 				{this.animate()}
// 			</View>
// 		)
// 	}
// }
//
// const styles = StyleSheet.create({
//   ball: {
//     height: 60,
//     width: 60,
//     borderRadius: 30,
//     borderWidth: 30,
//     borderColor: 'black'
//   },
//   square: {
//   	height: 60,
//   	width: 60,
//   	borderWidth: 30,
//   	borderColor: 'red'
//   }
// })
