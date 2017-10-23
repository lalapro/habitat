import React, { Component } from 'react';
import{ StyleSheet, View, Image, Text, TouchableOpacity, Button, Picker, ScrollView, Alert } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import TaskForm from './TaskForm.js';
import axios from 'axios';

class TaskBuilder extends Component {
  // static navigationOptions = {
  //   title: 'Add a location!',
  // };

  constructor(props) {
    super(props);
    this.state = {
      oldTitle: '',
      title: '',
      description: '',
      startTime: null,
      endTime: null,
      location: '',
      category: '',
      frequency: '',
      saved: null,
      categoryID: '',
      markerID: '',
      userID: null,
      editTask: '',
      taskID: null,
      reRender: false
    }
    this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    // this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.cancelTask = this.cancelTask.bind(this);
  }

  componentDidMount() {
    console.log('TASK BUILDER', this.props)
    this.setState({
      userID: this.props.screenProps.userID
    });
    if (this.props.navigation.state.params) {
      var task = this.props.navigation.state.params.specificTask;
      setTimeout(() => { this.setState({
        oldTitle: task.Task_Title,
        title: task.Task_Title,
        description: task.Task_Description,
        startTime: task.Start,
        endTime: task.End,
        location: task.Marker_ID,
        category: task.Category_ID,
        frequency: task.Frequency,
        taskID: task.Task_ID,
        editTask: task }) }, 200);
    }
  }


  handleTaskTitleChange(title) {
    this.setState({title})
  }

  handleDescriptionChange(description) {
    this.setState({description})
  }

  handleStartChange(startTime) {
    this.setState({startTime})
  }

  handleEndChange(endTime) {
    this.setState({endTime})
  }

  handleLocationChange(markerID, taskID) {
    // console.log('i heard you...', markerID, taskID)
    this.setState({
      markerID: markerID,
      taskID: taskID
    })
  }

  handleCategoryChange(category) {
    console.log('i hear you...', category)
    this.setState({category})
  }

  handleFrequencyChange(frequency) {
    this.setState({frequency})
  }

  handleCheck(day) {

  }


  saveTask() {
    let oldTitle = this.state.oldTitle;
    let title = this.state.title;
    let description = this.state.description;
    let startTime = this.state.startTime;
    let endTime = this.state.endTime;
    let markerID = this.state.markerID;
    console.log(markerID, '-----------')
    let category = this.state.category;
    let frequency = this.state.frequency;
    let userID = this.state.userID;
    let taskID = this.state.taskID;
    //need to send username to get userId
    let readyToSend = false;

    //{title, description, startTime, markerID, endTime, category, frequency, userID}}
    if (
      title.length < 1 ||
      description.length < 1 ||
      startTime === null ||
      endTime === null ||
      category === ''
    ) {
      Alert.alert(
        'Oops',
        "Looks like you forgot to fill out some values!",
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        { cancelable: false }
        )
    } else if (!this.state.editTask) {
      axios.post('http://10.16.1.152:3000/newTask', {title, description, startTime, markerID, endTime, category, frequency, userID})
        .then((response) => this.setState({
          saved: 'Task Saved',
          title: '',
          description: '',
          startTime: null,
          endTime: null,
          category: '',
          frequency: '',
          markerID: ''
        }))
        .then(res => {
          this.props.navigation.goBack();
        })
        .catch((err) => console.error('taskbuilderjs. line 82', err))
      } else {
        axios.put('http://10.16.1.152:3000/editTask', {taskID, title, description, startTime, endTime, markerID, category, frequency, userID})
        .then((res) => {
          this.props.navigation.state.params = ''
          this.props.navigation.goBack();
        })
        .catch(err => console.error(err))
      }
  }

  cancelTask() {
    this.setState({
      saved: '',
      title: '',
      description: '',
      startTime: null,
      endTime: null,
      location: 'none',
      category: 'none',
      frequency: '',
      editTask: ''
    });
    this.props.navigation.state.params = ''
    this.props.navigation.goBack();
  }

  reRender() {
    this.setState({
      reRender: !this.state.reRender
    })
  }

  jankyNav() {
    this.props.navigation.state.params = ''
    this.props.navigation.navigate('DrawerToggle')
  }

  render() {
    return this.state.userID ? (
      <View style={styles.container}>
        <View style={{margin: 10, alignSelf: 'flex-start'}}>
          <Button
            onPress={() => this.jankyNav()}
            title="&#9776;"
          />
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.scrollView}
        >
          <TaskForm style={styles.formContainer}
            handleTaskTitleChange={this.handleTaskTitleChange}
            handleDescriptionChange={this.handleDescriptionChange}
            handleStartChange={this.handleStartChange}
            handleEndChange={this.handleEndChange}
            handleLocationChange={this.handleLocationChange.bind(this)}
            handleCategoryChange={this.handleCategoryChange}
            handleFrequencyChange={this.handleFrequencyChange}
            reRender={this.reRender.bind(this)}
            saveTask={this.saveTask}
            cancel={this.cancelTask}
            task={this.state.editTask}
            userID={this.state.userID}
          />
        </ScrollView>
      </View>
    ) : null
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    bottom: 50,

  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default TaskBuilder;
