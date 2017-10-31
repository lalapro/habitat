import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import axios from 'axios';

export default GetCurrentLocation = async (userID) => {

  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }

  let location = await Location.getCurrentPositionAsync({});

<<<<<<< HEAD
  axios.put(`http://10.16.1.233:3000/updateLocation`, { userID: userID, location: location})
=======
  axios.put(`http://10.16.1.233:3000/updateLocation`, { userID: userID, location: location})
>>>>>>> merge
  .then(res => console.log('update success'))
  return location;
}
