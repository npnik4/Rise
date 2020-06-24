//
//  App.js
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';

import {store, persistor} from './App/store';
import {Provider} from 'react-redux';
import SplashScreen from './App/SplashScreen/SplashScreen';
import Navigation from './App/Config/Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';

export default class App extends React.Component {
  componentDidMount() {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,
        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,
        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}
