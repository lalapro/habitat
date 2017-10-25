import React, { Component } from 'react';
import { StyleSheet, View, Text, Separator, Dimensions, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import Swipeout from 'react-native-swipeout';
import { StackNavigator, NavigationActions } from 'react-navigation';
import profile from './Profile';
import axios from 'axios';
import TutorialView from './TutorialView.js';
import GetCurrentLocation from '../Map/GetCurrentLocation';
import geodist from 'geodist';
import ProgressBar from './ProgressBar'
import convertDate from '../../../server/controllers/convertDate';

export default class EcoSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userID: props.screenProps.userID,
      locations: [],
      render: false,
      index: 0,
      currentTask: '',
      currentTaskId: '',
      currentTaskIndex: '',
      currentTaskCategory: '',
      currentDescription: '',
      currentTaskStart: '',
      currentTaskEnd: '',
      editSpecificTask: '',
      currentLocation: {},
      render: false,
      toggleShow: false,
      positivePoints: 0,
      negativePoints: 0,
      nullPoints: 0
    }
    this.showTask = this.showTask.bind(this);
  }

  getMarkers() {
    axios.get('http://10.16.1.152:3000/mapMarkers', {params: {userID: this.state.userID, currentDay: true}})
    .then(res => {
      let locations = res.data;
      this.setState({locations})
    })
    .then(res => this.showCurrentLocation())
    .catch(err => console.error(err))
  }

  showCurrentLocation() {
    let locations = this.state.locations;
    if (locations.length > 0) {
      for (let i = 0; i < locations.length; i++) {
        let dist = geodist({lat: locations[i].Latitude, lon: locations[i].Longitude}, {lat: this.state.currentLocation.latitude, lon: this.state.currentLocation.longitude}, {exact: true, unit: 'km'})
        if (dist < 0.05) {
          this.setState({
            index: i,
            render: true
          })
          break;
        }
        if (i === locations.length - 1) {
          this.setState({render: true})
        }
      }
    } else {
      this.setState({render: true})
    }
  }

  componentDidMount() {
    this.getMarkers();

    GetCurrentLocation().then(location => {
      this.setState({
        currentLocation: {
          title: 'Current Location',
          longitude: location.coords.longitude,
          latitude: location.coords.latitude
        }
      })
    })
  }

  showTask(task, specificTask, indexOfTask) {
    this.setState({
      toggleShow: !this.state.toggleShow,
      currentTask: task.Task_Title,
      currentTaskId: task.Task_ID,
      currentTaskIndex: indexOfTask,
      currentTaskCategory: task.Category,
      currentDescription: task.Task_Description,
      currentTaskStart: task.Start,
      currentTaskEnd: task.End,
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

  yayTask() {
    if (this.state.locations[this.state.index].tasks[this.state.currentTaskIndex].Completion === true) {
      Alert.alert('Dont try to cheat');
      return;
    }
    var end = this.state.currentTaskEnd;
    if (convertDate(end) > new Date()) {
      Alert.alert('the task deadline has not ended yet. Wait!')
      return;
    }

    let positivePoints = this.state.locations[this.state.index].PositivePoints + 1;
    axios.put('http://10.16.1.131:3000/yayTask', {
      taskId: this.state.currentTaskId,
      markerId: this.state.locations[this.state.index].Marker_ID,
      positivePoints: positivePoints
    })
    .then((res) => {
      this.markTaskComplete();
    })
    .catch((err) => {
      console.error(err);
    })
  }

  nayTask() {
    if (this.state.locations[this.state.index].tasks[this.state.currentTaskIndex].Completion === true) {
      Alert.alert('Dont try to cheat');
      return;
    }
    var end = this.state.currentTaskEnd;
    if (convertDate(end) > new Date()) {
      Alert.alert('the task deadline has not ended yet. Wait!')
      return;
    }

    let negativePoints = this.state.locations[this.state.index].NegativePoints + 1;
    axios.put('http://10.16.1.131:3000/nayTask', {
      taskId: this.state.currentTaskId,
      markerId: this.state.locations[this.state.index].Marker_ID,
      negativePoints: negativePoints
    })
    .then((res) => {
      this.markTaskComplete();
    })
    .catch((err) => {
      console.error(err);
    })
  }

  markTaskComplete() {
    let newLocation = this.state.locations
    newLocation[this.state.index].tasks[this.state.currentTaskIndex].Completion = true;
    this.setState({
      locations: newLocation,
    })
  }

  componentDidMount() {
    this.setState({
      userID: this.props.screenProps.userID,
    }, () => this.getMarkers())
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const { navigate } = this.props.navigation;
    const swipeRightBtns = [
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
    const swipeLeftBtns = [
      {
        text: 'Yay',
        backgroundColor: 'green',
        underlayColor: 'rgba(0, 0, 0, 0.6)',
        onPress: () => { this.yayTask() }
     },
      {
        text: 'Nay',
        backgroundColor: 'brown',
        underlayColor: 'rgba(0, 0, 0, 0.6)',
        onPress: () => { this.nayTask() }
     }
    ];
    return this.state.render ? (this.state.locations.length > 0 ? (
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
            {this.state.locations.map((location, index) => {
              posImages = new Array(location.PositivePoints);
              posImages.fill(2)
              negImages = new Array(location.NegativePoints);
              negImages.fill(0)
              return (
              // put backgroundImage in the style 
              <View key={index} style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={images[location.Avatar][1]}
                  style={{width: 50, height: 50}}
                />
                <Text style={styles.cardtitle}>
                  {location.Marker_Title}
                </Text>
                <Text style={styles.cardDescription}>
                  {location.Marker_Description}
                </Text>
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                {location.tasks ? (
                  location.tasks.map((task) => (
                    <Image 
                      source={toast[1][1]}
                      style={{width: 50, height: 50}}
                    />
                  ))
                ) : null}
                {location.PositivePoints ? 
                  posImages.map((img) => (
                      <Image 
                        source={toast[2][1]}
                        style={{width: 50, height: 50}}
                      />
                    ))
                 : null}
                 {location.NegativePoints ? 
                  negImages.map((img) => (
                      <Image 
                        source={toast[0][1]}
                        style={{width: 50, height: 50}}
                      />
                    ))
                 : null}
                 </View>
              </View>
            )})}
          </Swiper>
          {this.state.toggleShow ? (
          <View style={{height: 140}}>
            <View style={styles.separator} />
            <Swipeout
              right={swipeRightBtns}
              left={swipeLeftBtns}
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
                <Text style={{marginTop: 2}}>{this.state.currentTaskCategory}</Text>
              </View>
            </Swipeout>
            <View style={styles.separator} />
          </View>) : null }
        </View>
        <View style={{flex: 3}}>
          <ScrollView horizontal={true}>
            {this.state.locations[this.state.index].tasks ? (
              this.state.locations[this.state.index].tasks.map((task, i) => {
                return <ProgressBar key={i} task={task} locations={this.state.locations}
                  index={this.state.index} showTask={this.showTask} specificIndex={i}
                  showTask={() => this.showTask(task, this.state.locations[this.state.index].tasks[i], i)}/>
              })
          ) : null}
            <TouchableOpacity onPress={() => { navigate('TaskBuilder')}}>
              <Image source={require('../assets/plus.png')} style={{height: 150, width: 150}} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    ) :
    <View style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
      <TutorialView />
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

const images = [
  [0, require("../assets/Ecosystem/home.png")],
  [1, require("../assets/Ecosystem/work.png")],
  [2, require("../assets/Ecosystem/gym.png")],
  [3, require("../assets/Ecosystem/currentlocation.png")]
];

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
    fontSize: 25,
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
    flex: .005,
    height: 1,

    backgroundColor: '#8A7D80',
    // marginLeft: 15
  }
})
