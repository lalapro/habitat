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
			<View style={{marginTop: 22, marginHorizontal: 22}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          style={{marginTop: 22, backgroundColor: 'rgba(255,255,255,0.5'}}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
					 <Button
						 onPress={() => this.toggleModal()}
						 title="LogOuttttt"
					 />
        </Modal>
      </View>

    );
  }
}
