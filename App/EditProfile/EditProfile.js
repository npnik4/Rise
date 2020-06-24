/* eslint-disable react-native/no-inline-styles */
//
//  Profile
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './EditProfileStyleSheet';
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
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {
  setSelectedDays,
  setTransMode,
  clearDays,
  editProfile,
  deleteProfile,
  setTravelTime,
} from '../actions';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {API_KEY} from '../Config/Data';
import functions from '@react-native-firebase/functions';
import {verifyTasks} from '../actions/messageHelper';
import {
  createMapsParams,
  createTimeObj,
  getDate,
  extractDuration,
} from '../AddProfile/AddProfile';

class EditProfile extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      savebuttonButtonTranslateY: new Animated.Value(-1),
      showModel: false,
      showAddress: false,
      showDateModel: false,
      openSubModeModal: false,
      spinner: false,
      date: this.props.profile.ArrivalDate,
      time: this.props.profile.ArrivalTime,
      desAddress: this.props.profile.Destination,
      desPlaceid: this.props.profile.DestinationID,
      startAddress: this.props.profile.StartLocation,
      startPlaceid: this.props.profile.StartLocationID,
      transMode: this.props.profile.TransportationMode,
      subMode: this.props.profile.SubMode,
      profileType: this.props.profile.ProfileType,
      selectedDays: Object.assign([], this.props.profile.SelectedDays),
      selectedField: '',
      originalDays: Object.assign([], this.props.profile.SelectedDays),
      enableSave: false,
    };
  }

  componentDidMount() {
    if (__DEV__) {
      functions().useFunctionsEmulator('http://localhost:5001');
    }
    this.startAnimationOne();
    this.props.dispatch(clearDays());
  }

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

  onSaveButtonPressed = async () => {
    this.setState({spinner: true});
    const time = new Date(this.state.time);
    const desAddress = this.state.desAddress;
    const desPlaceid = this.state.desPlaceid;
    const startAddress = this.state.startAddress;
    const startAddressid = this.state.startPlaceid;
    const selectedDays = this.state.selectedDays;
    const subMode = this.state.subMode;
    const transMode = this.state.transMode;
    const originalDays = this.state.originalDays;
    const profileType = this.state.profileType;
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

    let combinedObj = {
      profile: tempObj,
      selectedDays: selectedDays,
      originalDays: originalDays,
    };

    if (!errors) {
      if (profileType === 'normal') {
        // make maps call here
        await this.getTravelTime(combinedObj.profile);
        let travelTime = this.props.travelTime;
        console.log(travelTime.value);
        if (travelTime && travelTime.value) {
          combinedObj.profile.TravelTime = Math.ceil(travelTime.value / 60);
          console.log('obj', combinedObj.profile);
          this.props.dispatch(editProfile(combinedObj));
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
        this.props.dispatch(editProfile(combinedObj));
        const navigation = this.context;
        navigation.navigate('Profile');
      }
    } else {
      this.createAlert('Profile incomplete', 'Missing: \n' + errors);
    }
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

  openModal = () => {
    this.setState({showModel: true});
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

  closeDateModal = () => {
    this.setState({showDateModel: false});
  };

  setAddress = (address, place_id) => {
    if (this.state.selectedField === 'Destination') {
      this.setState({desAddress: address, desPlaceid: place_id});
    } else if (this.state.selectedField === 'Start') {
      this.setState({
        startAddress: address,
        startPlaceid: place_id,
        enableSave: true,
      });
    }
  };

  closeModal = () => {
    this.setState({showModel: false});
  };

  onDeleteButtonPressedConfirm = () => {
    Alert.alert(
      'Are you sure you want to delete?',
      '',
      [
        {
          text: 'NO',
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => this.onDeleteButtonPressed(),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  onDeleteButtonPressed = () => {
    const originalDays = this.state.originalDays;
    this.props.dispatch(deleteProfile(originalDays));
    this.props.dispatch(verifyTasks());
    const navigation = this.context;
    navigation.navigate('Profile');
  };

  formatTime = (date) => {
    if (date) {
      date = new Date(date);
      // console.log('date', date);
      var hours = date.getUTCHours();
      var minutes = date.getUTCMinutes();
      // console.log('date', date, 'hours', hours, 'mins', minutes);
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
    this.setState({time: selectedDate, enableSave: true});
  };

  modal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle={'overFullScreen'}
        visible={this.state.showModel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Time</Text>

            <DateTimePicker
              // testID="dateTimePicker"
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

  AddressModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle={'overFullScreen'}
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

  createAlert = (title, body) => {
    Alert.alert(title, body, [{text: 'OK'}], {cancelable: false});
  };

  onDayPressed = (day) => {
    // this.props.dispatch(setSelectedDays(day));
    let allDaysSelected = this.state.selectedDays;
    if (allDaysSelected.includes(day)) {
      if (allDaysSelected.length === 1) {
        this.createAlert(
          'Cannot Remove Day',
          'Must have atleast one day selected, try delete if you want to remove all days',
        );
      } else {
        const i = allDaysSelected.indexOf(day);
        allDaysSelected.splice(i, 1);
      }
    } else {
      allDaysSelected.push(day);
    }
    this.setState({selectedDays: allDaysSelected, enableSave: true});
  };

  isDayDisabled = (day) => {
    if (this.state.originalDays.includes(day)) {
      return false;
    } else if (this.props.disabledDays.includes(day)) {
      return true;
    } else {
      return false;
    }
  };

  transModePressed = (mode) => {
    this.setState({transMode: mode, enableSave: true});
    if (mode === 'train') {
      this.setState({openSubModeModal: true});
    }
  };

  startAnimationOne() {
    // Set animation initial values to all animated properties
    this.state.savebuttonButtonTranslateY.setValue(0);

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
                    this.state.selectedDays.includes('Sunday') ? (
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
                    this.state.selectedDays.includes('Monday') ? (
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
                    this.state.selectedDays.includes('Tuesday') ? (
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
                    this.state.selectedDays.includes('Thrusday') ? (
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
                    this.state.selectedDays.includes('Friday') ? (
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
                    this.state.selectedDays.includes('Saturday') ? (
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
                  this.state.selectedDays.includes('Wednesday') ? (
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

  infoCard = (timeTitle, address1, address2) => {
    return (
      <View style={styles.infocardView}>
        {this.timePicker(timeTitle)}
        {this.addressPicker(address1, address2)}
        {this.transModePicker()}
      </View>
    );
  };

  timePicker = (title) => {
    return (
      <View style={styles.timepickerView}>
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

  onChangeDate = (event, selectedDate) => {
    this.setState({date: selectedDate, enableSave: true});
  };

  dateModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle={'overFullScreen'}
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
              style={{...styles.openButton, backgroundColor: '#FC6681'}}
              onPress={() => this.closeDateModal()}>
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
      </>
    );
  };

  home = () => {
    return (
      <>
        {this.dayPicker()}
        <View style={styles.infocardView}>{this.timePicker('Start Time')}</View>
      </>
    );
  };

  flight = () => {
    return (
      <>
        {this.datePicker('Flight Date')}
        {this.infoCard('Flight Time', 'Start Location', 'Airport Location')}
      </>
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

  spinner = () => {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  saveButton = () => {
    return (
      <View style={styles.savebuttonButtonAnimated}>
        <TouchableOpacity
          onPress={() => this.onSaveButtonPressed()}
          style={styles.savebuttonButton}>
          <Text style={styles.savebuttonButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
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
            marginTop: 20,
          }}>
          <View style={styles.rectangleView} />
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 15,
              right: 15,
              top: 15,
              bottom: this.state.profileType === '' ? 40 : 25,
              alignItems: 'center',
            }}>
            {this.state.profileType === 'normal' ? this.normal() : null}
            {this.state.profileType === 'home' ? this.home() : null}
            {this.state.profileType === 'flight' ? this.flight() : null}

            <View
              style={{
                flex: 1,
                marginBottom: 25,
              }}
            />
            <View
              style={{
                // flex: 1,
                margin: 15,
                width: 100,
                height: 35,
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => this.onDeleteButtonPressedConfirm()}
                style={styles.deletebuttonButton}>
                <Text style={styles.deletebuttonButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>

            {this.state.enableSave ? this.saveButton() : null}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {profiles, selectedProfile, disabledDays, travelTime} = state.profile;
  let profile = profiles[selectedProfile];
  return {
    profile,
    disabledDays,
    travelTime,
  };
};

export default connect(mapStateToProps)(EditProfile);
