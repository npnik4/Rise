/* eslint-disable react-native/no-inline-styles */
//
//  ResetPassword
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './ResetPasswordStyleSheet';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default class ResetPassword extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      showModel: false,
    };
  }

  componentDidMount() {}

  onResetPressed = async () => {
    const {email} = this.state;
    if (email === '') {
      this.setState({error: 'Please enter email'});
      return;
    }
    auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({showModel: true});
      })
      .catch((error) => this.setError(error.message));
  };

  setError = (error) => {
    console.log(error);
    switch (error) {
      case '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.':
        this.setState({
          error: 'Sorry, but this email does not have an account with us.',
        });
        break;
      case '[auth/invalid-email] The email address is badly formatted.':
        this.setState({error: 'Invalid email.'});
        break;
      default:
        this.setState({error: error});
        break;
    }
  };

  modal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.showModel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Reset link has been sent to your email.
            </Text>

            <View style={{padding: 20}}>
              <Image
                source={require('../../assets/images/Email.png')}
                style={styles.emailImage}
              />
            </View>

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

  closeModal = () => {
    this.setState({showModel: false});
    const navigation = this.context;
    navigation.navigate('LoginScreen');
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.resetpasswordView}>
          <StatusBar barStyle="dark-content" />
          {this.modal()}
          <View style={styles.riselogoImageAnimated}>
            <Image
              source={require('./../../assets/images/RiseLogo4.png')}
              style={styles.riselogoImage}
            />
            {/* <Text style={{...styles.welcomeToRiseText, position: "absolute", alignSelf: "center", top: '20%'}}>Rise</Text> */}
          </View>
          <View
            pointerEvents="box-none"
            style={{
              flex: 1,
              marginTop: 0,
            }}>
            {/* <View
						style={styles.rectangleView}/> */}
            <View
              pointerEvents="box-none"
              style={{
                position: 'absolute',
                left: 14,
                right: 14,
                top: 0,
                bottom: 100,
              }}>
              <View style={styles.viewScrollView}>
                <View
                  pointerEvents="box-none"
                  style={{
                    height: 354,
                    marginTop: 0,
                  }}>
                  <View
                    pointerEvents="box-none"
                    style={{
                      flex: 1,
                    }}>
                    <View style={styles.emailView}>
                      <TextInput
                        returnKeyType="next"
                        clearButtonMode="always"
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType="email-address"
                        value={this.state.email}
                        placeholder="Email Address"
                        textContentType="emailAddress"
                        onChangeText={(text) =>
                          this.setState({email: text, error: ''})
                        }
                        style={styles.emailAddressTextInput}
                      />
                      <Text style={styles.confirmPasswordText}>
                        {this.state.error}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                      }}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.onResetPressed()}
                style={styles.signupButton}>
                <Text style={styles.signupButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
