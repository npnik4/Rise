//
//  Sounds
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import Cell from "./Cell"
import React from "react"
import styles from "./SoundsStyleSheet"
import { FlatList, Image, Text, TouchableOpacity, View, StatusBar } from "react-native"
import { NavigationContext } from '@react-navigation/native';


export default class Sounds extends React.Component {


	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}


	onSaveButtonPressed = () => {
	
	}

	infocardFlatListMockData = [{
		key: "1",
	}, {
		key: "2",
	}, {
		key: "3",
	}]

	renderInfocardFlatListCell = ({ item }) => {
	
		return <Cell/>
	}

	render() {
	
		return <View
				style={styles.soundsView}>
				<StatusBar barStyle='dark-content'/>
				<View
					pointerEvents="box-none"
					style={{
						flex: 1,
						marginTop: 17,
					}}>
					<View
						style={styles.rectangleView}/>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							alignSelf: "center",
							width: 360,
							top: 38,
							bottom: 66,
							alignItems: "center",
						}}>
						<View
							style={styles.infocardFlatListViewWrapper}>
							<FlatList
								renderItem={this.renderInfocardFlatListCell}
								data={this.infocardFlatListMockData}
								style={styles.infocardFlatList}/>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<TouchableOpacity
							onPress={this.onSaveButtonPressed}
							style={styles.savebuttonButton}>
							<Text
								style={styles.savebuttonButtonText}>Save</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
	}
}
