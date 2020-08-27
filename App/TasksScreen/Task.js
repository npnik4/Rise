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
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {setSelectedTask} from '../actions';
import {connect} from 'react-redux';

class Task extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onTaskPress = (id) => {
    this.props.dispatch(setSelectedTask(id));
    const navigation = this.context;
    navigation.navigate('EditTask');
  };

  render() {
    return (
      <TouchableWithoutFeedback onLongPress={this.props.drag}>
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
              <Text numberOfLines={1} style={styles.bathroomText}>
                <Text style={styles.indexStyle}>{this.props.index + 1}. </Text>
                {this.props.title}
              </Text>
              <Text style={styles.minsText}> {this.props.time} mins</Text>
            </View>
          </View>
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 34,
              right: 50,
              top: 18,
              height: 44,
              flexDirection: 'row',
              alignItems: 'flex-start',
              elevation: 2,
            }}>
            <Image
              style={styles.reorderButton}
              source={require('./../../assets/images/reorder.png')}
            />
            <View
              style={{
                flex: 1,
              }}
            />
            <TouchableOpacity
              onPress={() => this.onTaskPress(this.props.index)}>
              <View style={styles.minusButton}>
                <Image
                  source={require('./../../assets/images/MinusBlack.png')}
                  style={styles.minusButtonImage}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect()(Task);
