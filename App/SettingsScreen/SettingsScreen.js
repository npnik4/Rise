/* eslint-disable react-native/no-inline-styles */
//
//  SettingsScreen
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './SettingsScreenStyleSheet';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Modal,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {connect} from 'react-redux';
import {signOut} from '../actions/login';
// import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {PURGE} from 'redux-persist';

class SettingsScreen extends React.Component {
  state = {
    modalVisible: false,
  };
  static contextType = NavigationContext;

  onCombinedShapePressed = () => {
    const navigation = this.context;
    navigation.navigate('AdFree');
  };

  onOption1Pressed = () => {
    const navigation = this.context;
    navigation.navigate('Sounds');
  };

  onOption4Pressed = () => {
    const navigation = this.context;
    navigation.navigate('BlankScreen');
  };

  onNoButtonPressed = () => {
    this.setState({modalVisible: false});
  };

  onYesButtonPressed = async () => {
    this.setState({modalVisible: false});
    this.props.dispatch({
      type: PURGE,
      key: 'root',
      result: () => null,
    });
    console.log('Factory reset performed.');
    auth()
      .signOut()
      .then(() => this.props.dispatch(signOut()))
      .catch((error) => this.props.dispatch(signOut()));
  };

  onOption3Pressed = () => {
    this.setState({modalVisible: true});
  };

  render() {
    return (
      <View style={styles.settingsscreenView}>
        <StatusBar barStyle="dark-content" />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={styles.logoutmodalView}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.modalView}>
              <Text style={styles.areYouSureYouWanText}>
                Are you sure you want to logout?
              </Text>
              <View
                pointerEvents="box-none"
                style={{
                  flex: 1,
                  marginRight: 1,
                  marginTop: 37,
                }}>
                <View style={styles.buttonscontainerView} />
                <View
                  pointerEvents="box-none"
                  style={{
                    position: 'absolute',
                    left: 90,
                    right: 89,
                    bottom: 90,
                    height: 116,
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={this.onYesButtonPressed}
                    style={styles.yesbuttonButton}>
                    <Text style={styles.yesbuttonButtonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.onNoButtonPressed}
                    style={styles.nobuttonButton}>
                    <Text style={styles.nobuttonButtonText}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <View
          pointerEvents="box-none"
          style={{
            flex: 1,
            marginTop: 26,
          }}>
          <View style={styles.rectangleView} />
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 30,
              bottom: 15,
            }}>
            {/* <TouchableOpacity
              onPress={this.onOption1Pressed}
              style={styles.option1Button}>
              <Text style={styles.option1ButtonText}>Sounds</Text>
              <Image
                source={require('./../../assets/images/path.png')}
                style={styles.option1ButtonImage}
              />
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={this.onOption4Pressed}
              style={styles.option4Button}>
              <Text style={styles.option4ButtonText}>General</Text>
              <Image
                source={require('./../../assets/images/path.png')}
                style={styles.option4ButtonImage}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => this.onOption3Pressed()}
              style={styles.option3Button}>
              <Text style={styles.option3ButtonText}>Logout</Text>
              <Image
                source={require('./../../assets/images/path.png')}
                style={styles.option3ButtonImage}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
              }}
            />
            {/* <View style={styles.adfreebuttonView}>
              <TouchableOpacity onPress={() => this.onCombinedShapePressed()}>
                <Image
                  source={require('../../assets/images/AdFreeButton.png')}
                  style={{resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </View>
    );
  }
}

export default connect()(SettingsScreen);
