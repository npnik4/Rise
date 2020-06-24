//
//  SetUpProfile
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from "react"
import styles from "./SetUpProfileStyleSheet"
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar } from "react-native"
import { NavigationContext } from '@react-navigation/native';

export default class SetUpProfile extends React.Component {

	static contextType = NavigationContext;

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onCarPressed = () => {
	
	}

	onTrainPressed = () => {
	
	}

	onBikingPressed = () => {
	
	}

	onWalkingPressed = () => {
	
	}

	onSaveButtonTwoPressed = () => {
		// const navigation = this.context;
		// navigation.navigate("Tabs", { screen: 'Tasks'})
	}

	onSaveButtonPressed = () => {
	
	}

	onOvalPressed = () => {
	
	}

	onOvalTwoPressed = () => {
	
	}

	onOvalThreePressed = () => {
	
	}

	onOvalFourPressed = () => {
	
	}

	onOvalFivePressed = () => {
	
	}

	onOvalSixPressed = () => {
	
	}

	onOvalSevenPressed = () => {
	
	}

	render() {
	
		return <View
				style={styles.setupprofileView}>
				<StatusBar barStyle='dark-content'/>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 46,
						bottom: -29,
					}}>
					<Text
						style={styles.setUpYourProfileText}>Set up your Profile</Text>
					<View
						pointerEvents="box-none"
						style={{
							flex: 1,
							marginTop: 10,
						}}>
						<ScrollView
							style={styles.rectangleScrollView}/>
					</View>
				</View>
				<TouchableOpacity
					onPress={this.onSaveButtonPressed}
					style={styles.savebuttonButton}>
					<Text
						style={styles.savebuttonButtonText}>Save</Text>
				</TouchableOpacity>
			</View>
	}
}
