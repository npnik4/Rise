/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
// import Navigation from './App/Config/Navigation';
import {name as appName} from './app.json';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['`-[RCTRootView cancelTouches]`']);
// console.ignoredYellowBox = ['Warning: `-[RCTRootView cancelTouches]`'];
AppRegistry.registerComponent(appName, () => App);

// export default () => <Navigation />;