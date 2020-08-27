/* eslint-disable react-native/no-inline-styles */
//
//  SignUpScreen
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './SignUpScreenStyleSheet';
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
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {isNewUser} from '../actions/login';

class SignUpScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      signupButtonTranslateY: new Animated.Value(-1),
      riselogoImageScale: new Animated.Value(-1),
      riselogoImageOpacity: new Animated.Value(-1),
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      emailError: '',
    };
  }

  componentDidMount() {
    this.startAnimationOne();
  }

  checkPassword = () => {
    const {password, confirmPassword} = this.state;
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        if (password.length >= 5) {
          return true;
        }
        this.setState({error: 'Minimum password length is 5'});
        return 'error';
      }
    } else if (!password) {
      this.setState({error: 'Enter Password'});
      return 'error';
    } else if (!confirmPassword) {
      this.setState({error: 'Confirm Password'});
      return 'error';
    } else {
      return false;
    }
  };

  onSignUpPressed = () => {
    // change to call sign up after info
    if (this.state.email === '') {
      this.setState({emailError: 'Please enter email.'});
      return;
    }
    if (this.checkPassword()) {
      //   const navigation = this.context;
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => this.props.dispatch(isNewUser(true)))
        .catch((error) => this.setError(error.message));
    } else if (this.checkPassword() === 'error') {
      return;
    } else {
      this.setState({error: 'Password does not match.'});
    }
  };

  setError = (error) => {
    console.log(error);
    switch (error) {
      case '[auth/weak-password] The given password is invalid.':
        this.setState({error: 'Please enter password'});
        break;
      case '[auth/invalid-email] The email address is badly formatted.':
        this.setState({error: 'Invalid email please try again'});
        break;
      default:
        this.setState({error: error});
        break;
    }
  };

  startAnimationOne() {
    // Set animation initial values to all animated properties
    this.state.riselogoImageScale.setValue(0);
    this.state.riselogoImageOpacity.setValue(0);
    this.state.signupButtonTranslateY.setValue(0);

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
      Animated.parallel([
        Animated.timing(this.state.signupButtonTranslateY, {
          duration: 700,
          delay: 300,
          easing: Easing.bezier(0, 0, 1, 1),
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }

  render() {
    // let {errors = {}, secureTextEntry, ...data} = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.signupscreenView}>
          <StatusBar barStyle="dark-content" />
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
              styles.riselogoImageAnimated,
            ]}>
            <Image
              source={require('./../../assets/images/RiseLogo4.png')}
              style={styles.riselogoImage}
            />
          </Animated.View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              marginTop: 10,
            }}>
            <View style={styles.emailView}>
              <Text style={styles.emailAddressText}>Email Address</Text>
              <TextInput
                clearButtonMode="always"
                autoCorrect={false}
                returnKeyType="done"
                autoCapitalize={'none'}
                placeholder="Email Address"
                textContentType="emailAddress"
                onChangeText={(text) =>
                  this.setState({email: text, emailError: ''})
                }
                style={styles.emailAddressTextInput}
              />
            </View>
            <View style={styles.confirmpasswordView}>
              <Text style={styles.emailAddressText}>Password</Text>
              <TextInput
                autoCorrect={false}
                placeholder="Password"
                returnKeyType="done"
                autoCapitalize={'none'}
                textContentType="password"
                onChangeText={(text) => this.setState({password: text})}
                secureTextEntry={true}
                style={styles.passwordTextInput}
              />
              <Text style={{...styles.emailAddressText, marginTop: 10}}>
                Confirm Password
              </Text>
              <TextInput
                autoCorrect={false}
                placeholder="Confirm Password"
                secureTextEntry={true}
                returnKeyType="done"
                textContentType="password"
                autoCapitalize={'none'}
                onChangeText={(text) => this.setState({confirmPassword: text})}
                style={styles.pTextInput}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{...styles.emailAddressText, fontSize: 16, color: 'red'}}>
              {this.state.emailError}
            </Text>
            <Text
              style={{...styles.emailAddressText, fontSize: 16, color: 'red'}}>
              {' '}
              {this.state.error}{' '}
            </Text>
          </View>

          <Animated.View
            style={[
              {
                transform: [
                  {
                    translateY: this.state.signupButtonTranslateY.interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: [0.01, 100, 0],
                    }),
                  },
                ],
              },
              styles.signupButtonAnimated,
            ]}>
            <TouchableOpacity
              onPress={() => this.onSignUpPressed()}
              style={styles.signupButton}>
              <Text style={styles.signupButtonText}>Sign Up Now</Text>
            </TouchableOpacity>
          </Animated.View>
          {/* <View
					style={{
						flex: 1,
					}}/> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect()(SignUpScreen);
