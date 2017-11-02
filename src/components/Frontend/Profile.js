import React, { Component } from 'react';
import { ART, AsyncStorage, Modal, ImageStore, StyleSheet, Text, View, Image, TextInput, Button, Clipboard, TouchableOpacity, TouchableHighlight, Alert, ScrollView } from 'react-native';
import Expo, { Asset, Camera, Permissions, ImagePicker } from 'expo';
import axios from 'axios';
import AllTasks from './AllTasks.js';
import Chart from './Chart.js';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import timezone from 'moment-timezone';
import convertKey from './convertKey';
import Area from './Area';
import convertDate from  './convertDate';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: require('../assets/Profile.png'),
      visibleModal: false,
      username: null,
      dates: null,
      allDates: null,
      daysWithTask: {},
      dailyTasks: [],
      locations: {},
      inProgress: 0,
      completed: 0,
      failed: 0,
      graphs: false,
      categoryPercentage: [],
      activeIndex: 0,
      orderedColors: [],
      dayByDay: [],
      selectedLocation: null
    }
    this.showModal = this.showModal.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.getPicture = this.getPicture.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: this.props.screenProps.userID,
      dailyTasks: [],
      categoryPercentage: [],
      activeIndex: 0,
      dayByDay: [],
      daysWithTask: {},
      orderedColors: [],
      upcomingTasks: 0
    })
    this.props.screenProps.fbPic ? this.setState({image: this.props.screenProps.fbPic}) : this.getPicture();
    this.getCompletedTask();
    this.countTasks();
  }

  getPicture() {
    axios.get('https://naturalhabitat.herokuapp.com/pictures', { params: { username: this.props.screenProps.userID }})
    .then(res => {
      let jpg = 'data:image/jpg;base64,' + res.data.picture;
      this.setState({ image: jpg })
    })
  }

  getCompletedTask() {
    var dateFormat = 'YYYY-MM-DD HH:mm:ss';
    let current = new Date();
    var date = timezone(current);
    var localDate = date.tz('America/New_York').format();


    axios.get('https://naturalhabitat.herokuapp.com/categoryPercentage', { params: { username: this.props.screenProps.userID}})
      .then(res => {
        this.setState({
          categoryPercentage: res.data
        })
        res.data.forEach(category => {
          this.state.orderedColors.push(category.color);
        })
      })
      .catch(err => {
        console.error(err)
      })

    axios.get('https://naturalhabitat.herokuapp.com/completedTasks', { params: { username: this.props.screenProps.userID } })
      .then(tasks => {
        tasks.data.forEach(task => {
          let eachDate = task.Start.split(' ').slice(0, 3).reduce((acc, task) => {
            return `${acc} ${task}`;
          });
          eachDate = eachDate.slice(0, eachDate.length - 1);
          let key = convertKey(eachDate);
          console.log(key, 'on load')
          // creates an object with keys of dates and values of tasks within those dates
          this.state.daysWithTask[key] ? this.state.daysWithTask[key].push(task) : this.state.daysWithTask[key] = [task];
          // creates an object with keys of locations and values of
          this.state.locations[task.Marker_Title] ? this.state.locations[task.Marker_Title].push(task) : this.state.locations[task.Marker_Title] = [task];

          // convertDate(task.Start) > current ? this.state.upcomingTasks++ : null;
        })
        // let current = new Date();
        this.grabDailyTasks(current)
      })
      .catch(err => {
        console.error(err)
      })

}

  countTasks() {
    axios.get('https://naturalhabitat.herokuapp.com/countTasks', { params: { username: this.props.screenProps.userID } })
      .then(tasks => {
        tasks.data.forEach(task => {
          if (task.Completion === "False") {
            this.setState({ failed: task.count })
          } else if (task.Completion === "True") {
            this.setState({ completed: task.count })
          } else {
            this.setState({ inProgress: task.count })
          }
        })
      })
  }


  pickPhoto = async () => {
    let picture = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    this.handlePicture(picture);
  }

  takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' })
    let picture = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    })
      .catch(err => console.error(err, 'ERR!!!'))
    this.handlePicture(picture);
  }

  handlePicture = async picture => {
    try {
      this.setState({ visibleModal: !this.state.visibleModal });
      if (!picture.cancelled) {
      }
    } catch (e) {
      console.error({ e }, 'error!');
      alert('This is not working');
    } finally {
      this.setState({ uploading: false });
      this.uploadPhoto(picture);
    }
  }

  uploadPhoto(picture) {
    let uri = picture.base64;
    let pictureText = 'data:image/jpg;base64,' + uri;
    axios.post('https://naturalhabitat.herokuapp.com/pictures', { picture: uri, username: this.state.username })
      .then(res => {
        let jpg = 'data:image/jpg;base64,' + res.data.picture;
        this.setState({ image: jpg })
      });
  }

  showModal(stat) {
    this.setState({ visibleModal: stat })
  }

  grabDailyTasks(date) {
    this.convertTimezone(date).then(converted => {
      date = JSON.stringify(converted).slice(1, 11);
      this.setState({
        dailyTasks: this.state.daysWithTask[date] || [],
        graphs: false
      })
    })
  }

  convertTimezone = async (date) => {
    date = moment(date);
    let converted = await date.tz('America/New_York').format();
    return converted
  }

  changeLocation(location) {
    console.log(location, 'change me')
    this.setState({
      selectedLocation: location,
      graphs: true
    })
  }

  _onPieItemSelected(newIndex){
    for (key in this.state.color) {
      if (this.state.color[key].color === this.state.orderedColors[newIndex]) {
        this.setState({
          dayByDay: this.state.color[key].frequency,
          activeIndex: newIndex
        })
        break;
      }
    }
  }

  reRender() {
    this.componentDidMount()
  }


  render() {
    let tabs = Object.entries(this.state.locations)
    // console.log(this.state.locations, 'what iso going on')
    tabs.unshift(['Overview'])


    return (
      <View style={{ flex: 1, backgroundColor: '#ddd' }}>
        <View style={{ marginLeft: 5, marginTop: 20, alignItems: 'flex-start' }}>
          <Button
            onPress={() => this.props.navigation.navigate('DrawerToggle')}
            title="&#9776;"
          />
        </View>
        <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}>
          <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.showModal(!this.state.visibleModal)}>
              <Image style={styles.photo} source={{ uri: `${this.state.image}` }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 3, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.title}>
              Completed Tasks: {this.state.completed}
            </Text>
            <Text style={styles.title}>
              In Progress: {this.state.inProgress}
            </Text>
            <Text style={styles.title}>
              Failed Tasks: {this.state.failed}
            </Text>
          </View>
        </View>
        <View style={{ flex: 0.7, alignItems: 'flex-end' }}>
        <ScrollView horizontal={true} style={{ flexDirection: 'row', marginTop: 10, width: 250, alignContent: 'stretch'}}>
          { this.state.locations ? (
            tabs.map((tab, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => {this.changeLocation(tab)}}>
                  <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 1, width: 70, height: '100%'}}>
                    <Text>{tab[0]}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          ) : null }
        </ScrollView>
        </View>
          {!this.state.graphs ? (
            <View style={{ flex: 4, borderColor: 'black', borderTopWidth: 1 }}>
              <ScrollView style={{ marginTop: 15 }}>
                {this.state.dailyTasks.map((task, i) => {
                  return (
                    <AllTasks task={task} key={i} reRender={this.reRender.bind(this)}/>
                  )
                })}
              </ScrollView>
            </View>
          ) : (
            // render based on what selected location is
            <View style={{ flex: 4, borderTopWidth: 1, borderColor: 'black'}}>
              <View>
                {this.state.selectedLocation[0] === "Overview" ? (
                  <Chart
                    pieWidth={150}
                    pieHeight={150}
                    colors={this.state.orderedColors}
                    onItemSelected={this._onPieItemSelected.bind(this)}
                    width={180}
                    height={180}
                    data={this.state.categoryPercentage} />
                  ) : (
                    <View style={{ flex: 4, borderColor: 'black', borderTopWidth: 1 }}>
                      <Image source={images[this.state.selectedLocation[1][0].Avatar][1]} style={{width: 75, height: 75}}/>
                      <ScrollView style={{ marginTop: 15}}>
                        {this.state.selectedLocation[1].map((task, i) => {
                          return (
                            <AllTasks task={task} key={i} reRender={this.reRender.bind(this)}/>
                          )
                        })}
                      </ScrollView>
                    </View>
                  )}
              </View>
            </View>

          )}

        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: '#9265DC' }}
          style={{ height: 100 }}
          calendarHeaderStyle={{ color: 'white' }}
          calendarColor={'#7743CE'}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          iconLeft={require('../assets/habit@/logout.png')}
          iconRight={require('../assets/habit@/login.png')}
          iconContainer={{ flex: 0.1 }}
          onDateSelected={(date) => this.grabDailyTasks(date)}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.visibleModal}
          onRequestClosed={() => { alert('Photo is not selected!!') }}
        >
          <View style={{flex: 1, alignContent: 'center'}}>
            <View style={{ height: '100%', backgroundColor: '#ddd', opacity: 0.7, justifyContent: 'center' }}>
              <View style={styles.button} >
                <Button title={`Take a photo`} onPress={this.takePhoto} />
              </View>
              <View style={styles.button} >
                <Button title={`Photo from library`} onPress={this.pickPhoto} />
              </View>
              <View style={styles.button} >
                <Button title={`Close`} onPress={() => { this.showModal(!this.state.visibleModal) }} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const template = [
  {day: 'Mon', value: 0},
  {day: 'Tue', value: 0},
  {day: 'Wed', value: 0},
  {day: 'Thu', value: 0},
  {day: 'Fri', value: 0},
  {day: 'Sat', value: 0},
  {day: 'Sun', value: 0}
]

const ecobuddies = [
  [
    [0, require("../assets/habit@/starfish-gray.png")],
    [1, require("../assets/habit@/starfish-sm.png")],
    [2, require("../assets/habit@/starfish-md.png")],
    [2, require("../assets/habit@/starfish-lg.png")]
  ],
  [
    [0, require("../assets/habit@/butterfly-gray.png")],
    [1, require("../assets/habit@/butterfly-sm.png")],
    [2, require("../assets/habit@/butterfly-md.png")],
    [2, require("../assets/habit@/butterfly-lg.png")]
  ],
  [
    [0, require("../assets/habit@/ladybug-gray.png")],
    [1, require("../assets/habit@/ladybug-sm.png")],
    [2, require("../assets/habit@/ladybug-md.png")],
    [2, require("../assets/habit@/ladybug-lg.png")]
  ]
]

const images = [
  [0, require("../assets/Ecosystem/home.png")],
  [1, require("../assets/Ecosystem/work.png")],
  [2, require("../assets/Ecosystem/gym.png")],
  [3, require("../assets/Ecosystem/currentlocation.png")]
]

const styles = StyleSheet.create({
  top: {
    flex: 0.5,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  photo: {
    backgroundColor: 'red',
    borderRadius: 50,
    opacity: 0.7,
    borderBottomLeftRadius: 50,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 5,
    zIndex: 3,
    width: 100,
    height: 100
  },
  middle: {
    flex: 6,
    width: '100%'
  },
  bottom: {
    flex: 2,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#ddd',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'black',
    width: 250,
    alignItems: 'center',
    marginLeft: 60,
    marginTop: 5,
    marginBottom: 5
  },
  title: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: "bold",
  }
})

const theme = {
    colors: [
    ]
  }
