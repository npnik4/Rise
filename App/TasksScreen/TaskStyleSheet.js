//
//  TaskStyleSheet.js
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  group: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 73,
    marginBottom: 5,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 3,
    // elevation: 5,
    shadowOpacity: 1,
  },
  group7View: {
    backgroundColor: '#F4F2FF', //"rgb(231, 238, 251)",
    borderRadius: 15,
    height: 70,
    marginLeft: 20,
    marginRight: 20,
    // borderWidth: 1,
    // borderColor: '#dddddd',
    elevation: 2,
    alignItems: 'flex-start',
  },
  bathroomText: {
    color: 'black',
    // fontFamily: "Rubik-Regular",
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginLeft: 45,
    marginRight: '15%',
    marginTop: 7,
    width: '70%',
  },
  minsText: {
    backgroundColor: 'transparent',
    color: 'black',
    // fontFamily: "Rubik-Regular",
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'left',
    marginLeft: 45,
    marginTop: 5,
    paddingLeft: '5%',
  },
  minusButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 41,
    height: 40,
  },
  reorderButton: {
    resizeMode: 'center',
    backgroundColor: 'transparent',
    marginTop: 10,
    width: 15,
    height: 15,
    opacity: 0.6,
  },
  minusButtonImage: {
    resizeMode: 'contain',
  },
  reorderImage: {
    height: 20,
    width: 20,
    padding: 10,
  },
  minusButtonText: {
    color: 'black',
    fontFamily: '.AppleSystemUIFont',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  indexStyle: {
    color: 'black',
    // fontFamily: "Rubik-Regular",
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '300',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginLeft: 24,
    marginRight: '15%',
    marginTop: 10,
  },
});

export default styles;
