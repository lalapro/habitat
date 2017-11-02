import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

export default GetAllUserMarkers = async () => {

  axios.get('https://naturalhabitat.herokuapp.com/markers')
    .then(markers => markers)
    .catch(err => err)
}
