//
//  BlankScreen
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './BlankScreenStyleSheet';
import {ScrollView, Text, View, StatusBar, Switch, Button} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
// import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

class BlankScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
    };
  }

  componentDidMount = () => {
    // let mode = await AsyncStorage.getItem('darkMode');
    // mode2 = mode == 'true' ? true : false;
    // this.setState({ isEnabled: mode2 });
    // console.log('mode', mode2)
    if (__DEV__) {
      functions().useFunctionsEmulator('http://localhost:5001');
    }
  };

  toggleSwitch = async () => {
    this.setState({isEnabled: !this.state.isEnabled});
    let darkMode = !this.state.isEnabled ? 'true' : 'false';
    try {
      await AsyncStorage.setItem('darkMode', darkMode);
    } catch (e) {
      console.log(e);
    }
  };

  saveData = async () => {
    const weekDay = getStringDay();
    let tasks = this.props.tasks[0][weekDay];
    tasks = formatTasks(tasks);
    // const todaysProfile = getTodaysProfile(this.props.profiles, weekDay);
    // console.log(tasks);
    functions()
      .httpsCallable('scheduleCreator')()
      .then((res) => {
        console.log(tasks);
        this.processTimes(res.data, tasks);
      })
      .catch((e) => console.log(e));
  };

  processTimes = (res, tasks) => {
    // var MS_PER_MINUTE = 60000;
    for (const i in res) {
      let date = new Date(res[i]);
      date = new Date(date);
      console.log(tasks[i] ? tasks[i] : i, this.formatTime(date));
    }
  };

  //.getTime() - date.getTimezoneOffset() * MS_PER_MINUTE,

  formatTime = (date) => {
    if (date) {
      date = new Date(date);
      var hours = date.getUTCHours();
      var minutes = date.getUTCMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    } else {
      return '';
    }
  };

  render() {
    return (
      <View style={styles.blankscreenView}>
        <StatusBar barStyle="dark-content" />
        <View
          pointerEvents="box-none"
          style={{
            flex: 1,
            marginTop: 15,
          }}>
          <View style={styles.rectangleView} />
          <ScrollView style={styles.infocardScrollView}>
            <View style={styles.themeView}>
              <Text style={styles.DarkMode}>Dark Mode</Text>
              <Switch
                trackColor={{false: '#767577', true: '#767577'}}
                thumbColor={
                  this.state.isEnabled ? 'rgb(252, 102, 129)' : '#f4f3f4'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.toggleSwitch()}
                value={this.state.isEnabled}
              />
            </View>
            <View style={styles.saveButtonView}>
              <Button title="Save Data" onPress={() => this.saveData()} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {userToken} = state.loginReducer;
  const {tasks} = state.Tasks;
  const {profiles} = state.profile;
  return {userToken, tasks, profiles};
};

export default connect(mapStateToProps)(BlankScreen);

function getStringDay() {
  const date = new Date().getDay();
  const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thrusday',
    5: 'Friday',
    6: 'Saturday',
  };
  return days[date];
}

function formatTasks(tasks) {
  const formattedTasks = {};
  if (!tasks) {
    return;
  }
  tasks.forEach((task) => {
    formattedTasks[task.index] = task.time;
  });
  return formattedTasks;
}

function getTodaysProfile(profiles, day) {
  let tempObj = null;
  profiles.forEach((profile) => {
    if (profile.SelectedDays.includes(day)) {
      tempObj = Object.assign({}, profile);
    }
  });
  return tempObj;
}
