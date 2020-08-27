//
//  SignUpScreenStyleSheet.js
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import {StyleSheet} from 'react-native';

const buttonColor = '#7A5FFA';

const styles = StyleSheet.create({
  signupscreenView: {
    // backgroundColor: "white",
    backgroundColor: 'rgba(176,196,222, 1)',
    flex: 1,
    alignItems: 'center',
  },
  riselogoImage: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowRadius: 3,
    // elevation: 4,
    shadowOpacity: 1,
    shadowOffset: {
      height: 0,
    },
  },
  riselogoImageAnimated: {
    width: 240,
    height: 175,
    // elevation: 4,
  },
  welcomeToRiseText: {
    color: 'rgb(20, 37, 80)',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: 0.25,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  emailView: {
    backgroundColor: 'transparent',
    width: '85%',
    marginLeft: 25,
    marginRight: 25,
  },
  formFieldTwoView: {
    backgroundColor: 'rgba(225, 230, 235, 0.70)',
    borderRadius: 20.31,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 15,
    height: 42,
  },
  emailAddressText: {
    backgroundColor: 'transparent',
    color: buttonColor,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 10,
    marginBottom: 7,
  },
  emailAddressTextInput: {
    paddingHorizontal: 10,
    color: 'rgb(8, 9, 9)',
    fontSize: 18,
    textAlign: 'left',
    // marginTop: 2,
    backgroundColor: 'rgba(225, 230, 235, 0.7)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFF',
    borderStyle: 'solid',
    height: 42,
  },
  confirmpasswordView: {
    backgroundColor: 'transparent',
    width: '85%',
    height: 120,
    marginTop: 15,
  },
  formFieldView: {
    backgroundColor: 'rgba(225, 230, 235, 0.70)',
    borderRadius: 20.31,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 17,
    height: 42,
  },
  passwordText: {
    backgroundColor: 'transparent',
    color: 'rgba(161, 159, 159, 0.8)',
    // fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 1,
  },
  passwordTextInput: {
    paddingHorizontal: 10,
    color: 'rgb(8, 9, 9)',
    fontSize: 18,
    textAlign: 'left',
    backgroundColor: 'rgba(225, 230, 235, 0.7)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFF',
    borderStyle: 'solid',
    height: 42,
  },
  formFieldCopyView: {
    backgroundColor: 'rgba(225, 230, 235, 0.70)',
    borderRadius: 20.31,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    marginTop: 15,
    height: 42,
  },
  confirmPasswordText: {
    color: 'red',
    // fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'left',
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    marginLeft: 1,
    padding: 10,
  },
  pTextInput: {
    paddingHorizontal: 10,
    color: 'rgb(8, 9, 9)',
    fontSize: 18,
    textAlign: 'left',
    backgroundColor: 'rgba(225, 230, 235, 0.7)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFF',
    borderStyle: 'solid',
    height: 42,
  },
  signupButtonAnimated: {
    width: 179,
    height: 50,
    bottom: 20,
    marginBottom: 30,
  },
  signupButtonText: {
    color: 'rgb(252, 248, 248)',
    // fontFamily: "Rubik-Regular",
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'center',
  },
  signupButtonImage: {
    resizeMode: 'contain',
    marginRight: 10,
  },
  signupButton: {
    backgroundColor: buttonColor,
    borderRadius: 25,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {
      height: 2,
    },
    justifyContent: 'center',
    padding: 0,
    width: '100%',
    height: '100%',
  },
});

export default styles;
