import React, { Component } from 'react';
import{ StyleSheet, View, Image, Text, TouchableWithoutFeedback, Button, Picker, ScrollView, Alert, AsyncStorage, Dimensions } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import EcosystemViewPractice from '../Frontend/EcosystemViewPractice'
import axios from 'axios';

const { height, width } = Dimensions.get('window');

export default class Friends extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.screenProps.userID,
      giftPoints: this.props.screenProps.giftPoints,
      friends: [],
      userToken: null,
      selectedFriend: null,
      selectedLocationId: null,
      locationIsClicked: false,
      loadingEcosystem: false,
      selectedLocations: [],
      upgradeImages: [],
      posImages: [],
      downgradeImages: [],
      negImages: [],
      normalImages: [],
      selectedEco: 0
    }
    this.giveGift = this.giveGift.bind(this);
  }

  componentDidMount() {
    // this.checkAsyncStorage();
    axios.get(`https://naturalhabitat.herokuapp.com/friends`, { params: { user: this.state.userId }})
    .then(friends => {
      this.setState({ friends: friends.data })
    })
  }

  selectFriend(friend, key) {
    this.setState({
      selectedLocations: [],
      upgradeImages: [],
      posImages: [],
      downgradeImages: [],
      negImages: [],
      normalImages: [],
      selectedFriend: friend.Friend
    })

    axios.get(`https://naturalhabitat.herokuapp.com/mapMarkers`, { params: { userID: friend.Friend}})
    .then(res => {
      console.log(res.data, 'res data from mapmarkers')
      this.setState({
        selectedLocations: res.data || [],
      })
    })
    .catch(err => console.error(err));
  }

  showEcosystem(location) {
    this.setState({
      selectedEco: location.Ecosystem,
      selectedLocation: location.Marker_ID,
      locationIsClicked: true,
      upgradeImages: [],
      posImages: [],
      downgradeImages: [],
      negImages: [],
      normalImages: []
    })
    let upgradeImageNumber = Math.floor(location.PositivePoints/10);
    let positiveImageNumber = location.PositivePoints%10;
    let downgradeImageNumber = Math.floor(location.NegativePoints/4);
    let negativeImageNumber = location.NegativePoints%4;
    upgradeImages = new Array(upgradeImageNumber);
    upgradeImages.fill(location.Ecosystem);
    posImages = new Array(positiveImageNumber);
    posImages.fill(location.Ecosystem)
    downgradeImages = new Array(downgradeImageNumber);
    downgradeImages.fill(location.Ecosystem);
    negImages = new Array(negativeImageNumber);
    negImages.fill(location.Ecosystem);
    this.setState({
      selectedLocation: location.Marker_ID,
      locationIsClicked: true,
      upgradeImages: upgradeImages || [],
      posImages: posImages || [],
      downgradeImages: downgradeImages || [],
      negImages: negImages || [],
      normalImages: location.tasks || []
    })
  }

  giveGift() {
    if (this.state.giftPoints <= 0) {
      Alert.alert(`you don't have any giftpoints to give out. Please wait till tomorrow`);
      return;
    }
    this.setState({
      giftPoints: this.state.giftPoints - 1
    })
    axios.put('https://naturalhabitat.herokuapp.com/gift', {
      userId: this.state.userId,
      friendEcosystem: this.state.selectedLocation
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
  }

  checkAsyncStorage = async () => {
    const tokenInPhone = await AsyncStorage.getItem(`user_token`)
    this.setState({tokenInPhone});
  }

  render() {
    return (
      <Image style={{flex: 1}}  source={backgrounds[this.state.selectedEco][1]}>
        <View style={{flex: 1.5}}>
          <View style={{margin: -10, marginLeft: 5, marginTop: 20, alignItems: 'flex-start'}}>
            <Button
              onPress={() => this.props.navigation.navigate('DrawerToggle', {memes: true})}
              title="&#9776;"
            />
          </View>
          <ScrollView horizontal={true} style={{borderBottomWidth: 1, borderColor: "black"}}>
            {this.state.friends.map((friend, key) => {
              return (
                <View key={key} style={styles.friends}>
                  <TouchableWithoutFeedback onPress={() => this.selectFriend(friend, key)}>
                    <Image source={{uri: friend.Pic}} style={styles.photo}/>
                  </TouchableWithoutFeedback>
                  <Text style={styles.name}>
                    {friend.Friend_Name.split(' ')[0]}
                  </Text>
                </View>
              )
            })}
          </ScrollView>
        </View>
        <View style={{flex: 4}}>
          {/* <Text>Current Amount of GiftPoints: {this.state.giftPoints}</Text> */}
            {this.state.loadingEcosystem ? (
              <View>
                <Image source={require('../assets/loading.gif')} style={{width: 200, height: 200}}/>
              </View>
            ) : (
              <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <ScrollView horizontal={true}>
                    {this.state.selectedLocations.map((location, i) => {
                      return i === 0 ? (
                        <Text style={{margin: 10}} key={i} onPress={() => this.showEcosystem(location)}>
                          {location.Marker_Title}
                        </Text>
                      ) :
                      (
                        <Text style={{margin: 10}} key={i} onPress={() => this.showEcosystem(location)}>
                          {location.Marker_Title}
                        </Text>
                      )
                    })}
                  </ScrollView>
                </View>
                {this.state.locationIsClicked ? (
                  <View style={{flex: 7}}>
                    <View style={{flex: 1, flexDirection:'row', flexWrap: 'wrap'}} >
                      {this.state.upgradeImages.map((img, i) => (
                        <EcosystemViewPractice img={img} key={i} version={3}/>
                      ))}
                      {this.state.posImages.map((img, i) => (
                        <EcosystemViewPractice img={img} key={i} version={2}/>
                      ))}
                      {this.state.downgradeImages.map((img, i) => (
                        <EcosystemViewPractice img={img} key={i} version={4}/>
                      ))}
                      {this.state.negImages.map((img, i) => (
                        <EcosystemViewPractice img={img} key={i} version={0}/>
                      ))}
                    </View>
                  </View>
                ) : (
                  <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>
                      Place holder for blank space.
                    </Text>
                  </View>
                )}
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  {this.state.locationIsClicked ? <Button
                    title="Give Gift"
                    onPress={this.giveGift}
                  /> : null}
                </View>
              </View>
            )}
        </View>
      </Image>
    )
  }
}

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

const backgrounds = [
  [0, require("../assets/habit@/water-bg.png")],
  [1, require("../assets/habit@/sky-bg.png")],
  [2, require("../assets/habit@/leaf-bg.png")],
]

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
  },
  photo: {
    borderRadius: 50,
    borderBottomLeftRadius: 50,
    zIndex: 3,
    width: 100,
    height: 100
  },
  selected: {
    borderRadius: 50,
    borderBottomLeftRadius: 50,
    zIndex: 3,
    width: 100,
    height: 100
  },
  name: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
  },
  backgroundName: {
    fontSize: 14,
    marginTop: 5,
  },
  friends: {
    margin: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
