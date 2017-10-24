import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class AllTasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,

        }
        this.renderDetails = this.renderDetails.bind(this);
        // this.renderTasks = this.renderTasks.bind(this);
    }

    renderDetails(visible, date) {
        console.log(date, 'DATE!!')
        this.setState({
            showDetails: visible
        });
        // this.renderTasks(date);
    }

    // renderTasks(specificDate) {

        // let completedTasks = this.state.showDetails ? specificDate.completed.map(ele => {
        //     return <Text>`Title: ${ele.Task_Title}, Task: ${Task_Description}`</Text>
        // }) : null;
        // let notCompletedTasks = this.state.showDetails ? specificDate.notCompleted.map(ele => {
        //     return <Text>`Title: ${ele.Task_Title}, Task: ${Task_Description}`</Text>        
        // }) : null;
        
        // return <View>
        //     <Text>
        //         {completedTasks}
        //     </Text>
        //     <Text>
        //         {notCompletedTasks}
        //     </Text>
        // </View>
    // }



    render() {
        let { ele } = this.props;
        console.log(ele)
        let completedTasks = this.state.showDetails ? ele.completed.map((ele, i) => {
            return <Text style={stylyes.completed} key={i}>Title: {ele.Task_Title}, Task: {ele.Task_Description}, Completed: YES</Text>
        }) : null;
        let notCompletedTasks = this.state.showDetails ? ele.notCompleted.map((ele, i) => {
            return <Text style={styles.tasks} key={i}>Title: {ele.Task_Title}, Task: {ele.Task_Description}, Completed: NO</Text>        
        }) : null;
        
        let renderTasks = function() {
            return <View style={{ justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <View style={styles.dates}>
                    {completedTasks}
                </View>
                <View>
                    {notCompletedTasks}
                </View>
            </View>
        }
        
        return(
            <View>
            <TouchableOpacity onPress={() => this.renderDetails(!this.state.showDetails, this.props.ele)}>
                <Text>
                    {this.props.ele.date}
                </Text>
            </TouchableOpacity>
                
                <View>
                    {renderTasks()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dates: {
    },
    tasks: {
        fontSize: 24
    },
})