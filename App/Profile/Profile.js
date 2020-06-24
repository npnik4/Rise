/* eslint-disable react-native/no-inline-styles */
//
//  Profile
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './ProfileStyleSheet';
import Task from './Task';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {connect} from 'react-redux';
import {setSelectedDay} from '../actions';

class Profile extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      profiles: [{time: '9:00', days: ['Monday', 'Thrusday']}],
    };
  }

  componentDidMount() {}

  onAddButtonPressed = () => {
    const navigation = this.context;
    navigation.navigate('AddProfile');
  };

  goToSettings = () => {
    const navigation = this.context;
    navigation.navigate('Setting');
  };

  renderTableviewFlatListCell = () => {
    if (this.props.profiles.length) {
      return this.props.profiles.map((item, index) => {
        return (
          <Task
            key={item.ArrivalTime.toString() + index}
            index={index}
            item={item}
            profileType={item.ProfileType}
          />
        );
      });
    } else {
      return (
        <Text
          style={{...styles.noTasksFound, fontWeight: 'bold', fontSize: 14}}>
          Profile needs to be setup {'\n'}
          <Text style={styles.noTasksFound}>
            Click the '+' button above {'\n'} to set up Profile
          </Text>
        </Text>
      );
    }
  };

  render() {
    return (
      <View style={styles.profileView}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity
          onPress={() => this.onAddButtonPressed()}
          style={styles.addbuttonButton}>
          <Image
            source={require('./../../assets/images/AddButton.png')}
            style={styles.addbuttonButtonImage}
          />
        </TouchableOpacity>
        <View
          pointerEvents="box-none"
          style={{
            flex: 1,
            alignSelf: 'stretch',
            marginTop: 15,
          }}>
          <View style={styles.rectangleView} />
          <View style={styles.tableviewFlatListViewWrapper}>
            <ScrollView style={styles.tableviewFlatList}>
              {this.renderTableviewFlatListCell()}
            </ScrollView>
          </View>

          <View style={styles.adfreebuttonView}>
            <TouchableOpacity
              onPress={() => this.goToSettings()}
              style={styles.option4Button}>
              <Text style={styles.option4ButtonText}>Preferences</Text>
              <Image
                source={require('./../../assets/images/path.png')}
                style={styles.option4ButtonImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {profiles} = state.profile;
  return {profiles};
};

export default connect(mapStateToProps)(Profile);
