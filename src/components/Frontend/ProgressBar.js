
import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

export default class ProgressBar extends Component {
    constructor(props) {
        super (props);
        this.state = {
            index: this.props.index,
            locations: this.props.locations,
            fill: 0,
            currentTime: new Date().toLocaleString()
        }
        this.eachTask = this.eachTask.bind(this);
        this.calculateTime = this.calculateTime.bind(this);
        this.eachPie = this.eachPie.bind(this);
    }

    componentDidMount() {
        this.calculateTime()
    }

    calculateTime() {
        let startHour;
        let endHour;
        let currentHour;
        let currentPercentage;
        let { Start } = this.props.task;
        let { End } = this.props.task;
        let { currentTime } = this.state;

        if (Start.split(' ')[4].toLowerCase() === "pm" && Number(Start.split(' ')[3].split(':')[0]) !== 12) {
            startHour = Number(Start.split(' ')[3].split(':')[0]) + 12;
        } else {
            startHour = Number(Start.split(' ')[3].split(':')[0]);
        }

        if (End.split(' ')[4].toLowerCase() === 'pm' && Number(End.split(' ')[3].split(':')[0]) !== 12) {
            endHour = Number(End.split(' ')[3].split(':')[0]) + 12;
        } else {
            endHour = Number(End.split(' ')[3].split(':')[0]);
        }

        if (currentTime.split(' ')[2].toLowerCase() === 'pm' && Number(currentTime.split(' ')[1].split(':')[0]) !== 12) {
            currentHour = Number(currentTime.split(' ')[1].split(':')[0]) + 12;
        } else {
            currentHour = Number(currentTime.split(' ')[1].split(':')[0]);
        }

        let startMinute = Start.split(' ')[3].split(':')[1];
        let endMinute = End.split(' ')[3].split(':')[1];
        let currentMinute = Number(this.state.currentTime.split(' ')[1].split(':')[1]);
        let duration = (endHour - startHour) * 60 + (endMinute - startMinute);
        let currentProgress = (currentHour - startHour) * 60 + (currentMinute - startMinute);

        console.log('CURRENT START', currentProgress)
        console.log('CURRENT END', duration)
        // console.log('CURRENT PROGRESS', currentProgress)
        if (currentProgress / duration * 100 > 100) {
            currentPercentage = 1;
        } else if (currentProgress / duration * 100 <= 0) {
            currentPercentage = 0
        } else {
            currentPercentage = currentProgress / duration;
        }

        setTimeout(() => {
            this.setState({
                fill: currentPercentage
            });
        }, 100)
    }

    eachPie(percentage) {
        return <Progress.Pie style={{alignItems: 'center', opacity: 0.3}} progress={percentage} size={130} />

    }

    eachTask (task, index) {
        this.props.showTask(task, index)
    }

    render() {
        let catStyle = {
            width: 130,
            height: 130,
            borderRadius: 130,
            borderColor: this.props.task.Color || 'black',
            borderWidth: 3,
            marginLeft: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25
        }
        let clock = this.props.task.Start.split(' ')[3].split(':')[0];

        return (
            <TouchableHighlight style={catStyle}
                onPress={() => this.eachTask(this.props.task, this.state.locations[this.state.index].tasks[this.props.specificIndex])}>
                <View style={{position: 'absolute'}}>
                    <Image source={clocks[clock][1]} >
                        {this.eachPie(this.state.fill)}
                    </Image>
                </View>
            </TouchableHighlight>
        )
    }
}

const clocks = [
    [0, 'placeholder'],
    [1, require("../assets/clocks/one.png")],
    [2, require("../assets/clocks/two.png")],
    [3, require("../assets/clocks/three.png")],
    [4, require("../assets/clocks/four.png")],
    [5, require("../assets/clocks/five.png")],
    [6, require("../assets/clocks/six.png")],
    [7, require("../assets/clocks/seven.png")],
    [8, require("../assets/clocks/eight.png")],
    [9, require("../assets/clocks/nine.png")],
    [10, require("../assets/clocks/ten.png")],
    [11, require("../assets/clocks/eleven.png")],
    [12, require("../assets/clocks/twelve.png")]
  ]

  const styels = StyleSheet.create({
    circle: {
        width: 120,
        height: 120,
        borderRadius: 120,
       //  borderColor: 'red',
        borderWidth: 0.5,
        margin: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }
  })
