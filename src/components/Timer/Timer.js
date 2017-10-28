// import React, { Component } from 'react';
// import{ StyleSheet, View, Image, Text, TouchableOpacity, Button, AsyncStorage } from 'react-native';
// import axios from 'axios';

// export default class Timer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Build Habitats by keeping Good Habits</Text>
//       </View>
//     )
//   }
// }

import React, { Component } from 'react';
import { Constants } from 'expo';
import { View, Text, Image, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import * as Progress from 'react-native-progress';
// import convertDate from '../Frontend/convertDate'

export default class Timer extends Component {
    constructor(props) {
        super (props);
        this.state = {
          // hours: ['1', '2', '3'],
          
          fill: 0,
          hour: 0,
          minute: 0,
          second: 0,
          toggleTimer: false,
          duration: 0
      }
      // this.calculateTime = this.calculateTime.bind(this);
      this.eachPie = this.eachPie.bind(this);
      this.startTimer = this.startTimer.bind(this);
    }

    startTimer() {
      
      var hoursInMSec = this.state.hour * 3600000;
      var minsInMSec = this.state.minute * 60000;
      var secsInMSec = this.state.second * 1000;
      var duration = hoursInMSec + minsInMSec + secsInMSec;
      this.setState({ 
        toggleTimer: !this.state.toggleTimer
      }, () => {
        
        if (this.state.toggleTimer) {
          let startTime = new Date();
          console.log('startTimer', startTime);
          interval = setInterval(this.calculateTime.bind(this, startTime, duration), 500);
          console.log('interval', interval);
          setTimeout(() => { clearInterval(interval) }, duration + 500);
        } else {
          console.log('im in here now');
          console.log(interval);
          clearInterval(interval);
        } 
      });
    }

    calculateTime(startTime, duration) {
      //get start time which is current time when onpress of timer dude
      let currentTime = new Date();
      this.setState({duration});
      let timePassed = currentTime.getTime() - startTime.getTime();
      console.log('timePassed', timePassed);
      let percentage = (timePassed / duration);
      this.setState({ fill: percentage })
    }

    eachPie(percentage) {
      return <Progress.Pie style={{alignItems: 'center', opacity: 0.3, marginTop: 32}} progress={percentage} size={130} />
    }

    render() {
      const hours = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      minutes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27','28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'],
      seconds = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27','28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'];
        // let clock = this.props.task.Start.split(' ')[3].split(':')[0];
      return (
        <View style={styles.container}>
          <View>
            <TouchableOpacity
              onPress={this.startTimer}>
              <Image source={require("../assets/cuteClock.png")} >
                {this.eachPie(this.state.fill)}
              </Image>
            </TouchableOpacity> 
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              style={[styles.picker]} itemStyle={styles.pickerItem}
              selectedValue={this.state.hour}
              onValueChange={(itemValue) => this.setState({hour: itemValue})}
            >
              {hours.map((hour, i) => (
                <Picker.Item key={i} label={hour} value={hour}/>
              ))}
            </Picker>
              <Text>Hours</Text>
            <Picker
              style={[styles.picker]} itemStyle={styles.pickerItem}
              selectedValue={this.state.minute}
              onValueChange={(itemValue) => this.setState({minute: itemValue})}
            >
              {minutes.map((minute, i) => (
                <Picker.Item key={i} label={minute} value={minute}/>
              ))}
            </Picker>
              <Text>Minutes</Text>
            <Picker
              style={[styles.picker]} itemStyle={styles.pickerItem}
              selectedValue={this.state.second}
              onValueChange={(itemValue) => this.setState({second: itemValue})}
            >
              {seconds.map((second, i) => (
                <Picker.Item key={i} label={second} value={second}/>
              ))}
            </Picker>
              <Text>Seconds</Text>
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  pickerContainer: {
    flexDirection: 'row'
  },
  picker: {
    width: '33.333%',
    height: 'auto',
    // backgroundColor: '#FFF0E0',
    // borderColor: 'red',
    borderBottomWidth: 2,
    flex: 90
  },
  
  pickerItem: {
    height: 100,
    color: 'red'
  },
  
  arrowWrapper: {
    // backgroundColor: '#FFF0E0',
    flex: 10,
    height: 40,
    marginLeft: -28,
    justifyContent: 'center'
  },
  
  arrow: {
    textAlign: 'center',
    color: 'red',
  }
})