//
//  LogOutModal
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import * as React from 'react';
import styles from "./LogOutModalStyleSheet"
import { Image, Text, TouchableOpacity, View, StatusBar } from "react-native"
import { NavigationContext } from '@react-navigation/native';
import { AuthContext } from '../Config/Utils';


export default function LogOutModal() {
	
	// static contextType = NavigationContext;
	
	const { signOut } = React.useContext(AuthContext);
	// constructor(props) {
	// 	super(props)
	// }

	// componentDidMount() {
	
	// }

	onNoButtonPressed = () => {
		const navigation = this.context;
		navigation.navigate("Setting")
	}

	onYesButtonPressed = async () => {
		const navigation = this.context;
		signOut();
	}

	// render() {
	
		return ( <View
				style={styles.logoutmodalView}>
				<StatusBar barStyle='dark-content'/>
				<View
					style={styles.modalView}>
					<Text
						style={styles.areYouSureYouWanText}>Are you sure you want to logout?</Text>
					<View
						pointerEvents="box-none"
						style={{
							flex: 1,
							marginRight: 1,
							marginTop: 37,
						}}>
						<View
							style={styles.buttonscontainerView}/>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 90,
								right: 89,
								bottom: 90,
								height: 116,
								justifyContent: "flex-end",
							}}>
							<TouchableOpacity
								onPress={this.onYesButtonPressed}
								style={styles.yesbuttonButton}>
								<Text
									style={styles.yesbuttonButtonText}>Yes</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={this.onNoButtonPressed}
								style={styles.nobuttonButton}>
								<Text
									style={styles.nobuttonButtonText}>No</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	// }
}
