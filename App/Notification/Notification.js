//
//  Notification
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from "react"
import styles from "./NotificationStyleSheet"
import { Image, Text, TouchableOpacity, View, StatusBar } from "react-native"
import { NavigationContext } from '@react-navigation/native';
import { AuthContext } from '../Config/Utils';

export default function Notification({navigation}) {



	onNextButtonPressed = () => {
		// const navigation = this.context;
		// navigation.navigate("Ringtone")
		// call sign up here
	}

	return <View
			style={styles.notificationView}>
			<StatusBar barStyle='dark-content'/>
			<View
				style={styles.rectangleView}/>
			<View
				pointerEvents="box-none"
				style={{
					position: "absolute",
					left: '12%',
					width: 299,
					top: 80,
					bottom: 22,
					alignItems: "center",
				}}>
				<View
					style={styles.groupView}>
					<View
						style={styles.notificationTwoViewAnimated}>
						<View
							style={styles.notificationTwoView}>
							<Image
								source={require("./../../assets/images/shape.png")}
								style={styles.shapeImage}/>
						</View>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.pleaseAllowPushNoText}>Please allow push notifications for alarm functionality.</Text>
				</View>
				<View
					style={{
						flex: 1,
					}}/>
				<View
					style={styles.nextbuttonButtonAnimated}>
					<TouchableOpacity
						onPress={this.onNextButtonPressed}
						style={styles.nextbuttonButton}>
						<Image
							source={require("./../../assets/images/addicon.png")}
							style={styles.nextbuttonButtonImage}/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
}
