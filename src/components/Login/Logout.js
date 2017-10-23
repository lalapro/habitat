import React, { Component } from 'react';
import { Text, Image, Button, AsyncStorage, Modal, View } from 'react-native';
import { onSignOut } from '../auth'

export default class Logout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: true
		}
	}
	static navigationOptions = {
    drawerLabel: 'Logout'
  };

	toggleModal() {
		this.setState({modalVisible: false});
		// console.log('logouting', this.props)
		this.props.screenProps.handleLogout()
		this.props.navigation.navigate("SignedOut")
		AsyncStorage.removeItem('user_token');
	}



  render() {
    return (
			<View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          style={{marginTop: 22, backgroundColor: 'rgba(100,255,100,0.5', height: 20, flex: 0.5}}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >	
					<View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 22, marginHorizontal: 22, backgroundColor: 'purple'}}>
						<View style={{ marginTop: 15, marginHorizontal: 22, backgroundColor: 'white', height: 250, width: 250}}></View>
						<Text>Are you sure you want to leave?</Text>
						<Button
							onPress={() => this.toggleModal()}
							title="Yes, I'm sure."
						/>
						<Button 
							onPress = {() => this.props.navigation.goBack()}
							title="Nevermind, take me back."
						/>
					 </View>
        </Modal>
      </View>

    );
  }
}
