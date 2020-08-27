import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Dimensions, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

import auth from '@react-native-firebase/auth';

import TasksScreen from '../TasksScreen/TasksScreen';
import EditTask from '../EditTask/EditTask';
import AddTask from '../AddTask/AddTask';
import BlankScreen from '../BlankScreen/BlankScreen';
import HomeScreen from '../HomeScreen/HomeScreen';
import LogOutModal from '../LogOutModal/LogOutModal';
import LoginScreen from '../LoginScreen/LoginScreen';
import NewsScreen from '../NewsScreen/NewsScreen';
import Notification from '../Notification/Notification';
import Profile from '../Profile/Profile';
import EditProfile from '../EditProfile/EditProfile';
import AddProfile from '../AddProfile/AddProfile';
import ResetPassword from '../ResetPassword/ResetPassword';
import Ringtone from '../Ringtone/Ringtone';
import SetUpProfile from '../SetUpProfile/SetUpProfile';
import SettingsScreen from '../SettingsScreen/SettingsScreen';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import Sounds from '../Sounds/Sounds';
import SplashScreen from '../SplashScreen/SplashScreen';
import AdFree from '../AdFree/AdFree';
import Onboard from '../Onboarding/Onboarding';
import {AuthContext} from './Utils';
import {GoogleSignin} from '@react-native-community/google-signin';

const PAGE_HEIGHT = Dimensions.get('window').height;
const headerColor = '#DEE9FD';
const headerTintColor = '#5665FB';

const id =
  Platform.OS === 'ios'
    ? '261380682946-vtovf5h6v507ft92f8vks3umovqut43t.apps.googleusercontent.com'
    : '261380682946-terin0kmljutg9vhvi2aplf6fpf2f1ug.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: id,
});

const TasksStack = createStackNavigator();
const TasksStackScreen = () => (
  <TasksStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: headerColor,
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: '500',
      },
      cardShadowEnabled: false,
      cardOverlayEnabled: false,
      headerTintColor: headerTintColor,
      headerBackTitleVisible: false,
      gestureEnabled: false,
      animationEnabled: Platform.OS === 'ios' ? true : false,
    }}>
    <TasksStack.Screen
      name="Tasks"
      component={TasksScreen}
      options={{
        headerTitle: '',
        headerShown: false,
      }}
    />
    <TasksStack.Screen
      name="EditTask"
      component={EditTask}
      options={{
        headerTitle: 'Edit Task',
      }}
    />
    <TasksStack.Screen
      name="AddTask"
      component={AddTask}
      options={{
        headerTitle: 'Add Task',
      }}
    />
  </TasksStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: headerColor,
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: '500',
      },
      cardShadowEnabled: false,
      cardOverlayEnabled: false,
      headerBackTitleVisible: false,
      headerTintColor: headerTintColor,
      gestureEnabled: false,
      animationEnabled: Platform.OS === 'ios' ? true : false,
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen name="News" component={NewsScreen} />
    <HomeStack.Screen
      name="Onboard"
      component={Onboard}
      options={{
        headerShown: false,
      }}
    />
  </HomeStack.Navigator>
);

const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => (
  <SettingsStack.Navigator
    initialRouteName="Profile"
    screenOptions={{
      headerStyle: {
        backgroundColor: headerColor,
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: '500',
      },
      cardShadowEnabled: false,
      cardOverlayEnabled: false,
      headerBackTitleVisible: false,
      headerTintColor: headerTintColor,
      gestureEnabled: false,
      animationEnabled: Platform.OS === 'ios' ? true : false,
    }}>
    <SettingsStack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerTitle: '',
        headerShown: false,
      }}
    />
    <SettingsStack.Screen
      name="Setting"
      component={SettingsScreen}
      options={{
        headerTitle: 'Settings',
      }}
    />
    <SettingsStack.Screen name="Sounds" component={Sounds} />
    <SettingsStack.Screen
      name="BlankScreen"
      component={BlankScreen}
      options={{
        headerTitle: 'General',
      }}
    />
    <SettingsStack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerTitle: 'Edit Profile',
      }}
    />
    <SettingsStack.Screen
      name="AddProfile"
      component={AddProfile}
      options={{
        headerTitle: 'Add Profile',
      }}
    />
    <SettingsStack.Screen
      name="AdFree"
      component={AdFree}
      options={{
        headerTitle: 'Go Ad Free',
      }}
    />
    <SettingsStack.Screen
      name="LogOutModal"
      component={LogOutModal}
      options={{
        headerShown: false,
      }}
    />
  </SettingsStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      showLabel: false,
      inactiveTintColor: '#6D7278',
      adaptive: false,
      keyboardHidesTabBar: true,
      style: {
        borderTopWidth: 0,
        elevation: 8,
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowRadius: 5,
        shadowOffset: {
          height: 0,
        },
        shadowOpacity: 1,
        height: '8%',
        backgroundColor: '#fff',
      },
    }}
    screenOptions={({route}) => ({
      tabBarVisible: getIsTabBarVisible(route),
    })}>
    <AppTabs.Screen
      name="Tasks"
      component={TasksStackScreen}
      options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <Image
              source={require('./../../assets/images/TaskIcon.png')}
              style={styles.imageIcon}
            />
          ) : (
            <Image
              source={require('./../../assets/images/TaskIconInactive.png')}
              style={styles.imageIcon}
            />
          ),
      }}
    />
    <AppTabs.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <Image
              source={require('./../../assets/images/HomeButton.png')}
              style={styles.imageIcon}
            />
          ) : (
            <Image
              source={require('./../../assets/images/HomeButtonInactive.png')}
              style={styles.imageIcon}
            />
          ),
      }}
    />
    <AppTabs.Screen
      name="Settings"
      component={SettingsStackScreen}
      options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <Image
              source={require('./../../assets/images/Profile.png')}
              style={styles.imageIcon}
            />
          ) : (
            <Image
              source={require('./../../assets/images/ProfileInactive.png')}
              style={styles.imageIcon}
            />
          ),
      }}
    />
  </AppTabs.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
      headerStyle: {
        backgroundColor: 'rgba(176,196,222, 1)',
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: '500',
      },
      cardShadowEnabled: false,
      headerBackTitleVisible: false,
      cardOverlayEnabled: false,
      headerTintColor: headerTintColor,
      animationEnabled: Platform.OS === 'ios' ? true : false,
    }}>
    <AuthStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{
        headerTitle: 'Log in',
      }}
    />
    <AuthStack.Screen
      name="SignUpScreen"
      component={SignUpScreen}
      options={{
        headerShown: true,
        headerTitle: 'Sign Up',
        headerMode: 'none',
      }}
    />
    <AuthStack.Screen
      name="ResetPassword"
      component={ResetPassword}
      options={{
        headerShown: true,
        headerMode: 'none',
        headerTitle: 'Reset Password',
      }}
    />
  </AuthStack.Navigator>
);

// ===================== END OF NAVIGATORS ==============================

const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({type: 'LOADING', value: true});
    const bootstrapAsync = async () => {
      await auth().onAuthStateChanged((user) => {
        // console.log(user)
        if (user) {
          setTimeout(
            () => this.props.dispatch({type: 'RESTORE_TOKEN', token: user.uid}),
            1000,
          );
          // this.props.dispatch({ type: 'RESTORE_TOKEN', token: user.uid });
        }
      });
      setTimeout(
        () => this.props.dispatch({type: 'LOADING', value: false}),
        1000,
      );
      // this.props.dispatch({ type: 'LOADING', value: false });
    };

    bootstrapAsync();
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {this.props.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          ) : this.props.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="AuthStackScreen"
              component={AuthStackScreen}
              options={{
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: this.props.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="AppTabsScreen" component={AppTabsScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const {isLoading, isSignout, userToken} = state.loginReducer;
  return {isLoading, isSignout, userToken};
};

export default connect(mapStateToProps)(App);

// ========================== EXTRAS BELOW ===================================

const styles = StyleSheet.create({
  imageIcon: {
    marginTop: PAGE_HEIGHT > 800 ? 17 : 5,
  },
});

const getIsTabBarVisible = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params
    ? route.params.screen
    : 'Tab1';
  switch (routeName) {
    case 'EditTask':
    case 'AddTask':
    case 'Sounds':
    case 'Setting':
    case 'AdFree':
    case 'News':
    case 'Blank':
    case 'BlankScreen':
    case 'LogOutModal':
    case 'EditProfile':
    case 'AddProfile':
    case 'Onboard':
      return false;
    default:
      return true;
  }
};
