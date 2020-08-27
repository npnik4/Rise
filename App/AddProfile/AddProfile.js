/* eslint-disable react-native/no-inline-styles */
//
//  Profile
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './AddProfileStyleSheet';
import {
  Animated,
  Easing,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Modal,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {
  setSelectedDays,
  clearDays,
  addProfile,
  setTravelTime,
} from '../actions';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import functions from '@react-native-firebase/functions';
import {API_KEY} from '../Config/Data';
import {verifyTasks} from '../actions/messageHelper';

class AddProfile extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      savebuttonButtonTranslateY: new Animated.Value(-1),
      riselogoImageScale: new Animated.Value(-1),
      riselogoImageOpacity: new Animated.Value(-1),
      showModel: false,
      showModelAndriod: false,
      showAddress: false,
      showDateModel: false,
      openSubModeModal: false,
      spinner: false,
      date: new Date(),
      time: new Date().setUTCHours(9, 0, 0),
      transMode: '',
      subMode: '',
      desAddress: '',
      desPlaceid: '',
      startAddress: '',
      startPlaceid: '',
      selectedField: '',
      profileType: '',
    };
  }

  componentDidMount() {
    if (__DEV__) {
      functions().useFunctionsEmulator('http://localhost:5001');
    }
    this.startAnimationOne();
    this.props.dispatch(clearDays());
  }

  createAlert = (title, body) => {
    Alert.alert(title, body, [{text: 'OK'}], {cancelable: false});
  };

  checkForErrors = (obj, type, selectedDays) => {
    let errors = '';
    let rules;
    switch (type) {
      case 'normal':
        rules = [
          'ArrivalTime',
          'Destination',
          'StartLocation',
          'TransportationMode',
        ];
        break;
      case 'home':
        rules = ['ArrivalTime'];
        break;
      case 'flight':
        rules = [
          'ArrivalDate',
          'ArrivalTime',
          'Destination',
          'StartLocation',
          'TransportationMode',
        ];
        break;
      default:
        break;
    }

    rules.forEach((key) => {
      if (!obj[key]) {
        // create types to get actual missing fields
        errors = errors + key + '\n';
      }
    });
    if (type !== 'flight' && selectedDays.length == 0) {
      errors = errors + 'Day(s)';
    }

    return errors;
  };

  onAddButtonPressed = async () => {
    // start spinner here
    this.setState({spinner: true});
    const time = new Date(this.state.time);
    const desAddress = this.state.desAddress;
    const desPlaceid = this.state.desPlaceid;
    const startAddress = this.state.startAddress;
    const startAddressid = this.state.startPlaceid;
    const selectedDays = this.props.selectedDays;
    const transMode = this.state.transMode;
    const profileType = this.state.profileType;
    const subMode = this.state.subMode;
    const date = new Date(this.state.date);
    let tempObj;
    let errors;

    switch (profileType) {
      case 'normal':
        tempObj = {
          ArrivalTime: time,
          Destination: desAddress,
          StartLocation: startAddress,
          TransportationMode: transMode,
          DestinationID: desPlaceid,
          StartLocationID: startAddressid,
          ProfileType: profileType,
          SubMode: subMode,
        };
        errors = this.checkForErrors(tempObj, profileType, selectedDays);
        break;
      case 'home':
        tempObj = {
          ArrivalTime: time,
          ProfileType: profileType,
        };
        errors = this.checkForErrors(tempObj, profileType, selectedDays);
        break;
      case 'flight':
        tempObj = {
          ArrivalDate: date,
          ArrivalTime: time,
          Destination: desAddress,
          StartLocation: startAddress,
          TransportationMode: transMode,
          DestinationID: desPlaceid,
          StartLocationID: startAddressid,
          ProfileType: profileType,
          SubMode: subMode,
        };
        errors = this.checkForErrors(tempObj, profileType, selectedDays);
        break;
      default:
        tempObj = null;
        break;
    }

    if (!errors) {
      if (profileType === 'normal') {
        // make maps call here
        await this.getTravelTime(tempObj);
        let travelTime = this.props.travelTime;
        console.log(travelTime.value);
        if (travelTime.value) {
          tempObj.TravelTime = Math.ceil(travelTime.value / 60);
          console.log('obj', tempObj);
          this.props.dispatch(addProfile(tempObj));
          this.setState({spinner: false});
          const navigation = this.context;
          navigation.navigate('Profile');
        } else if (travelTime.noRoutes) {
          this.setState({spinner: false});
          this.createAlert(
            'Error',
            'An error occurred calculating travel time, no routes available, change transporation mode',
          );
        } else {
          this.setState({spinner: false});
          this.createAlert(
            'Error',
            'An error occurred calculating travel time, please try again later',
          );
        }
        this.setState({spinner: false});
        this.props.dispatch(setTravelTime({}));
      } else {
        console.log('obj', tempObj);
        this.props.dispatch(addProfile(tempObj));
        this.props.dispatch(verifyTasks());
        this.setState({spinner: false});
        const navigation = this.context;
        navigation.navigate('Profile');
      }
    } else {
      this.setState({spinner: false});
      this.createAlert('Profile incomplete', 'Missing: \n' + errors);
    }
  };

  openModal = () => {
    Platform.OS === 'ios'
      ? this.setState({showModel: true})
      : this.setState({showModelAndriod: true});
  };

  openDateModal = () => {
    this.setState({showDateModel: true});
  };

  openAddressModal = (selected) => {
    this.setState({showAddress: true, selectedField: selected});
  };

  closeAddressModal = () => {
    this.setState({showAddress: false, selectedField: ''});
  };

  setAddress = (address, place_id) => {
    if (this.state.selectedField === 'Destination') {
      this.setState({desAddress: address, desPlaceid: place_id});
    } else if (this.state.selectedField === 'Start') {
      this.setState({startAddress: address, startPlaceid: place_id});
    }
  };

  closeModal = () => {
    this.setState({showModel: false});
  };

  closeDateModal = () => {
    this.setState({showDateModel: false});
  };

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

  formatDate = (date) => {
    if (date) {
      date = new Date(date);
      var month = date.getUTCMonth() + 1;
      var day = date.getUTCDate();
      var year = date.getUTCFullYear();
      var strDate = month + '/' + day + '/' + year;
      return strDate;
    } else {
      return '';
    }
  };

  onChangeTime = (event, selectedDate) => {
    this.setState({time: selectedDate});
  };

  onChangeDate = (event, selectedDate) => {
    this.setState({date: selectedDate});
  };

  modal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.showModel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Time</Text>

            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              value={this.state.time}
              mode={'time'}
              is24Hour={true}
              minuteInterval={5}
              display="spinner"
              style={{width: '100%'}}
              onChange={this.onChangeTime}
            />

            <TouchableOpacity
              style={styles.openButton}
              onPress={() => this.closeModal()}>
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  androidModal = () => {
    return (
      <DateTimePicker
        timeZoneOffsetInMinutes={0}
        value={this.state.time}
        mode={'time'}
        is24Hour={true}
        minuteInterval={5}
        display="spinner"
        style={{width: '100%'}}
        onChange={this.onChangeTime}
      />
    );
  };

  dateModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.showDateModel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Date</Text>

            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              value={this.state.date}
              mode={'date'}
              is24Hour={true}
              minuteInterval={5}
              display="spinner"
              style={{width: '100%'}}
              onChange={this.onChangeDate}
            />

            <TouchableOpacity
              style={styles.openButton}
              onPress={() => this.closeDateModal()}>
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  AddressModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.showAddress}>
        <View style={styles.centeredAddressView}>
          <View style={styles.modalAddressView}>
            <GooglePlacesAutocomplete
              placeholder="Enter Location"
              minLength={5}
              autoFocus={false}
              returnKeyType={'default'}
              fetchDetails={true}
              styles={{
                textInputContainer: {
                  width: '100%',
                  backgroundColor: '#F4F2FF',
                },
                poweredContainer: {
                  backgroundColor: 'transparent',
                },
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              currentLocation={false}
              onPress={(data, details = null) =>
                this.setAddress(details.formatted_address, data.place_id)
              }
              query={{
                // https://developers.google.com/places/web-service/autocomplete
                key: API_KEY,
                language: 'en',
              }}
              debounce={500}
              enablePoweredByContainer={false}
            />

            <TouchableOpacity
              style={styles.openButton}
              onPress={() => this.closeAddressModal()}>
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  subModeModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.openSubModeModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select a transit type</Text>

            <View style={styles.transitView}>
              <TouchableOpacity
                style={styles.transitButton}
                onPress={() => this.closeSubModeModal('BUS')}>
                <Text style={styles.transitText}>BUS</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.transitButton}
                onPress={() => this.closeSubModeModal('RAIL')}>
                <Text style={styles.transitText}>RAIL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.transitButton}
                onPress={() => this.closeSubModeModal('SUBWAY')}>
                <Text style={styles.transitText}>SUBWAY</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.transitButton}
                onPress={() => this.closeSubModeModal('TRAIN')}>
                <Text style={styles.transitText}>TRAIN</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.transitButton}
                onPress={() => this.closeSubModeModal('TRAM')}>
                <Text style={styles.transitText}>TRAM</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...styles.transitButton,
                  borderColor: '#6E7982',
                  borderWidth: 3,
                }}
                onPress={() => this.closeSubModeModal('MIX')}>
                <Text style={styles.transitText}>MIX</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  closeSubModeModal = (mode) => {
    // console.log(mode)
    this.setState({openSubModeModal: false, subMode: mode});
  };

  onDayPressed = (day) => {
    this.props.dispatch(setSelectedDays(day));
  };

  isDayDisabled = (day) => {
    return this.props.disabledDays.includes(day);
  };

  transModePressed = (mode) => {
    this.setState({transMode: mode});
    if (mode === 'train') {
      this.setState({openSubModeModal: true});
    }
  };

  startAnimationOne() {
    // Set animation initial values to all animated properties
    this.state.savebuttonButtonTranslateY.setValue(0);
    // Set animation initial values to all animated properties
    this.state.riselogoImageScale.setValue(0);
    this.state.riselogoImageOpacity.setValue(0);

    // Configure animation and trigger
    Animated.parallel([
      Animated.parallel([
        Animated.timing(this.state.riselogoImageScale, {
          duration: 1000,
          easing: Easing.bezier(0.22, 0.61, 0.36, 1),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.riselogoImageOpacity, {
          duration: 1000,
          easing: Easing.bezier(0.22, 0.61, 0.36, 1),
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
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
    ]).start();
  }

  dayPicker = () => {
    return (
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
                  {!this.isDayDisabled('Sunday') ? (
                    this.props.selectedDays.includes('Sunday') ? (
                      <Image
                        source={require('./../../assets/images/DayButtonSU.png')}
                        style={styles.ovalButtonImage}
                      />
                    ) : (
                      <Image
                        source={require('./../../assets/images/UnDayButtonSU.png')}
                        style={styles.ovalButtonImage}
                      />
                    )
                  ) : (
                    <Text />
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
                  {!this.isDayDisabled('Monday') ? (
                    this.props.selectedDays.includes('Monday') ? (
                      <Image
                        source={require('./../../assets/images/DayButtonM.png')}
                        style={styles.ovalTwoButtonImage}
                      />
                    ) : (
                      <Image
                        source={require('./../../assets/images/UnDayButtonM.png')}
                        style={styles.ovalTwoButtonImage}
                      />
                    )
                  ) : (
                    <Text />
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
                  {!this.isDayDisabled('Tuesday') ? (
                    this.props.selectedDays.includes('Tuesday') ? (
                      <Image
                        source={require('./../../assets/images/DayButtonT.png')}
                        style={styles.ovalThreeButtonImage}
                      />
                    ) : (
                      <Image
                        source={require('./../../assets/images/UnDayButtonT.png')}
                        style={styles.ovalThreeButtonImage}
                      />
                    )
                  ) : (
                    <Text />
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
                  {!this.isDayDisabled('Thrusday') ? (
                    this.props.selectedDays.includes('Thrusday') ? (
                      <Image
                        source={require('./../../assets/images/DayButtonTh.png')}
                        style={styles.ovalFiveButtonImage}
                      />
                    ) : (
                      <Image
                        source={require('./../../assets/images/UnDayButtonTh.png')}
                        style={styles.ovalFiveButtonImage}
                      />
                    )
                  ) : (
                    <Text />
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
                  {!this.isDayDisabled('Friday') ? (
                    this.props.selectedDays.includes('Friday') ? (
                      <Image
                        source={require('./../../assets/images/DayButtonF.png')}
                        style={styles.ovalSixButtonImage}
                      />
                    ) : (
                      <Image
                        source={require('./../../assets/images/UnDayButtonF.png')}
                        style={styles.ovalSixButtonImage}
                      />
                    )
                  ) : (
                    <Text />
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
                  {!this.isDayDisabled('Saturday') ? (
                    this.props.selectedDays.includes('Saturday') ? (
                      <Image
                        source={require('./../../assets/images/DayButtonS.png')}
                        style={styles.ovalSevenButtonImage}
                      />
                    ) : (
                      <Image
                        source={require('./../../assets/images/UnDayButtonS.png')}
                        style={styles.ovalSevenButtonImage}
                      />
                    )
                  ) : (
                    <Text />
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
                {!this.isDayDisabled('Wednesday') ? (
                  this.props.selectedDays.includes('Wednesday') ? (
                    <Image
                      source={require('./../../assets/images/DayButtonW.png')}
                      style={styles.ovalFourButtonImage}
                    />
                  ) : (
                    <Image
                      source={require('./../../assets/images/UnDayButtonW.png')}
                      style={styles.ovalFourButtonImage}
                    />
                  )
                ) : (
                  <Text />
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
    );
  };

  timePicker = (title) => {
    return (
      <View style={styles.timepickerView}>
        {this.state.showModelAndriod ? this.androidModal() : null}
        <Text style={styles.arrivalTimeText}>{title}</Text>
        <TouchableOpacity onPress={() => this.openModal()}>
          <TextInput
            onTouchStart={() => this.openModal()}
            editable={false}
            placeholder="9:00 A.M."
            value={this.formatTime(this.state.time)}
            style={styles.textInputTextInput}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}
        />
        <View style={styles.lineView} />
      </View>
    );
  };

  datePicker = (title) => {
    return (
      <View style={styles.datepickerView}>
        <Text style={styles.arrivalTimeText}>{title}</Text>
        <TouchableOpacity onPress={() => this.openDateModal()}>
          <TextInput
            onTouchStart={() => this.openDateModal()}
            editable={false}
            placeholder="mm/dd/yyyy"
            value={this.formatDate(this.state.date)}
            style={styles.textInputTextInput}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}
        />
        <View style={styles.lineView} />
      </View>
    );
  };

  transModePicker = () => {
    return (
      <View style={styles.transmodeView}>
        <Text style={styles.transportionModeText}>Transportation mode</Text>
        <View
          pointerEvents="box-none"
          style={{
            height: 50,
            marginTop: 11,
          }}>
          <View style={styles.rectangleFourView} />
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 13,
              right: 14,
              top: 2,
              height: 45,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity
              onPress={() => this.transModePressed('car')}
              style={styles.carButton}>
              {this.state.transMode === 'car' ? (
                <Image
                  source={require('./../../assets/images/CarActive.png')}
                  style={styles.carButtonImage}
                />
              ) : (
                <Image
                  source={require('./../../assets/images/Car.png')}
                  style={styles.carButtonImage}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.transModePressed('train')}
              style={styles.trainButton}>
              {this.state.transMode === 'train' ? (
                <Image
                  source={require('./../../assets/images/TrainActive.png')}
                  style={styles.carButtonImage}
                />
              ) : (
                <Image
                  source={require('./../../assets/images/Train.png')}
                  style={styles.carButtonImage}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
              }}
            />
            <TouchableOpacity
              onPress={() => this.transModePressed('biking')}
              style={styles.bikingButton}>
              {this.state.transMode === 'biking' ? (
                <Image
                  source={require('./../../assets/images/BikingActive.png')}
                  style={styles.carButtonImage}
                />
              ) : (
                <Image
                  source={require('./../../assets/images/Biking.png')}
                  style={styles.carButtonImage}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.transModePressed('walking')}
              style={styles.walkingButton}>
              {this.state.transMode === 'walking' ? (
                <Image
                  source={require('./../../assets/images/WalkingActive.png')}
                  style={styles.carButtonImage}
                />
              ) : (
                <Image
                  source={require('./../../assets/images/Walking.png')}
                  style={styles.carButtonImage}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  addressPicker = (address1, address2) => {
    return (
      <>
        <View style={styles.destinationView}>
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 0,
              right: 3,
              top: 0,
              bottom: 4,
            }}>
            <Text style={styles.startLocationText}>{address1}</Text>
            <TouchableOpacity onPress={() => this.openAddressModal('Start')}>
              <TextInput
                onTouchStart={() => this.openAddressModal('Start')}
                editable={false}
                placeholder="Enter Address"
                value={this.state.startAddress}
                style={styles.addressTwoTextInput}
                textContentType="fullStreetAddress"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.currentlocationView}>
          <Text style={styles.destinationText}>{address2}</Text>
          <View
            style={{
              flex: 1,
            }}
          />
          <TouchableOpacity
            onPress={() => this.openAddressModal('Destination')}>
            <TextInput
              onTouchStart={() => this.openAddressModal('Destination')}
              editable={false}
              placeholder="Enter Address"
              value={this.state.desAddress}
              style={styles.addressTextInput}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  infoCard = (timeTitle, address1, address2) => {
    return (
      <View style={styles.infocardView}>
        {this.timePicker(timeTitle)}
        {this.addressPicker(address1, address2)}
        {this.transModePicker()}
      </View>
    );
  };

  addButton = () => {
    return (
      <>
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
                  translateY: this.state.savebuttonButtonTranslateY.interpolate(
                    {
                      inputRange: [-1, 0, 1],
                      outputRange: [0.01, 70, 0],
                    },
                  ),
                },
              ],
            },
            styles.savebuttonButtonAnimated,
          ]}>
          <TouchableOpacity
            onPress={() => this.onAddButtonPressed()}
            style={styles.savebuttonButton}>
            <Text style={styles.savebuttonButtonText}>Add</Text>
          </TouchableOpacity>
        </Animated.View>
      </>
    );
  };

  normal = () => {
    return (
      <>
        {this.dayPicker()}
        {this.infoCard(
          'Destination Arrival Time',
          'Start Location',
          'Destination',
        )}
        {this.addButton()}
      </>
    );
  };

  home = () => {
    return (
      <>
        {this.dayPicker()}
        <View style={styles.infocardView}>{this.timePicker('Start Time')}</View>
        {this.addButton()}
      </>
    );
  };

  flight = () => {
    return (
      <>
        {this.datePicker('Flight Date')}
        {this.infoCard('Flight Time', 'Start Location', 'Airport Location')}
        {this.addButton()}
      </>
    );
  };

  selectProfileType = () => {
    return (
      <>
        <Text style={{...styles.transportionModeText, fontWeight: '500'}}>
          Select a Profile Type
        </Text>
        <Animated.View
          style={[
            {
              opacity: this.state.riselogoImageOpacity.interpolate({
                inputRange: [-1, 0, 0.6, 1],
                outputRange: [1, 0, 1, 1],
              }),
              transform: [
                {
                  scale: this.state.riselogoImageScale.interpolate({
                    inputRange: [-1, 0, 0.2, 0.4, 0.6, 0.8, 1],
                    outputRange: [1, 0.3, 1.1, 0.9, 1.03, 0.97, 1],
                  }),
                },
              ],
            },
          ]}>
          <View style={styles.profilePickerContainer}>
            <TouchableOpacity
              onPress={() => this.setState({profileType: 'normal'})}>
              <View style={{flex: 0.33}}>
                <Image source={require('../../assets/images/Normal.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({profileType: 'home'})}>
              <View style={{flex: 0.33}}>
                <Image source={require('../../assets/images/Home.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({profileType: 'flight'})}>
              <View style={{flex: 0.33}}>
                <Image source={require('../../assets/images/flight.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </>
    );
  };

  spinner = () => {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  getTravelTime = (obj) => {
    return new Promise((resolve) => {
      let params = createMapsParams(obj);
      let tTime = null;
      const travelTime = functions().httpsCallable('travelTime');
      travelTime({params: params})
        .then((response) => {
          tTime = extractDuration(response.data.data.routes);
          this.props.dispatch(setTravelTime(tTime));
          resolve();
        })
        .catch((e) => {
          console.log(e, 'error with call');
          this.props.dispatch(setTravelTime({noRoutes: true, value: 0}));
          resolve();
        });
    });
  };

  render() {
    return (
      <View style={styles.profileView}>
        <StatusBar barStyle="dark-content" />
        {this.modal()}
        {this.AddressModal()}
        {this.dateModal()}
        {this.subModeModal()}
        {this.state.spinner ? this.spinner() : null}
        <View
          pointerEvents="box-none"
          style={{
            flex: 1,
            marginTop: 15,
          }}>
          <View style={styles.rectangleView} />
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 21,
              right: 21,
              top: 15,
              bottom: this.state.profileType === '' ? 40 : 25,
              alignItems: 'center',
              elevation: 5,
            }}>
            {this.state.profileType === '' ? this.selectProfileType() : null}
            {this.state.profileType === 'normal' ? this.normal() : null}
            {this.state.profileType === 'home' ? this.home() : null}
            {this.state.profileType === 'flight' ? this.flight() : null}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {selectedDays, disabledDays, transMode, travelTime} = state.profile;
  return {
    selectedDays,
    disabledDays,
    transMode,
    travelTime,
  };
};

export default connect(mapStateToProps)(AddProfile);

export function createMapsParams(obj) {
  let params = '';
  let time = createTimeObj(obj.ArrivalTime);
  console.log(time);
  time = Math.ceil(time / 1000);
  console.log(time);
  params =
    params +
    '?origin=place_id:' +
    obj.StartLocationID +
    '&destination=place_id:' +
    obj.DestinationID;
  if (obj.TransportationMode === 'car') {
    params = params + '&mode=driving&departure_time=' + time;
  }
  if (obj.TransportationMode === 'biking') {
    params = params + '&mode=bicycling&departure_time=' + time;
  }
  if (obj.TransportationMode === 'walking') {
    params = params + '&mode=walking&departure_time=' + time;
  }
  if (obj.TransportationMode === 'train') {
    if (obj.SubMode === 'MIX') {
      params = params + '&mode=transit&arrival_time=' + time;
    } else {
      params =
        params +
        '&mode=transit&transit_mode=' +
        obj.SubMode.toLowerCase() +
        '&arrival_time=' +
        time;
    }
  }
  if (obj.SubMode !== 'MIX') {
    params = params + '&traffic_model=pessimistic';
  }
  console.log(params);
  return params;
}

export function createTimeObj(time) {
  time = new Date(time);
  let newTime = getDate();
  newTime.setUTCHours(time.getUTCHours());
  newTime.setUTCMinutes(time.getUTCMinutes());
  console.log('date', newTime);
  return newTime.getTime();
}

export function getDate() {
  let newTime = new Date();
  if (newTime.getDay() == 0 || newTime.getDay() == 6) {
    newTime = newTime.getTime() + 48 * 60 * 60 * 1000; // dont want weekend
    newTime = new Date(newTime); // sat || sunday plus 48 hours
  } else if (newTime.getDay() == 5) {
    newTime = newTime.getTime() + 72 * 60 * 60 * 1000; // dont want weekend
    newTime = new Date(newTime); // friday plus 72 hours
  } else {
    newTime = newTime.getTime() + 24 * 60 * 60 * 1000; // dont want weekend
    newTime = new Date(newTime); // day plus 24 hours
  }
  return newTime;
}

export function extractDuration(data) {
  let duration;
  console.log(data[0].legs);
  if (data[0]) {
    // data is the routes objects
    if (data[0].legs[0].duration_in_traffic) {
      duration = data[0].legs[0].duration_in_traffic;
    } else if (data[0].legs[0].duration) {
      duration = data[0].legs[0].duration;
    }
  } else {
    return {noRoutes: true, value: 0};
  }
  return duration;
}
