/* eslint-disable react-native/no-inline-styles */
//
//  TasksScreen
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import Task from './Task';
import styles from './TasksScreenStyleSheet';
import {Image, Text, TouchableOpacity, View, StatusBar} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {connect} from 'react-redux';
import {setSelectedDay, setOrdered} from '../actions';
import DraggableFlatList from 'react-native-draggable-flatlist';

class TasksScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onDayPressed = (day) => {
    this.props.dispatch(setSelectedDay(day));
  };

  onAddButtonPressed = () => {
    const navigation = this.context;
    navigation.navigate('AddTask');
  };

  renderItemList = () => {
    return (
      <Text style={{...styles.noTasksFound, fontWeight: 'bold', fontSize: 14}}>
        No Tasks Found {'\n'}
        <Text style={styles.noTasksFound}>
          Click the '+' button above {'\n'} to set up tasks for{' '}
          {this.props.selectedDay}
        </Text>
      </Text>
    );
  };

  renderItem = ({item, index, drag, isActive}) => {
    return (
      <Task index={index} title={item.title} time={item.time} drag={drag} />
    );
  };

  reOrderedList = (data) => {
    for (const i in data) {
      data[i].index = i;
    }
    console.log(data);

    this.props.dispatch(setOrdered(data));
  };

  render() {
    return (
      <View style={styles.tasksscreenView}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity
          onPress={this.onAddButtonPressed}
          style={styles.addbuttonButton}>
          <Image
            source={require('./../../assets/images/AddButton.png')}
            style={styles.addbuttonButtonImage}
          />
        </TouchableOpacity>
        <View
          pointerEvents="box-none"
          style={{
            flex: 1,
            alignSelf: 'stretch',
            marginTop: 12,
          }}>
          <View style={styles.rectangleView} />
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 20,
              bottom: 1,
              zIndex: 2,
            }}>
            <View style={styles.daypickerView}>
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
                    height: 36,
                    marginLeft: 14,
                    marginRight: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={styles.daybuttonsuView}>
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
                      <TouchableOpacity
                        onPress={() => this.onDayPressed('Sunday')}
                        style={styles.ovalButton}>
                        {this.props.selectedDay == 'Sunday' ? (
                          <Image
                            source={require('./../../assets/images/DayButtonSU.png')}
                            style={styles.ovalButtonImage}
                          />
                        ) : (
                          <Image
                            source={require('./../../assets/images/UnDayButtonSU.png')}
                            style={styles.ovalButtonImage}
                          />
                        )}
                      </TouchableOpacity>
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
                      }}
                    />
                  </View>
                  <View style={styles.daybuttonmView}>
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
                      <TouchableOpacity
                        onPress={() => this.onDayPressed('Monday')}
                        style={styles.ovalTwoButton}>
                        {this.props.selectedDay == 'Monday' ? (
                          <Image
                            source={require('./../../assets/images/DayButtonM.png')}
                            style={styles.ovalTwoButtonImage}
                          />
                        ) : (
                          <Image
                            source={require('./../../assets/images/UnDayButtonM.png')}
                            style={styles.ovalTwoButtonImage}
                          />
                        )}
                      </TouchableOpacity>
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
                      {/* <Text
												style={styles.mText}>M</Text> */}
                    </View>
                  </View>
                  <View style={styles.daybuttontView}>
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
                      <TouchableOpacity
                        onPress={() => this.onDayPressed('Tuesday')}
                        style={styles.ovalThreeButton}>
                        {this.props.selectedDay == 'Tuesday' ? (
                          <Image
                            source={require('./../../assets/images/DayButtonT.png')}
                            style={styles.ovalThreeButtonImage}
                          />
                        ) : (
                          <Image
                            source={require('./../../assets/images/UnDayButtonT.png')}
                            style={styles.ovalThreeButtonImage}
                          />
                        )}
                      </TouchableOpacity>
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
                      {/* <Text
												style={styles.tText}>T</Text> */}
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}
                  />
                  <View style={styles.daybuttonthView}>
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
                      <TouchableOpacity
                        onPress={() => this.onDayPressed('Thrusday')}
                        style={styles.ovalFiveButton}>
                        {this.props.selectedDay == 'Thrusday' ? (
                          <Image
                            source={require('./../../assets/images/DayButtonTh.png')}
                            style={styles.ovalFiveButtonImage}
                          />
                        ) : (
                          <Image
                            source={require('./../../assets/images/UnDayButtonTh.png')}
                            style={styles.ovalFiveButtonImage}
                          />
                        )}
                      </TouchableOpacity>
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
                      {/* <Text
												style={styles.thText}>Th</Text> */}
                    </View>
                  </View>
                  <View style={styles.daybuttonfView}>
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
                      <TouchableOpacity
                        onPress={() => this.onDayPressed('Friday')}
                        style={styles.ovalSixButton}>
                        {this.props.selectedDay == 'Friday' ? (
                          <Image
                            source={require('./../../assets/images/DayButtonF.png')}
                            style={styles.ovalSixButtonImage}
                          />
                        ) : (
                          <Image
                            source={require('./../../assets/images/UnDayButtonF.png')}
                            style={styles.ovalSixButtonImage}
                          />
                        )}
                      </TouchableOpacity>
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
                      {/* <Text
												style={styles.fText}>F</Text> */}
                    </View>
                  </View>
                  <View style={styles.daybuttonsView}>
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
                      <TouchableOpacity
                        onPress={() => this.onDayPressed('Saturday')}
                        style={styles.ovalSevenButton}>
                        {this.props.selectedDay == 'Saturday' ? (
                          <Image
                            source={require('./../../assets/images/DayButtonS.png')}
                            style={styles.ovalSevenButtonImage}
                          />
                        ) : (
                          <Image
                            source={require('./../../assets/images/UnDayButtonS.png')}
                            style={styles.ovalSevenButtonImage}
                          />
                        )}
                      </TouchableOpacity>
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
                      {/* <Text
												style={styles.sText}>S</Text> */}
                    </View>
                  </View>
                </View>
              </View>
              <View
                pointerEvents="box-none"
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  top: 0,
                  bottom: 0,
                  justifyContent: 'center',
                }}>
                <View style={styles.daybuttonwView}>
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
                    <TouchableOpacity
                      onPress={() => this.onDayPressed('Wednesday')}
                      style={styles.ovalFourButton}>
                      {this.props.selectedDay == 'Wednesday' ? (
                        <Image
                          source={require('./../../assets/images/DayButtonW.png')}
                          style={styles.ovalFourButtonImage}
                        />
                      ) : (
                        <Image
                          source={require('./../../assets/images/UnDayButtonW.png')}
                          style={styles.ovalFourButtonImage}
                        />
                      )}
                    </TouchableOpacity>
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
                    {/* <Text
											style={styles.wText}>W</Text> */}
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.tableviewFlatListViewWrapper}>
              <DraggableFlatList
                style={styles.tableviewFlatList}
                data={this.props.tasks[0][this.props.selectedDay]}
                renderItem={this.renderItem}
                keyExtractor={(item, index) =>
                  `draggable-item-${item.title + index}`
                }
                onDragEnd={({data}) => this.reOrderedList(data)}
                ListEmptyComponent={this.renderItemList()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {tasks, selectedDay} = state.Tasks;
  return {tasks, selectedDay};
};

export default connect(mapStateToProps)(TasksScreen);
