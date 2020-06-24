//
//  SplashScreen
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from "react"
import styles from "./SplashScreenStyleSheet"
import { Animated, Easing, Image, Text, View, StatusBar } from "react-native"
import { NavigationContext } from '@react-navigation/native';


export default class SplashScreen extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			riselogoViewScale: new Animated.Value(-1),
			riselogoViewOpacity: new Animated.Value(-1),
		}
	}

	componentDidMount() {
		this.startAnimationOne()
	}

	startAnimationOne() {
	
		// Set animation initial values to all animated properties
		this.state.riselogoViewScale.setValue(0)
		this.state.riselogoViewOpacity.setValue(0)
		
		// Configure animation and trigger
		Animated.parallel([Animated.parallel([Animated.timing(this.state.riselogoViewScale, {
			duration: 1000,
			easing: Easing.bezier(0.22, 0.61, 0.36, 1),
			toValue: 1,
			useNativeDriver: true
		}), Animated.timing(this.state.riselogoViewOpacity, {
			duration: 1000,
			easing: Easing.bezier(0.22, 0.61, 0.36, 1),
			toValue: 1,
			useNativeDriver: true
		})])]).start()
	}

	render() {
	
		return <View
				style={styles.splashscreenView}>
				<StatusBar barStyle='dark-content'/>
				<Animated.View
					style={[{
						opacity: this.state.riselogoViewOpacity.interpolate({
							inputRange: [-1, 0, 0.6, 1],
							outputRange: [1, 0, 1, 1],
						}),
						transform: [{
							scale: this.state.riselogoViewScale.interpolate({
								inputRange: [-1, 0, 0.2, 0.4, 0.6, 0.8, 1],
								outputRange: [1, 0.3, 1.1, 0.9, 1.03, 0.97, 1],
							}),
						}],
					}, styles.riselogoViewAnimated]}>
					<View
						style={styles.riselogoView}>
							<Image source={require("./../../assets/images/RiseLogo4.png")} 
								style={styles.riselogoImage}/>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.riseText}>Rise</Text>
					</View>
				</Animated.View>
			</View>
	}
}
