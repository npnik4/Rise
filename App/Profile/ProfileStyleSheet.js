//
//  ProfileStyleSheet.js
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  profileView: {
    backgroundColor: '#DEE9FD', // "rgb(231, 238, 251)",
    flex: 1,
    alignItems: 'flex-end',
  },
  tableviewFlatListViewWrapper: {
    flex: 1,
    marginTop: 20,
    marginBottom: 5,
    paddingTop: 5,
  },
  tableviewFlatList: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    paddingTop: 5,
    paddingBottom: 5,
  },
  noTasksFound: {
    color: 'black',
    fontFamily: '.AppleSystemUIFont',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    paddingTop: 20,
  },

  rectangleView: {
    backgroundColor: 'white',
    borderRadius: 41,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowRadius: 7,
    shadowOpacity: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: -50,
    elevation: 2,
  },
  option4Button: {
    backgroundColor: '#DEE9FD', //"rgb(231, 238, 251)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dddddd',
    shadowColor: 'rgba(14, 144, 185, 0.20)',
    shadowOffset: {
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    height: 50,
    marginLeft: 12,
    marginRight: 11,
    marginTop: 15,
    zIndex: 1,
  },
  option4ButtonText: {
    color: 'rgb(7, 40, 64)',
    // fontFamily: "Rubik-Regular",
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  option4ButtonImage: {
    resizeMode: 'contain',
    marginLeft: 175,
  },
  adfreebuttonView: {
    backgroundColor: 'transparent',
    height: 60,
    marginBottom: 30,
  },
  addbuttonButton: {
    // backgroundColor: 'rgb(252, 102, 129)', //'#DEE9FD', //"#87C7FF",
    // borderRadius: 30,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowRadius: 7,
    shadowOpacity: 1,
    shadowOffset: {
      height: 1,
    },
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 60,
    height: 60,
    marginRight: 30,
    marginTop: 10,
  },
  addbuttonButtonImage: {
    resizeMode: 'contain',
  },
});

export default styles;
