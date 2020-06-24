//
//  Ringtone
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from "react"
import styles from "./RingtoneStyleSheet"
import { Animated, Easing, Image, Text, TouchableOpacity, View, StatusBar } from "react-native"
import { NavigationContext } from '@react-navigation/native';

export default class Ringtone extends React.Component {

	static contextType = NavigationContext;

	constructor(props) {
		super(props)
		this.state = {
			ringtoneOnViewTranslateY: new Animated.Value(-1),
			nextbuttonButtonTranslateY: new Animated.Value(-1),
			nextbuttonButtonOpacity: new Animated.Value(-1),
		}
	}

	componentDidMount() {
	
		this.startAnimationOne()
	}

	onNextButtonPressed = () => {
		const navigation = this.context;		
		navigation.navigate("SetUpProfile")
	}

	startAnimationOne() {
	
		// Set animation initial values to all animated properties
		this.state.nextbuttonButtonTranslateY.setValue(0)
		this.state.nextbuttonButtonOpacity.setValue(0)
		this.state.ringtoneOnViewTranslateY.setValue(0)
		
		// Configure animation and trigger
		Animated.parallel([Animated.parallel([Animated.timing(this.state.nextbuttonButtonTranslateY, {
			duration: 2000,
			easing: Easing.bezier(0.42, 0, 0.58, 1),
			toValue: 1,
			useNativeDriver: true
		}), Animated.timing(this.state.nextbuttonButtonOpacity, {
			duration: 2000,
			easing: Easing.bezier(0.42, 0, 0.58, 1),
			toValue: 1,
			useNativeDriver: true
		})]), Animated.parallel([Animated.timing(this.state.ringtoneOnViewTranslateY, {
			duration: 1000,
			easing: Easing.bezier(0, 0, 1, 1),
			toValue: 1,
			useNativeDriver: true
		})])]).start()
	}

	render() {
	
		return <View
				style={styles.ringtoneView}>
				<StatusBar barStyle='dark-content'/>
				<View
					style={styles.rectangleView}/>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: '13%',
						width: 299,
						top: 80,
						bottom: 22,
						alignItems: "flex-end",
					}}>
					<View
						style={styles.groupView}>
						<Animated.View
							style={[{
								transform: [{
									translateY: this.state.ringtoneOnViewTranslateY.interpolate({
										inputRange: [-1, 0, 1],
										outputRange: [0.01, -243, 0],
									}),
								}],
							}, styles.ringtoneOnViewAnimated]}>
							<View
								style={styles.ringtoneOnView}>
								<Image
									source={require("./../../assets/images/shape-2.png")}
									style={styles.shapeImage}/>
							</View>
						</Animated.View>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.pleaseDisableDoNoText}>Please disable Do Not Disturb and slient mode to allow alarm to play.</Text>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<Animated.View
						style={[{
							opacity: this.state.nextbuttonButtonOpacity.interpolate({
								inputRange: [-1, 0, 1],
								outputRange: [1, 0, 1],
							}),
							transform: [{
								translateY: this.state.nextbuttonButtonTranslateY.interpolate({
									inputRange: [-1, 0, 1],
									outputRange: [0.01, 100, 0],
								}),
							}],
						}, styles.nextbuttonButtonAnimated]}>
						<TouchableOpacity
							onPress={this.onNextButtonPressed}
							style={styles.nextbuttonButton}>
							<Image
								source={require("./../../assets/images/addicon.png")}
								style={styles.nextbuttonButtonImage}/>
						</TouchableOpacity>
					</Animated.View>
				</View>
			</View>
	}
}
