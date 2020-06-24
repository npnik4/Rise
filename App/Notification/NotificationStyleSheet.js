//
//  NotificationStyleSheet.js
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
	notificationView: {
		backgroundColor: "rgb(231, 238, 251)",
		flex: 1,
	},
	rectangleView: {
		backgroundColor: "white",
		borderRadius: 41,
		shadowColor: "rgba(0, 0, 0, 0.1)",
		shadowRadius: 21,
		shadowOpacity: 1,
		position: "absolute",
		left: 0,
		right: 0,
		top: 365,
		bottom: -29,
	},
	groupView: {
		backgroundColor: "transparent",
		width: 243,
		height: 500,
		justifyContent: 'center',
		alignContent: 'center'
	},
	notificationTwoView: {
		backgroundColor: "rgb(252, 102, 129)",
		borderRadius: 121.5,
		shadowColor: "rgba(0, 0, 0, 0.28)",
		shadowRadius: 8,
		shadowOpacity: 1,
		width: "100%",
		height: "100%",
	},
	notificationTwoViewAnimated: {
		height: 243,
	},
	shapeImage: {
		backgroundColor: "transparent",
		shadowColor: "rgba(0, 0, 0, 0.5)",
		shadowRadius: 4,
		shadowOpacity: 1,
		resizeMode: "center",
		width: null,
		height: 180,
		marginLeft: 45,
		marginRight: 45,
		marginTop: 30,
	},
	pleaseAllowPushNoText: {
		color: "rgb(252, 102, 129)",
		fontSize: 36,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		alignSelf: "center",
		backgroundColor: "transparent",
		marginBottom: 2,
	},
	nextbuttonButtonAnimated: {
		alignSelf: "flex-end",
		width: 75,
		height: 75,
	},
	nextbuttonButtonImage: {
		resizeMode: "contain",
	},
	nextbuttonButtonText: {
		color: "black",
		fontFamily: ".AppleSystemUIFont",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	nextbuttonButton: {
		backgroundColor: "rgb(252, 102, 129)",
		borderRadius: 37.5,
		shadowColor: "rgba(0, 0, 0, 0.29)",
		shadowRadius: 3,
		shadowOpacity: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: "100%",
		height: "100%",
	},
})

export default styles
