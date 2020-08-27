/* eslint-disable react-native/no-inline-styles */
//
//  HomeScreen
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from 'react';
import styles from './HomeScreenStyleSheet';
import {
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StatusBar,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import News from './News';
import {articles} from '../Config/Data';
import {connect} from 'react-redux';
import {
  // InterstitialAd,
  // RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
} from '@react-native-firebase/admob';

// import {isNewUser} from '../actions/login';

// const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

class HomeScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    if (this.props.newUser) {
      const navigation = this.context;
      navigation.navigate('Onboard');
    }
  }

  renderTableviewFlatListCell = ({item}) => {
    return <News data={item} image={item.urlToImage} />;
  };

  renderItemList = () => {
    return (
      <Text style={{...styles.noTasksFound, fontWeight: 'bold', fontSize: 14}}>
        News not found
      </Text>
    );
  };

  needMoreTime = () => {
    // this.props.dispatch(isNewUser(true))
    // this.props.dispatch({ type: 'LOADING', value: false });
    console.log(this.props.userToken);
  };

  tasksView = () => {
    return (
      <View style={styles.viewThreeView}>
        <View style={styles.card1View} />
        <View style={styles.timeView}>
          <Text style={{...styles.currentTask, paddingTop: 7}}>
            Current Task:
          </Text>
          <Text style={styles.currentTask}>Breakfast</Text>
          <Text style={styles.timeRemaining}>Time Remaining: 15 mins</Text>
          <Text style={styles.nextTask}>Next Task: Pack Lunch</Text>
        </View>
        <View style={styles.card1ButtonGroup}>
          <View style={styles.adfreebuttonView}>
            <TouchableOpacity
              style={styles.option4Button}
              onPress={() => this.needMoreTime()}>
              <Text style={styles.option4ButtonText}>I need more time</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.adfreebuttonView}>
            <TouchableOpacity style={styles.option4Button}>
              <Text style={styles.option4ButtonText}>Go to next task </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  adView = () => {
    return (
      <View style={styles.viewThreeView}>
        <View style={styles.card1View} />
        <View />
      </View>
    );
  };

  renderMessages = () => {
    return this.props.messages.map((message, index) => {
      return (
        <View style={styles.messageView}>
          <Text key={index} style={styles.messageText}>
            {message.info}
          </Text>
        </View>
      );
    });
  };

  modal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => this.setState({showModal: false})}>
              <Image
                source={require('../../assets/images/close-icon.png')}
                style={styles.textStyle}
              />
            </TouchableOpacity>

            <ScrollView style={styles.tableviewFlatList}>
              {this.renderMessages()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  newsView = () => {
    let articleList = articles;
    return (
      <View style={styles.viewTwoView}>
        <View style={styles.card2HeaderView}>
          <Image
            source={require('../../assets/images/NewsHeader.png')}
            style={{resizeMode: 'contain', width: '95%', alignSelf: 'center'}}
          />
        </View>

        <View style={styles.tableviewFlatListViewWrapper}>
          <FlatList
            renderItem={({item}) => (
              <News data={item} image={item.urlToImage} />
            )}
            data={articleList}
            style={styles.tableviewFlatList}
            removeClippedSubviews={false}
            ListEmptyComponent={this.renderItemList}
            keyExtractor={(item) => item.publishedAt}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.homescreenView}>
        <StatusBar barStyle="dark-content" />
        {this.modal()}
        <TouchableWithoutFeedback
          onPress={() => this.setState({showModal: true})}>
          <View style={styles.notiView}>
            <View style={styles.notiButton}>
              <Image
                source={require('../../assets/images/notification.png')}
                style={{
                  resizeMode: 'contain',
                  marginTop: 5,
                  marginRight: 5,
                }}
              />
            </View>
            <View style={styles.counter}>
              <Text style={styles.counterText}>
                {this.props.messages.length}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.scrollviewScrollView}>
          <View
            style={{
              flex: 1,
              elevation: 0,
            }}>
            <Image
              source={require('./../../assets/images/TopView.png')}
              style={{position: 'absolute', height: '100%', width: '100%'}}
            />
            {this.tasksView()}
          </View>
          <View
            style={{
              flex: 1,
              // borderWidth: 2,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View
              style={{
                flex: 1,
              }}>
              {this.newsView()}
            </View>
            <View
              style={{
                // flex: 0.2,
                // borderWidth: 2,
                marginBottom: 10,
                justifyContent: 'flex-start',
                // alignItems: 'center',
                alignSelf: 'center',
              }}>
              <BannerAd
                unitId={TestIds.BANNER}
                size={
                  PAGE_HEIGHT >= 800
                    ? BannerAdSize.LARGE_BANNER
                    : BannerAdSize.SMART_BANNER
                }
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {newUser, userToken} = state.loginReducer;
  const {messages} = state.homeReducer;
  return {newUser, userToken, messages};
};

export default connect(mapStateToProps)(HomeScreen);
