//
//  TaskStyleSheet.js
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import {StyleSheet, Dimensions} from 'react-native';

const PAGE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  group: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 7,
    width: 200, //PAGE_WIDTH / 2 - 15,
    height: 170,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: 10,
  },
  groupExtra: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 60,
    width: 50, //PAGE_WIDTH / 2 - 15,
    height: 50,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: 25,
  },
  extraText: {
    color: 'black',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 8,
    width: '100%',
    flexWrap: 'wrap',
    marginRight: 10,
  },
  group7View: {
    // flex: 0.25,
    backgroundColor: 'white', //  "rgb(231, 238, 251)",
    borderRadius: 10,
    height: 30,
    marginLeft: 3,
    marginRight: 3,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  bathroomText: {
    color: 'black',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'left',
    marginHorizontal: 2,
    marginTop: 4,
    width: '98%',
    marginBottom: 1,
    flexWrap: 'wrap',
    padding: 3,
  },
  image: {
    width: 200,
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default styles;
