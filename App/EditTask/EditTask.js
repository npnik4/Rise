/* eslint-disable react-native/no-inline-styles */
//
//  EditTask
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './EditTaskStyleSheet';
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
import {editTask, deleteTask} from '../actions';

class EditTask extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      taskiconImageScale: new Animated.Value(-1),
      taskiconImageOpacity: new Animated.Value(-1),
      savebuttonButtonTranslateY: new Animated.Value(-1),
      deletebuttonButtonTranslateY: new Animated.Value(-1),
      taskName: this.props.task.title,
      mins: this.props.task.time ? this.props.task.time : 20,
      isDisabled: true,
    };
  }

  componentDidMount() {
    this.startAnimationTwo();
  }

  createAlert = (title, body) => {
    Alert.alert(title, body, [{text: 'OK'}], {cancelable: false});
  };

  onSaveButtonPressed = (mins, taskName) => {
    if (taskName) {
      this.props.dispatch(editTask(mins, taskName));
      const navigation = this.context;
      navigation.navigate('Tasks');
    } else {
      this.createAlert('Task Incomplete', 'Missing: \n' + 'Task Name');
    }
  };

  onDeleteButtonPressed = () => {
    this.props.dispatch(deleteTask());
    const navigation = this.context;
    navigation.navigate('Tasks');
  };

  onPlusButton = () => {
    this.setState({mins: this.state.mins + 1, isDisabled: false});
    // this.props.task.time = this.props.task.time + 1;
  };

  onMinusButton = () => {
    this.setState({mins: this.state.mins - 1, isDisabled: false});
  };

  onChangeMins = (mins) => {
    // this.props.task.time = mins;
    this.setState({mins: mins, isDisabled: false});
  };

  startAnimationOne() {
    // Set animation initial values to all animated properties
    this.state.taskiconImageScale.setValue(0);
    this.state.taskiconImageOpacity.setValue(0);

    // Configure animation and trigger
    Animated.parallel([
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
    ]).start();
  }

  startAnimationTwo() {
    // Set animation initial values to all animated properties
    this.state.savebuttonButtonTranslateY.setValue(0);
    this.state.deletebuttonButtonTranslateY.setValue(0);

    // Configure animation and trigger
    Animated.parallel([
      Animated.parallel([
        Animated.timing(this.state.savebuttonButtonTranslateY, {
          duration: 1000,
          easing: Easing.bezier(0, 0, 1, 1),
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.deletebuttonButtonTranslateY, {
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
      <View style={styles.edittaskView}>
        <StatusBar barStyle="dark-content" />
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
              height: 143,
            }}>
            <Text style={styles.taskNameText}>Task Name</Text>
            <View style={styles.tasktextboxView}>
              <TextInput
                multiline={true}
                returnKeyType="done"
                autoCorrect={true}
                blurOnSubmit={true}
                placeholder="Get Dressed…"
                onChangeText={(taskName) =>
                  this.setState({taskName, isDisabled: false})
                }
                value={this.state.taskName}
                style={styles.getDressedTextInput}
              />
            </View>
          </View>
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 71,
              right: 70,
              top: 250,
              bottom: 26,
              alignItems: 'center',
            }}>
            <Text style={styles.approximateTaskLenText}>
              Approximate Task Length
            </Text>
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
                    // marginLeft: 13,
                    // marginRight: 13,
                    paddingHorizontal: 13,
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
                  style={styles.textInputTextInput}
                  onChangeText={(mins) => this.onChangeMins(mins)}
                  value={this.state.mins.toString()}
                />
                <Text style={styles.minsText}>mins</Text>
              </View>
            </View>
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
                      translateY: this.state.deletebuttonButtonTranslateY.interpolate(
                        {
                          inputRange: [-1, 0, 1],
                          outputRange: [0.01, 70, 0],
                        },
                      ),
                    },
                  ],
                },
                styles.deletebuttonButtonAnimated,
              ]}>
              <TouchableOpacity
                onPress={() => this.onDeleteButtonPressed()}
                style={styles.deletebuttonButton}>
                <Text style={styles.deletebuttonButtonText}>Delete</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      translateY: this.state.savebuttonButtonTranslateY.interpolate(
                        {
                          inputRange: [-1, 0, 1],
                          outputRange: [0.01, 60, 0],
                        },
                      ),
                    },
                  ],
                },
                styles.savebuttonButtonAnimated,
              ]}>
              <TouchableOpacity
                onPress={() =>
                  this.onSaveButtonPressed(this.state.mins, this.state.taskName)
                }
                style={styles.savebuttonButton}
                disabled={this.state.isDisabled}>
                <Text style={styles.savebuttonButtonText}>Save</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const {tasks, selectedDay, selectedTask} = state.Tasks;
  const task = tasks[0][selectedDay][selectedTask];
  return {task};
};

export default connect(mapStateToProps)(EditTask);
