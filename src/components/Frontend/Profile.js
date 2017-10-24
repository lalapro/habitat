import React, { Component } from 'react';
import { AsyncStorage, Modal, ImageStore, StyleSheet, Text, View, Image, TextInput, Button, Clipboard, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import Expo, { Asset, Camera, Permissions, ImagePicker } from 'expo';
import axios from 'axios';
import AllTasks from './AllTasks.js';
// import base from 'base-64';
// import utf8 from 'utf8';
// import RNFetchBlob from 'react-native-fetch-blob';
// import imgPicker from 'react-native-image-picker';
// import RNFS from 'react-native-fs'
// import Cameras from 'react-native-camera';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            image: require('../assets/Profile.png'),
            uploading: false,
            visibleModal: false,
            username: null,
            dates: null,
            allDates: null,
        }
        this.showModal = this.showModal.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.getPicture = this.getPicture.bind(this);
        this.getCompletedTask = this.getCompletedTask.bind(this);
        this.renderDates = this.renderDates.bind(this);
    }

    componentDidMount() {
        this.setState({
            username: this.props.screenProps.userID
        })
        this.getPicture();    
        this.getCompletedTask();
    }

    getPicture() {
        axios({
            method: 'get',
            url: 'http://10.16.1.152:3000/pictures',
            params: {
              username: this.props.screenProps.userID
            }
        })
        .then(res => {
            let jpg = 'data:image/jpg;base64,' + res.data.picture;
            this.setState({
                image: jpg
            })
        })
    }

    getCompletedTask() {
        axios({
            method: 'get',
            url: 'http://10.16.1.233:3000/completedTasks',
            params: {
              username: this.props.screenProps.userID
            }
        })
        .then(res => {
            var completed = [];
            var notCompleted = [];
            var allDates = [];
            var dates = [];
            res.data.forEach(ele => {
                let eachDate = ele.Start.split(' ').slice(0, 3).reduce((acc, ele) => {
                    return `${acc} ${ele}`;
                });
                eachDate = eachDate.slice(0, eachDate.length - 1);
                
                if (!dates.includes(eachDate)) {
                    let temp = {
                        date: eachDate,
                        completed: [],
                        notCompleted: []
                    }
                    if (ele.Comletion === 'Yes') {
                        temp.completed.push(ele);
                    } else {
                        temp.notCompleted.push(ele);
                    }
                    dates.push(eachDate)
                    allDates.push(temp);
                } else if (dates.includes(eachDate)) {
                    allDates.map(element => {
                        if (element.date === eachDate) {
                            if (ele.Completion === 'Yes') {
                                element.completed.push(ele)
                            } else {
                                element.notCompleted.push(ele)
                            }
                        }
                    })
                }
            })
            this.setState({
                dates: dates,
                allDates: allDates
            })
            this.renderDates()
        })
    }

    renderDates() {
        return this.state.allDates ? this.state.allDates.map((ele, i) => {
            return <AllTasks ele={ele} key={i} allDates={this.state.allDates} />
        }) : null;
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
        .catch(err => console.log(err, 'ERR!!!'))
        this.handlePicture(picture);
    }
    
    handlePicture = async picture => {
        try {
            // this.setState({ image: picture.uri });
            this.setState({ visibleModal: !this.state.visibleModal });
            if (!picture.cancelled) {
            }
        } catch (e) {
            console.log({ e }, 'error!');
            alert('This is not working');
        } finally {
            this.setState({ uploading: false });
            this.uploadPhoto(picture);
        }
    }
    // SaveURI(uri) {           // ImageStoreMethod for IOS
    //  ImageStore.getBase64ForTag(uri, (success) => {
    //      axios.post('http://10.16.1.152:3000/pictures', { Picture: uri })
    //          .then(res => {
    //              console.log(res.data);
    //              let decoded = 'data:image/jpg;base64,' + success;
    //              this.setState({ image: decoded });
    //          })
    //  }, (failure) => {console.log(failure)})
    // }
    
    uploadPhoto(picture) {
        let uri = picture.base64;
        console.log(!!uri)
        let pictureText = 'data:image/jpg;base64,' + uri;
        axios.post('http://10.16.1.152:3000/pictures', { picture: uri, username: this.state.username })
            .then(res => {
                let jpg = 'data:image/jpg;base64,' + res.data.picture
                this.setState({
                    image: jpg
                })
              })
        // ImageStore.addImageFromBase64(uri, (success) => { this.SaveURI(success) },
        //      (failure) => { console.log(failure) });
    }


    showModal(stat) {
        this.setState({ visibleModal: stat })
    }
    render() {


        return (
    <View style={{flex: 1, backgroundColor: '#ddd'}}>
        <View style={{marginLeft: 5, marginTop: 20, alignItems: 'flex-start', backgroundColor: 'yellow'}}>
            <Button
                onPress={() => this.props.navigation.navigate('DrawerToggle')}
                title="&#9776;"
            />
        </View>
        <View style={styles.top}>
            <Image style={styles.photo} source={{uri: `${this.state.image}`}} />
            <Button onPress={() => this.showModal(!this.state.visibleModal)} title={'Edit'} style={{flex: 1}}/>
        </View>
        <View style={styles.middle}>
            {this.renderDates()}



        </View>












            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.visibleModal}
              onRequestClosed={() => {alert('Photo is not selected!!')}}
            >
                <View>
                <View style={{height: 470, opacity: 0.7, backgroundColor: '#ddd'}}>
                    <Image source={require('../assets/toastlogo.png')} style={{height: '100%', width: '100%', opacity: 0.8}}/>
                </View>
                <View style={{height: '100%', backgroundColor: '#ddd', opacity: 0.7}}>
                    <View style={styles.button} >
                         <Button title={`Take a photo`} onPress={this.takePhoto}/>
                    </View>
                    <View style={styles.button} >
                        <Button title={`Photo from library`} onPress={this.pickPhoto} />
                    </View>
                    <View style={styles.button} >
                        <Button title={`Close`} onPress={() => {this.showModal(!this.state.visibleModal)}} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    top: {
        flex: 1, 
        alignItems: 'center', 
        backgroundColor: 'blue'
    },
    photo: {
        backgroundColor: 'black',
        flex: 9,
        width: 140,
        height: 140,
        borderRadius: 50,
        opacity: 0.7,
        borderBottomLeftRadius: 50,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 5
    },
    middle: {
        flex: 3,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'red',
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
})
