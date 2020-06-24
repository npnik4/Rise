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
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContext} from '@react-navigation/native';

class News extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onTaskPress = (url) => {
    url = url.replace('http', 'https');
    const navigation = this.context;
    navigation.navigate('News', {url: url});
  };

  showMoreNews = () => {
    let url = 'https://news.google.com/topstories';
    const navigation = this.context;
    navigation.navigate('News', {url: url});
  };
  // this.props.data.title.trim()
  // this.props.image
  lastCard = () => {
    return (
      <TouchableOpacity onPress={() => this.showMoreNews()}>
        <View style={styles.groupExtra}>
          <View>
            <Text style={styles.extraText}>•••</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <>
        {this.props.data.last ? (
          this.lastCard()
        ) : (
          <TouchableOpacity
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
          </TouchableOpacity>
        )}
      </>
    );
  }
}

export default News;
