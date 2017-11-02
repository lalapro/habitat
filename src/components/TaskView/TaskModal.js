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
      // modalVisible: false,
      tasks: []
    }
    // this.hideModal = this.hideModal.bind(this);
  }

  componentWillMount() {
    this.setState({
      // modalVisible: this.props.modalVisible,
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
    console.log(this.props.goToEditTask)
    const { fontsAreLoaded } = this.state;
    
    console.log('in task Modal looking at tasks', this.state.tasks)
    return (
      <View style={{marginTop: 22, marginHorizontal: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          style={{backgroundColor: 'rgba(255,255,255,0.5'}}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
         <View >
         <ScrollView 
            style={styles.scrollView}
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}
            style={styles.scrollView}
          >
            <List>
              <TouchableHighlight onPress={() => this.props.closeModal()}><Text style={{fontSize: 30, textAlign: 'right', marginTop: 5}}>&#x2612;</Text></TouchableHighlight>
              {this.state.tasks.map((task, i) => {
                console.log('in the task mapping of AllTasks', this.props.goToEditTask)
                return (
                  <AllTasks 
                    task={task} 
                    key={i} 
                    marker={this.props.marker} 
                    reRender={this.reRender.bind(this)} 
                    goToEditTask={this.props.goToEditTask}/>
                )
              })}
            </List>
          </ScrollView>
         </View>
        </Modal>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: 'black',
    // height: 300
    marginTop: 15
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
    marginBottom: 5,
  }
})
export default TaskModal;
