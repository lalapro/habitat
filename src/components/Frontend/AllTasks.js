import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class AllTasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    }

    // this.renderTasks = this.renderTasks.bind(this);
  }

  render() {
    let taskStatus = this.props.task.Completion
    console.log('render', taskStatus)
    if (taskStatus === null) {
      taskStatus = <Image source={images[1][1]} style={{height: 50, width: 50}}/>
    } else if (taskStatus === "True") {
      taskStatus = <Image source={images[2][1]} style={{height: 50, width: 50}}/>
    } else {
      taskStatus = <Image source={images[0][1]} style={{height: 50, width: 50}}/>
    }
    return (
      <View>
        {taskStatus}
        <Text style={styles.title}>
          {this.props.task.Task_Title}
        </Text>
        <Text style={styles.description}>
          {this.props.task.Marker_Title}
        </Text>
        <Text style={styles.description}>
          {this.props.task.Task_Description}
        </Text>
      </View>
    )
  }
}

const images = [
  [0, require("../assets/Ecosystem/tree0.png")],
  [1, require("../assets/Ecosystem/tree1.png")],
  [2, require("../assets/Ecosystem/tree2.png")]
]


const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    color: "#444",
  },
})
