import React, { Component } from 'react';
import { Text, Image, Button, AsyncStorage, Modal, View, StyleSheet } from 'react-native';
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
					<View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 22, marginHorizontal: 22, backgroundColor: 'purple', opacity: 0.7,}}>
					<View>
							<View style={{flex: 1,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center', height: '100%', justifyContent: 'center' }}>
								 <Image source={require("../assets/habit@/logout.png")} style={{width: 150, height: 150}}/>
								<Text>Are you sure you want to leave?</Text>
								<View style={styles.button} >
									<Button
										onPress={() => this.toggleModal()}
										title="Yes, I'm sure."
									/>
								</View>
								<View style={styles.button} >
									<Button
										onPress = {() => this.props.navigation.goBack()}
										title="Nevermind, take me back."
									/>	
								</View>
							</View>
          	</View>
					</View>
        </Modal>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#CC99FF',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'black',
    width: 250,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  }
})

