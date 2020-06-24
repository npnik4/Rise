/* eslint-disable react-native/no-inline-styles */
//
//  Task
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './TaskStyleSheet';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {setSelectedProfile} from '../actions';
import {connect} from 'react-redux';

class Task extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onTaskPress = (id) => {
    this.props.dispatch(setSelectedProfile(id));
    const navigation = this.context;
    navigation.navigate('EditProfile');
  };

  getDays = () => {
    let abrev = '';
    this.props.item.SelectedDays.forEach((day) => {
      switch (day) {
        case 'Monday':
          abrev += ' M';
          break;
        case 'Tuesday':
          abrev += ' T';
          break;
        case 'Wednesday':
          abrev += ' W';
          break;
        case 'Thrusday':
          abrev += ' Th';
          break;
        case 'Friday':
          abrev += ' F';
          break;
        case 'Saturday':
          abrev += ' S';
          break;
        case 'Sunday':
          abrev += ' Su';
          break;
      }
    });
    return abrev;
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

  showHeader = () => {
    switch (this.props.profileType) {
      case 'normal':
      case 'home':
        return this.formatTime(this.props.item.ArrivalTime);
      case 'flight':
        return this.formatDate(this.props.item.ArrivalDate);
      default:
        return;
    }
  };

  showFooter = () => {
    switch (this.props.profileType) {
      case 'normal':
        return 'Commute: ' + this.getDays();
      case 'home':
        return 'Home: ' + this.getDays();
      case 'flight':
        return 'Flight: ' + this.formatTime(this.props.item.ArrivalTime);
      default:
        return;
    }
  };

  render() {
    return (
      <View style={styles.group}>
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
          <View style={styles.group7View}>
            <Text style={styles.bathroomText}>{this.showHeader()}</Text>
            <Text style={styles.minsText}>{this.showFooter()}</Text>
            <Image
              style={styles.cardImage}
              source={require('./../../assets/images/ProfileCard.png')}
            />
          </View>
        </View>
        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => this.onTaskPress(this.props.index)}>
            <View style={styles.minusButton}>
              <Image
                source={require('./../../assets/images/MinusBlack.png')}
                style={styles.minusButtonImage}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect()(Task);
