import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    state = {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            onChangeText={this.props.handleUserInput}
            placeholder="username"
            style={{marginTop: 10, paddingHorizontal: 2, color: 'yellow'}}
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>
        <View style={styles.input}>
          <TextInput
            onChangeText={ this.props.handlePasswordInput }
            placeholder="password"
            secureTextEntry={true}
            style={{marginTop: 10, paddingHorizontal: 2, color: 'yellow'}}
            autoCapitalize='none'
            autoCorrect={false}
          />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  input: {
    height: 40,
    backgroundColor: '#99CCFF',
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: 'black',
    width: 150,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  }
})

export default LoginForm;
