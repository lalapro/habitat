import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class AllTasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    }
  }

  render() {
    let taskStatus = this.props.task.Completion
    if (taskStatus === null) {
      taskStatus = <Image source={sprites[1][1]} style={{height: 45, width: 45, alignItems: 'flex-end'}}/>
    } else if (taskStatus === "True") {
      taskStatus = <Image source={sprites[2][1]} style={{height: 45, width: 45, alignItems: 'flex-end'}}/>
    } else {
      taskStatus = <Image source={sprites[0][1]} style={{height: 45, width: 45, alignItems: 'flex-end'}}/>
    }
    return (
      <View style={{display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Image source={location[this.props.task.Avatar][1]} style={{height: 50, width:50, flex: 1}}/>
        <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.title}>
            {this.props.task.Task_Title}
          </Text>
          <Text style={styles.description}>
            {this.props.task.Task_Description}
          </Text>
        </View>
        {taskStatus}
      </View>
    )
  }
}

const sprites = [
  [0, require("../assets/Ecosystem/tree0.png")],
  [1, require("../assets/Ecosystem/tree1.png")],
  [2, require("../assets/Ecosystem/tree2.png")]
]

const location = [
  [0, require("../assets/Ecosystem/home.png")],
  [1, require("../assets/Ecosystem/work.png")],
  [2, require("../assets/Ecosystem/gym.png")],
  [3, require("../assets/Ecosystem/currentlocation.png")]
]


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    color: "#444",
  },
})
