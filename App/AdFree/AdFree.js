//
//  BlankScreen
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from "react"
import styles from "./AdFreeStyles"
import { Image, ScrollView, Text, TouchableOpacity, View, StatusBar } from "react-native"
import { NavigationContext } from '@react-navigation/native';


export default class AdFree extends React.Component {

	static contextType = NavigationContext;


	constructor(props) {
		super(props)
	}

	componentDidMount() {

	}


	render() {

		return <View
			style={styles.blankscreenView}>
			<StatusBar barStyle='dark-content' />
			<View
				pointerEvents="box-none"
				style={{
					flex: 1,
					marginTop: 20,
				}}>
				<View
					style={styles.rectangleView} />
				<ScrollView
					style={styles.infocardScrollView} />
			</View>
		</View>
	}
}
