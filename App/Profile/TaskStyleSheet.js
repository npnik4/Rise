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
    // width: '100%',
    height: 105,
    marginBottom: 5,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    marginTop: 2,
  },
  group7View: {
    // backgroundColor: '#DEE9FD', //"rgb(231, 238, 251)",
    borderRadius: 15,
    height: 105,
    marginLeft: 21,
    marginRight: 20,
    // borderWidth: 1,
    // borderColor: '#dddddd',
    alignItems: 'flex-start',
    // tintColor: 'rgba(255, 255, 255, 0.5)',
  },
  cardImage: {
    position: 'absolute',
    resizeMode: 'stretch',
    // alignSelf: 'stretch',
    width: '100%',
    zIndex: -1,
    // tintColor: 'rgba(255, 255, 255, 0.99)',
  },
  bathroomText: {
    color: 'white',
    // fontFamily: "Rubik-Regular",
    fontSize: 34,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginLeft: 24,
    marginTop: 13,
  },
  minsText: {
    backgroundColor: 'transparent',
    color: 'white',
    // fontFamily: "Rubik-Regular",
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'left',
    marginLeft: 24,
    marginTop: 13,
  },
  minusButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 41,
    height: 40,
    marginRight: 30,
  },
  minusButtonImage: {
    resizeMode: 'contain',
  },
  minusButtonText: {
    color: 'black',
    fontFamily: '.AppleSystemUIFont',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
});

export default styles;
