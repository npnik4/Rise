import React, { Component } from 'react';
import { Animated, Text, View, Dimensions, StyleSheet, Image, Button, Platform } from 'react-native';
import { AuthContext } from '../Config/Utils';
import Onboarding from 'react-native-onboarding-swiper'; // 0.4.0
import { connect } from 'react-redux';
import { NavigationContext } from '@react-navigation/native';
import { isNewUser } from '../actions/login';

const PAGE_WIDTH = Dimensions.get('window').width;

class Onboard extends React.Component {

  static contextType = NavigationContext;

  constructor(props) {
		super(props)
  }

  componentDidMount() {
	}
  
  Done = () => {
    const navigation = this.context;
    this.props.dispatch(isNewUser(false));
    navigation.navigate("Home")
  }


  DoneButton = () => {
    return (<Button
      title='Done'
      onPress={() => this.Done()}
      color={"white"}
      style={{marginRight: 20}}
    />)
  };

  Simple = () => {
    return <Onboarding
      showSkip={false}
      bottomBarHeight={40}
      bottomBarHighlight={false}
      imageContainerStyles={{ ...styles.shadow }}
      allowFontScaling={false}
      DoneButtonComponent={this.DoneButton}
      onDone={this.Done}
      pages={[
        {
          image: <Image source={require('./../../assets/images/volume.jpg')} style={styles.photo} />,
          title: 'Enable Sound',
          subtitle: "Please disable Do Not Disturb and Slient mode to allow alarm to play sound",
          backgroundColor: '#0264BC',
          credits: 'Photo by Alasdair Elmes on Unsplash'
        },
        {
          backgroundColor: '#1abc9c',
          image: <Image source={require('./../../assets/images/alarm.jpg')} style={styles.photo} />,
          title: 'Allow Push Notifications',
          subtitle: "Please allow push notifications for alarm functionality",
        },
        {
          backgroundColor: '#fe6e58',
          image: <Image source={require('./../../assets/images/Profile.png')} style={styles.photo} />,
          title: 'Setting Up Profile',
          subtitle: "You must have at least one profile set up for functionality. Simply enter the time you have to be somewhere along with locations and transport mode.",
        },
        {
          title: 'Adding Tasks',
          subtitle: "For each day your profile is set up for assign your morning tasks",
          backgroundColor: '#34495e',
          image: <Image source={require('./../../assets/images/Tasks.png')} style={styles.photo} />,
        },
        {
          title: 'RISE',
          subtitle: "Make Your Mornings Easy",
          backgroundColor: '#c8a2c8',
          image: <Image source={require('./../../assets/images/balloon.jpg')} style={styles.photo} />, // Photo by ian dooley on Unsplash
        }
      ]}
    />
  };

  render () {
    return (
     this.Simple()
    )
  }
}

export default connect()(Onboard);

const styles = StyleSheet.create({
  shadow: {
    elevation: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: {
      height: 12,
    },
  },
  photo: {
    borderRadius: 20,
    height: PAGE_WIDTH + 10,
    width: PAGE_WIDTH - 70,
  },
});
