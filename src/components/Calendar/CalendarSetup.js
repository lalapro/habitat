import React, { Component } from 'react';
import { View, Text, Image, Button, Linking, TouchableOpacity } from 'react-native';
import { AuthSession } from 'expo';
import axios from 'axios';
import Ecosystem from '../Frontend/EcoSystem';
import CalendarTasks from './CalendarTasks';


export default class CalendarSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      markers: '',
      categories: '',
      sync: false
    }
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this.setState({
      userID: this.props.screenProps.userID
    });
    this.getUserInfo();
  }

  getUserInfo() {
    axios.get('https://naturalhabitat.herokuapp.com/getUserInfo', { params: { userID: this.props.screenProps.userID }})
      .then(information => {
        let { markers, categories } = information.data;
        this.setState({ markers, categories });
      })
  }

  calendar(){
    console.log('hi')
    this.setState({
      sync: !this.state.sync
    });
  }

  goBack = async () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    console.log('setup!!!')
    return (
      <View style={{ display: 'flex', flex:1, alignItems: 'center', justifyContent: 'center', zIndex: 99}}>
        <TouchableOpacity
          style={{position: 'absolute', left: 16, top: 30}}
          onPress={() => this.props.navigation.navigate('DrawerToggle', {memes: true})}>
          <Text style={{color: 'blue', fontSize: 18}}>
            &#9776;
          </Text>
        </TouchableOpacity>
        {!this.state.sync ? <TouchableOpacity onPress={this.calendar.bind(this)}>
          <Image style={{ height: 300, width: 350}} source={require('../assets/googleCalendar.png')} />
        </TouchableOpacity>
        : (
          <CalendarTasks goBack={this.goBack} markers={this.state.markers} categories={this.state.categories} userID={this.state.userID}/>
        )}
      </View>
    )
  }
}
