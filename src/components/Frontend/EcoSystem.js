import React, { Component } from 'react';
import { StyleSheet, View, Text, Separator, Dimensions, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import Swipeout from 'react-native-swipeout';
import { StackNavigator, NavigationActions } from 'react-navigation';
import profile from './Profile';
import axios from 'axios';

import GetCurrentLocation from '../Map/GetCurrentLocation';

export default class EcoSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userID: null,
      locations: undefined,
      render: false,
      index: 0,
      currentTask: '',
      currentDescription: '',
      editSpecificTask: '',
      currentLocation: {},
      render: false
    }
  }

  getMarkers() {
    axios.get('http://10.16.1.152:3000/mapMarkers', {params: {userID: this.state.userID}})
    .then(res => {
      console.log('calling get markers', res.data)
      this.setState({
        locations: res.data,
        currentDescription: '',
        currentTask: ''
      })
    })
    .then(res => GetCurrentLocation())
    .then(res => {
      this.setState({
        currentLocation: {
          title: 'Current Location',
          longitude: res.coords.longitude,
          latitude: res.coords.latitude
        }
      })
    })
    .then(res => this.setState({render: true}))
    .then(res => this.showCurrentLocation())
    .catch(err => console.error(err))
  }

  showCurrentLocation() {
    console.log(this.state.currentLocation)
    var locations = this.state.locations.map((curr, idx, arr) => {
      return {
        title: curr.Marker_Title,
        longitude: curr.Longitude,
        latitude: curr.Latitude,
        index: idx
      }
    })
    var currentLocation = {
      title: this.state.currentLocation.title,
      longitude: this.state.currentLocation.longitude,
      latitude: this.state.currentLocation.latitude
    }
    locations.forEach((location) => {
      if (Math.abs((location.longitude - currentLocation.longitude) + (location.latitude - currentLocation.latitude)) < .0001) {
        this.setState({
          index: location.index
        })
      }
    })
  }


  componentDidMount() {
    this.setState({
      userID: this.props.screenProps.userID,
    }, () => this.getMarkers())
  }

  showTask(task, specificTask) {
    console.log(specificTask, 'please')
    this.setState({
      currentTask: task.Task_Title,
      currentDescription: task.Task_Description,
      editSpecificTask: specificTask
    })
  }

  editTask(task) {
    this.props.navigation.navigate('TaskBuilder', { specificTask: this.state.editSpecificTask, editing: true })
  }

  deleteTask() {
    axios.delete('http://10.16.1.152:3000/deleteTask', {params: {userID: this.state.userID, taskTitle: this.state.currentTask}})
    .then(res => this.getMarkers())
    .catch(err => console.error(err))
  }

  render() {
    console.log('in Ecosystem', this.state.index)
    const { height, width } = Dimensions.get('window');
    const { navigate } = this.props.navigation;
    const swipeBtns = [
      {
        text: 'Edit',
        backgroundColor: '#f4a316',
        underlayColor: 'rgba(0, 0, 0, 0.6)',
        onPress: () => { this.editTask() }
     },
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 0.6)',
        onPress: () => { this.deleteTask() }
     }
    ];
    return this.state.render ? (this.state.locations ? (
      <View style={styles.wrapper}>
        <View style={{margin: -10, marginLeft: 5, marginTop: 20, alignItems: 'flex-start'}}>
          <Button
            onPress={() => this.props.navigation.navigate('DrawerToggle', {memes: true})}
            title="&#9776;"
          />
        </View>
        <View style={{flex: 7}}>
          <Swiper
            index={this.state.index}
            horizontal={true}
            onIndexChanged={(index) => this.setState({index: index, currentTask: '', currentDescription: ''})}
            loop={false}
            >
              {this.state.locations.map((location, index) => (
                <View key={index} style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.cardtitle}>
                    {location.Marker_Title}
                  </Text>
                  <Text style={styles.cardDescription}>
                    {location.Marker_Description}
                  </Text>
                  <Image
                    source={images[location.Avatar][1]}
                    style={{width: 200, height: 200}}
                  />
                </View>
              ))}
            </Swiper>
            <View style={styles.separator} />
            <Swipeout right={swipeBtns}
              autoClose={true}
              backgroundColor= 'transparent'
            >
              <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>
                  {this.state.currentTask} {"\n"}
                </Text>
                <Text stlye={{fontSize: 14}}>
                  {this.state.currentDescription}
                </Text>
              </View>
            </Swipeout>
          <View style={styles.separator} />
        </View>
        <View style={{flex: 3}}>
          <ScrollView horizontal={true}>
            {this.state.locations[this.state.index].tasks ? (
              this.state.locations[this.state.index].tasks.map((task, index) => {
                console.log('HIHI', task)
                if(task.Start) {

                }
                // CLOCK WILL NOT RENDER IF COLOR IS NOT THERE
                let clock = task.Start.split(' ')[3].split(':')[0];
                console.log(clock)
                let catStyle = {
                  width: 130,
                  height: 130,
                  borderRadius: 130,
                  borderColor: task.Color || 'black',
                  borderWidth: 3,
                  marginTop: 10,
                  margin: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              return (
                <TouchableHighlight style={catStyle} key={index}
                onPress={() => this.showTask(task, this.state.locations[this.state.index].tasks[index])}>
                  <Image
                    style={{resizeMode: 'contain', overflow: 'hidden'}}
                    source={clocks[clock][1]}
                  />
                </TouchableHighlight>
              )})
            ) : null}
            <TouchableOpacity onPress={() => { navigate('TaskBuilder')}}>
              <Image source={require('../assets/plus.png')} style={{height: 150, width: 150}} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    ) :
    <View>
      <Text style={{marginTop: 30}}>
        Looks like you don't have any locations added! Click on the map button to go to the map page!
      </Text>
      <Button
        title="Map"
        onPress={() => navigate('Map')}
      />
    </View>
  ) :
  <View style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
    <Image source={require('../assets/loading.gif')} style={{width: 400, height: 400}}/>
  </View>
  }
}

{/* <Swiper
  horizontal={true}
  onIndexChanged={(index) => {this.viewChange(index)}}
>
<View style={{height: height, width: width, position: 'absolute'}}>
  <Image style={{height: height, width: width, position: 'absolute'}}
    source={require('../assets/home.png')}>
    <Objects data={this.state.locations[0]}/>
  </Image>
</View>

<View style={{height: height, width: width, position: 'absolute'}}>
  <Image style={{height: height, width: width, position: 'absolute'}}
    source={require('../assets/work.png')}>
    <Objects data={this.state.locations[1]}/>
  </Image>
</View>

</Swiper> */}

const images = [
  [0, require("../assets/home2.png")],
  [1, require("../assets/work2.png")],
  [2, require("../assets/gym.png")],
  [3, require("../assets/egg5.png")]
]

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
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  wrapper: {
    display: 'flex',
    flex: 1
  },
  cardtitle: {
    fontSize: 50,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 50,
    color: "#444",
  },
  circle: {
   width: 120,
   height: 120,
   borderRadius: 120,
  //  borderColor: 'red',
   borderWidth: 0.5,
   margin: 5,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center'
 },
 separator: {
    height: 1,
    width: 400,
    backgroundColor: '#8A7D80',
    // marginLeft: 15
  }
})
