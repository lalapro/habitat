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
// 		// this.animate = this.animate.bind(this);
// 		this.animations = [];
// 		this.props.data.tasks.forEach((ele, index) => {
// 			this.animations[index] = new Animated.ValueXY({x: Math.random() * 350, y:  Math.random() * 500})
// 		});
// 	}
//
// 	// componentWillMount() {
// 	// 	this.animations.forEach(ele => {
// 	// 		return this.animate(ele);
// 	// 	})
//  //  }
//
//  //  animate(ele) {
// 	// 	let height = Dimensions.get('window').height;
// 	// 	let width = Dimensions.get('window').width;
// 	// 	height = Math.random() * height * 0.65;
// 	// 	width = Math.random() * width * 0.95;
// 	// 	this.ele = ele;
// 	// 	Animated.timing(this.ele, {
// 	// 		toValue: {x: width, y: height},
// 	// 		duration: Math.random() * 1000
// 	// 	}).start()
//  //  }
//
// 	// componentWillMount() {
// 	// 	this.animations.map((ele, i) => {
// 	// 		console.log(ele, i)
// 	// 		let height = Dimensions.get('window').height * 0.65;
// 	// 		let width = Dimensions.get('window').width * 0.95;
// 	// 		height = Math.random() * height;
// 	// 		width = Math.random() * width;
// 	// 		console.log(height, width)
// 	// 		this.ele = ele;
// 	// 		Animated.timing(this.ele, {
// 	// 		toValue: {x: width, y: height},
// 	// 			duration: Math.random() * 2000,
// 	// 			delay: 500
// 	// 		}).start()
// 	// 	})
// 	// }
//
// 	animate() {
//
// 	}
//
//
//
//  //  animate() {
// 		// let height = Dimensions.get('window').height;
// 		// let width = Dimensions.get('window').width;
// 		// height = Math.random() * height * 0.65;
// 		// width = Math.random() * width * 0.95;
//  //  	console.log(this.animations)
//  //  	const animations = this.props.data.tasks.map((item, index) => {
//  //  		return Animated.timing(
//  //  			this.animations[index],
//  //  			{
//  //  				toValue: {x: width, y: height},
//  //  				duration: Math.random() * 1000
//  //  			}
//  //  		)
//  //  	}).start();
//  //  }
//
// 	// animate() {
// 	// 	return this.animations.map((ele, i) => {
// 	// 		let height = Dimensions.get('window').height * Math.random() * 0.65;
// 	// 		let width = Dimensions.get('window').width * Math.random() * 0.95;
// 	// 		return Animated.timing(
// 	// 			this.animations[i],
// 	// 			{
// 	// 				toValue: {x: width, y: height},
// 	// 				duration: Math.random() * 1000
// 	// 			}
// 	// 		)
// 	// 	})
//  //  }
//
//   // startAnimate() {
//   // 	this.state.data.map((ele, i) => {
// 		// 	let height = Dimensions.get('window').height;
// 		// 	let width = Dimensions.get('window').width;
// 		// 	height = Math.random() * height * 0.66;
// 		// 	width = Math.random() * width * 0.96;
// 		// 	console.log(height, width, 'after')
// 		// 	Animated.timing(this.state.position, {
// 		// 		toValue: { x: width, y: height },
// 		// 		duration: Math.random() * 1000
// 		// 	}).start();
// 		// 	return <Animated.View style={this.state.position.getLayout()} key={i} ><View style={styles.ball} /></Animated.View>
// 		// })
//   // }
//
//
//
// 	render() {
// 		var data = this.animations;
// 		let objects = function(){
// 			return data.map((ele, i) => {
// 				let height = Dimensions.get('window').height * Math.random() * 0.6;
// 				let width = Dimensions.get('window').width * Math.random() * 0.9;
// 				this.ele = ele;
// 				Animated.timing(this.ele, {
// 					toValue: {x: width, y: height},
// 					duration: Math.random() * 2000 + 500,
// 					delay: 500
// 				}).start();
// 				this.PanResponder = PanResponder.create({
// 					onMoveShouldSetPanResponder: (event, gestureState) => true,
// 					onStartShouldSetPanResponder: (event, gestureState) => true,
// 					onStartShouldSetPanResponderCapture: (event, gestureState) => true,
// 					onPanResponderMove: Animated.event([
// 						null, {dx: this.ele.x, dy: this.ele.y}
// 					]),
// 					onPanResponderRelease: (event, gestureState) => {}
// 				});
// 				return <Animated.View key={i} style={this.ele.getLayout()} {...this.PanResponder.panHandler}>
// 						<Image source={require('../assets/cute.png')} style={{borderRadius: 50, width: 60, height: 50}}/>
// 					</Animated.View>
// 				});
// 			}
//
// 		// setInterval(objects.bind(this), 1500);
//
// 		return (
// 			<View>
// 				{objects()}
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
