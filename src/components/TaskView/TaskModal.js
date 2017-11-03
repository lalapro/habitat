import React, { Component } from 'react';
import { CheckBox, FlatList, Modal, Text, TouchableHighlight, View, Button, ScrollView, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Font, AppLoading} from 'expo';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import TaskItem from './TaskItem.js';
import AllTasks from '../Frontend/AllTasks.js'
class TaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }
  componentWillMount() {
    this.setState({
      tasks: this.props.tasks
    })
  }
  componentWillReceiveProps() {
    this.setState({
      tasks: this.props.tasks
    })
  }
  closeModal() {
    this.props.closeModal()
  // )
  }

  reRender() {
    this.componentDidMount()
  }
  render() {
    const { fontsAreLoaded } = this.state;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
        <View style={styles.modalContent}>
          <ScrollView
            style={styles.scrollView}
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}
          >
            <TouchableHighlight onPress={() => this.props.closeModal()}>
              <Text style={{fontSize: 30, textAlign: 'right', marginTop: 5, marginRight: 5}}>&#x2612;</Text>
            </TouchableHighlight>
            {this.state.tasks.map((task, i) => {
              return (
                <AllTasks
                  task={task}
                  key={i}
                  marker={this.props.marker}
                  reRender={this.reRender.bind(this)}
                  goToEditTask={this.props.goToEditTask}
                />
              )
            })}
          </ScrollView>
         </View>
        </Modal>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center'
  },
  scrollView: {
    backgroundColor: 'white',
    width: 300,
    height: 300,
    opacity: .8
  },
  modalContent: {
    opacity: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
    marginTop: 100,
    marginBottom: 100,
  },
  list: {
    borderColor: 'black',
    padding: 5
  }
})
export default TaskModal;
