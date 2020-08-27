/* eslint-disable react-native/no-inline-styles */
//
//  NewsScreen
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './NewsScreenStyleSheet';
import {View, StatusBar, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
// import {NavigationContext} from '@react-navigation/native';

export default function NewsScreen({navigation, route}) {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <View style={styles.newsscreenView}>
      <StatusBar barStyle="dark-content" />
      <View
        pointerEvents="box-none"
        style={{
          flex: 1,
          marginTop: 7,
        }}>
        <View style={styles.rectangleView} />
        <View style={styles.infocardView} />
        {loading && (
          <ActivityIndicator
            style={{position: 'absolute', top: '45%', left: '47%'}}
            size="large"
          />
        )}
        <WebView
          onLoad={() => setLoading(false)}
          source={{
            uri: route.params?.url,
          }}
          style={styles.webviewWebView}
        />
      </View>
    </View>
  );
}
