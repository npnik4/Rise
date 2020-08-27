/* eslint-disable react-native/no-inline-styles */
//
//  Task
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './NewsStyleSheet';
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  Linking,
  Alert,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';

class News extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onTaskPress = async (url) => {
    url = url.replace('http', 'https');
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert('Error opening this news article, please try again later.');
    }
    // const navigation = this.context;
    // navigation.navigate('News', {url: url});
  };

  showMoreNews = async () => {
    let url = 'https://news.google.com/topstories';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert('Error opening more articles, please try again later.');
    }
    // const navigation = this.context;
    // navigation.navigate('News', {url: url});
  };
  // this.props.data.title.trim()
  // this.props.image
  lastCard = () => {
    return (
      <TouchableWithoutFeedback onPress={() => this.showMoreNews()}>
        <View style={styles.groupExtra}>
          <View>
            <Text style={styles.extraText}>•••</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <>
        {this.props.data.last ? (
          this.lastCard()
        ) : (
          <TouchableWithoutFeedback
            onPress={() => this.onTaskPress(this.props.data.url)}>
            <View style={styles.group}>
              <View style={styles.image}>
                <Image source={{uri: this.props.image}} style={styles.image} />
              </View>

              <View>
                <Text style={styles.bathroomText}>
                  {this.props.data.title.trim()}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </>
    );
  }
}

export default News;
