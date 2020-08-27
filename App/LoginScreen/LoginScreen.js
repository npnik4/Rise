/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
//
//  LoginScreen
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './LoginScreenStyleSheet';
import {
  Animated,
  Easing,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
// import {AuthContext} from '../Config/Utils';
import {fireSignIn, isNewUser} from '../actions/login';
import {connect} from 'react-redux';
// import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

class LoginScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      googlebuttonButtonTranslateY: new Animated.Value(-1),
      loginbuttonButtonTranslateY: new Animated.Value(-1),
      dontHaveAnAccountButtonTranslateY: new Animated.Value(-1),
      riselogoImageScale: new Animated.Value(-1),
      riselogoImageOpacity: new Animated.Value(-1),
      email: '',
      password: '',
      error: '',
      spinner: false,
    };
  }

  onGoogleButtonPressed = async () => {
    this.setState({spinner: true});
    // const { idToken } = await GoogleSignin.signIn();
    GoogleSignin.signIn()
      .then((res) => {
        const {idToken} = res;
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        auth()
          .signInWithCredential(googleCredential)
          .then((res) => {
            if (res) {
              this.props.dispatch(isNewUser(res.additionalUserInfo.isNewUser));
            }
            this.setState({spinner: false});
          })
          .catch((error) => this.setError(error.message));
      })
      .catch((e) => this.setState({spinner: false}));

    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // auth().signInWithCredential(googleCredential).then((res) => {
    // 	if (res) this.props.dispatch(isNewUser(res.additionalUserInfo.isNewUser));
    // 	this.setState({spinner: false});
    // }).catch(error => this.setError(error.message));
  };

  onForgotPasswordPressed = () => {
    const navigation = this.context;
    navigation.navigate('ResetPassword');
  };

  onLoginButtonPressed = async () => {
    const {email, password} = this.state;
    if (email === '') {
      this.setState({error: 'Please enter email'});
      return;
    }
    if (password === '') {
      this.setState({error: 'Please enter password'});
      return;
    }
    this.setState({spinner: true});
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        // console.log(res.user.uid)
        if (res) {
          this.onLogin(res.user.uid);
        }
        this.setState({spinner: false});
      })
      .catch((error) => this.setError(error.message));
  };

  setError = (error) => {
    console.log(error);
    this.setState({spinner: false});
    switch (error) {
      case '[auth/wrong-password] The password is invalid or the user does not have a password.':
        this.setState({error: 'The email or password is invalid'});
        break;
      case '[auth/invalid-email] The email address is badly formatted.':
        this.setState({error: 'Invalid email or password'});
        break;
      default:
        this.setState({error: error});
        break;
    }
  };

  onLogin = async (uid) => {
    this.props.dispatch(fireSignIn(uid));
  };

  onDontHaveAnAccountPressed = () => {
    const navigation = this.context;
    navigation.navigate('SignUpScreen');
  };

  startAnimationOne = () => {
    // Set animation initial values to all animated properties
    this.state.riselogoImageScale.setValue(0);
    this.state.riselogoImageOpacity.setValue(0);
    this.state.googlebuttonButtonTranslateY.setValue(0);
    this.state.loginbuttonButtonTranslateY.setValue(0);
    this.state.dontHaveAnAccountButtonTranslateY.setValue(0);

    // Configure animation and trigger
    Animated.parallel([
      Animated.parallel([
        // eslint-disable-next-line no-undef
        Animated.timing(riselogoImageScale, {
          duration: 1000,
          easing: Easing.bezier(0.22, 0.61, 0.36, 1),
          toValue: 1,
          useNativeDriver: true, // Add This line
        }),
        Animated.timing(this.state.riselogoImageOpacity, {
          duration: 1000,
          easing: Easing.bezier(0.22, 0.61, 0.36, 1),
          toValue: 1,
          useNativeDriver: true, // Add This line
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.googlebuttonButtonTranslateY, {
          duration: 1000,
          delay: 200,
          easing: Easing.bezier(0, 0, 1, 1),
          toValue: 1,
          useNativeDriver: true, // Add This line
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.loginbuttonButtonTranslateY, {
          duration: 900,
          delay: 100,
          easing: Easing.bezier(0, 0, 1, 1),
          toValue: 1,
          useNativeDriver: true, // Add This line
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.dontHaveAnAccountButtonTranslateY, {
          duration: 1000,
          delay: 300,
          easing: Easing.bezier(0, 0, 1, 1),
          toValue: 1,
          useNativeDriver: true, // Add This line
        }),
      ]),
    ]).start();
  };

  spinner = () => {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.loginscreenView}>
          <StatusBar barStyle="dark-content" />
          {this.state.spinner ? this.spinner() : null}
          <View
            pointerEvents="box-none"
            style={{
              width: 296,
              height: 242,
              marginTop: 0,
            }}>
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
            <Text style={styles.welcomeToRiseText}>Welcome to Rise</Text>
          </View>
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
                returnKeyType="next"
                clearButtonMode="always"
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType="email-address"
                value={this.state.email}
                placeholder="Email Address"
                // textContentType="emailAddress"
                onChangeText={(text) => this.setState({email: text, error: ''})}
                style={styles.emailAddressTextInput}
              />
            </View>
            <View style={styles.passwordView}>
              <View
                pointerEvents="box-none"
                style={{
                  height: 19,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flex: 0.5,
                }}>
                <Text style={styles.emailAddressText}>Password</Text>
                <TouchableOpacity
                  onPress={this.onForgotPasswordPressed}
                  style={styles.forgotPasswordButton}>
                  <Text style={styles.forgotPasswordButtonText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                returnKeyType="done"
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholder="Password"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text) =>
                  this.setState({password: text, error: ''})
                }
                textContentType="password"
                style={styles.passwordTextInput}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
            }}>
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
                    translateY: this.state.loginbuttonButtonTranslateY.interpolate(
                      {
                        inputRange: [-1, 0, 1],
                        outputRange: [0.01, 200, 0],
                      },
                    ),
                  },
                ],
              },
              styles.loginbuttonButtonAnimated,
            ]}>
            <TouchableOpacity
              onPress={() => this.onLoginButtonPressed()}
              style={styles.loginbuttonButton}>
              <Text style={styles.loginbuttonButtonText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    translateY: this.state.googlebuttonButtonTranslateY.interpolate(
                      {
                        inputRange: [-1, 0, 1],
                        outputRange: [0.01, 250, 0],
                      },
                    ),
                  },
                ],
              },
              styles.googlebuttonButtonAnimated,
            ]}>
            <TouchableOpacity
              onPress={() => this.onGoogleButtonPressed()}
              style={styles.googlebuttonButton}>
              <Image
                source={require('./../../assets/images/googleicon.png')}
                style={styles.googlebuttonButtonImage}
              />
              <Text style={styles.googlebuttonButtonText}>
                Login in with Google
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    translateY: this.state.dontHaveAnAccountButtonTranslateY.interpolate(
                      {
                        inputRange: [-1, 0, 1],
                        outputRange: [0.01, 300, 0],
                      },
                    ),
                  },
                ],
              },
              styles.dontHaveAnAccountButtonAnimated,
            ]}>
            <TouchableOpacity
              onPress={() => this.onDontHaveAnAccountPressed()}
              style={styles.dontHaveAnAccountButton}>
              <Text style={styles.dontHaveAnAccountButtonText}>
                Don't have an account?
                <Text style={{fontWeight: '800', color: '#7A5FFA'}}>
                  {' '}
                  Sign up
                </Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect()(LoginScreen);
