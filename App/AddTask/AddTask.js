/* eslint-disable react-native/no-inline-styles */
//
//  AddTask
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './AddTaskStyleSheet';
import {
  Animated,
  Easing,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {connect} from 'react-redux';
import {addTask, addTaskMutli} from '../actions';
import DayPicker from '../Components/DayPicker';
import Spinner from '../Components/Spinner';
import {verifyTasks} from '../actions/messageHelper';

class AddTask extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      addanotherbuttonButtonTranslateY: new Animated.Value(-1),
      taskiconImageScale: new Animated.Value(-1),
      taskiconImageOpacity: new Animated.Value(-1),
      donebuttonButtonTranslateY: new Animated.Value(-1),
      mins: 20,
      taskName: '',
      selectedDays: [],
      spinner: false,
    };
  }

  componentDidMount() {
    this.startAnimationOne();
  }

  onPlusButton = () => {
    this.setState({mins: this.state.mins + 1});
  };

  onMinusButton = () => {
    this.setState({mins: this.state.mins - 1});
  };

  onAddAnotherButtonPressed = (mins, taskName) => {
    this.setState({spinner: true});
    let selDays = Object.assign([], this.state.selectedDays);
    if (selDays.length > 0) {
      if (mins && taskName) {
        this.props.dispatch(addTaskMutli(mins, taskName, selDays));
        this.props.dispatch(addTask(mins, taskName));
        this.setState({taskName: '', mins: 20, spinner: false});
      } else {
        this.setState({spinner: false});
        this.createAlert('Task incomplete', 'Missing: \n' + 'Task Name');
      }
    } else {
      if (mins && taskName) {
        this.props.dispatch(addTask(mins, taskName));
        this.setState({taskName: '', mins: 20, spinner: false});
      } else {
        this.setState({spinner: false});
        this.createAlert('Task incomplete', 'Missing: \n' + 'Task Name');
      }
    }
  };

  createAlert = (title, body) => {
    Alert.alert(title, body, [{text: 'OK'}], {cancelable: false});
  };

  daySelected = (day) => {
    if (day !== this.props.selectedDay) {
      let days = this.state.selectedDays;
      if (days.includes(day)) {
        const i = days.indexOf(day);
        days.splice(i, 1);
      } else {
        days.push(day);
      }
      this.setState({selectedDays: days});
    }
  };

  onDoneButtonPressed = (mins, taskName) => {
    this.setState({spinner: true});
    let selDays = Object.assign([], this.state.selectedDays);
    if (selDays.length > 0) {
      if (mins && taskName) {
        this.props.dispatch(addTaskMutli(mins, taskName, selDays));
        this.props.dispatch(addTask(mins, taskName));
        this.setState({spinner: false});
        const navigation = this.context;
        this.props.dispatch(verifyTasks());
        navigation.navigate('Tasks');
      } else {
        this.setState({spinner: false});
        this.createAlert('Task incomplete', 'Missing: \n' + 'Task Name');
      }
    } else {
      if (mins && taskName) {
        this.props.dispatch(addTask(mins, taskName));
        this.setState({spinner: false});
        this.props.dispatch(verifyTasks());
        const navigation = this.context;
        navigation.navigate('Tasks');
      } else {
        this.setState({spinner: false});
        this.createAlert('Task incomplete', 'Missing: \n' + 'Task Name');
      }
    }
  };

  startAnimationOne() {
    // Set animation initial values to all animated properties
    this.state.donebuttonButtonTranslateY.setValue(0);
    this.state.taskiconImageScale.setValue(0);
    this.state.taskiconImageOpacity.setValue(0);
    this.state.addanotherbuttonButtonTranslateY.setValue(0);

    // Configure animation and trigger
    Animated.parallel([
      Animated.parallel([
        Animated.timing(this.state.donebuttonButtonTranslateY, {
          duration: 1000,
          easing: Easing.bezier(0, 0, 1, 1),
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.taskiconImageScale, {
          duration: 1000,
          easing: Easing.bezier(0.22, 0.61, 0.36, 1),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.taskiconImageOpacity, {
          duration: 1000,
          easing: Easing.bezier(0.22, 0.61, 0.36, 1),
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.addanotherbuttonButtonTranslateY, {
          duration: 1000,
          easing: Easing.bezier(0, 0, 1, 1),
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }

  render() {
    return (
      <View style={styles.addtaskView}>
        <StatusBar barStyle="dark-content" />
        {this.state.spinner ? <Spinner /> : null}
        <View
          pointerEvents="box-none"
          style={{
            flex: 1,
            marginTop: 20,
          }}>
          <View style={styles.backgroundcardView}>
            <Image
              source={require('./../../assets/images/BackgroundCard.png')}
              style={{resizeMode: 'contain'}}
            />
          </View>
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.rectangleView} />
            </TouchableWithoutFeedback>
          </View>
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 43,
              right: 42,
              top: 70,
              bottom: 110,
              alignItems: 'center',
            }}>
            <Text style={styles.taskNameText}>Task Name</Text>
            <View style={styles.tasktextboxView}>
              <TextInput
                returnKeyType="done"
                multiline={true}
                blurOnSubmit={true}
                autoCorrect={true}
                onChangeText={(taskName) => this.setState({taskName})}
                placeholder="Get Dressed…"
                value={this.state.taskName}
                style={styles.getDressedTextInput}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                top: 130,
                bottom: 0,
              }}>
              <Text style={styles.approximateTaskLenText}>
                Approximate Task Length
              </Text>
            </View>
            <View style={styles.counterView}>
              <View
                pointerEvents="box-none"
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  top: 0,
                  bottom: 0,
                  justifyContent: 'center',
                }}>
                <View style={styles.textFieldView} />
              </View>
              <View
                pointerEvents="box-none"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: 'center',
                }}>
                <View
                  pointerEvents="box-none"
                  style={{
                    height: 40,
                    marginLeft: 16,
                    marginRight: 13,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.onMinusButton()}
                    style={styles.buttonTwoButton}>
                    <Text style={styles.buttonTwoButtonText}>-</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => this.onPlusButton()}
                    style={styles.buttonButton}>
                    <Text style={styles.buttonButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                pointerEvents="box-none"
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  width: 33,
                  top: 8,
                  height: 37,
                  alignItems: 'center',
                }}>
                <TextInput
                  keyboardType="number-pad"
                  autoCorrect={false}
                  onChangeText={(mins) =>
                    this.setState({mins: parseInt(mins, 10)})
                  }
                  style={styles.textInputTextInput}
                  value={this.state.mins.toString()}
                />
                <Text style={styles.minsText}>mins</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: 15,
              }}>
              <Text style={styles.approximateTaskLenText}>Repeat task on</Text>
              <DayPicker
                selectedDays={this.state.selectedDays}
                onDayPressed={(day) => this.daySelected(day)}
              />
            </View>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      translateY: this.state.addanotherbuttonButtonTranslateY.interpolate(
                        {
                          inputRange: [-1, 0, 1],
                          outputRange: [0.01, 50, 0],
                        },
                      ),
                    },
                  ],
                },
                styles.addanotherbuttonButtonAnimated,
              ]}>
              <TouchableOpacity
                onPress={() =>
                  this.onAddAnotherButtonPressed(
                    this.state.mins,
                    this.state.taskName,
                  )
                }
                style={styles.addanotherbuttonButton}>
                <Text style={styles.addanotherbuttonButtonText}>
                  Add Another
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              alignSelf: 'center',
              width: 234,
              top: 300,
              bottom: 26,
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
              }}
            />
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      translateY: this.state.donebuttonButtonTranslateY.interpolate(
                        {
                          inputRange: [-1, 0, 1],
                          outputRange: [0.01, 50, 0],
                        },
                      ),
                    },
                  ],
                },
                styles.donebuttonButtonAnimated,
              ]}>
              <TouchableOpacity
                onPress={() =>
                  this.onDoneButtonPressed(this.state.mins, this.state.taskName)
                }
                style={styles.donebuttonButton}>
                <Text style={styles.donebuttonButtonText}>Add</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {selectedDay} = state.Tasks;
  return {
    selectedDay,
  };
};

export default connect(mapStateToProps)(AddTask);
