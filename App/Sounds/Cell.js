//
//  Cell
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import React from "react"
import styles from "./CellStyleSheet"
import { Text, TouchableWithoutFeedback, View } from "react-native"


export default class Cell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onCellPress = () => {
	
	}

	render() {
	
		return <TouchableWithoutFeedback
				onPress={this.onCellPress}>
				<View
					style={styles.cell}>
					<Text
						style={styles.labelText}>Sound 1</Text>
				</View>
			</TouchableWithoutFeedback>
	}
}
