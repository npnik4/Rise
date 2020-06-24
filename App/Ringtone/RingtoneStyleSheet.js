//
//  RingtoneStyleSheet.js
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
	ringtoneView: {
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
		top: 350,
		bottom: -29,
	},
	groupView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 243,
		height: 500,
		alignItems: "center",
	},
	ringtoneOnView: {
		backgroundColor: "rgb(135, 199, 255)",
		borderRadius: 121.5,
		shadowColor: "rgba(0, 0, 0, 0.37)",
		shadowRadius: 8,
		shadowOpacity: 1,
		width: "100%",
		height: "100%",
	},
	ringtoneOnViewAnimated: {
		alignSelf: "stretch",
		height: 243,
	},
	shapeImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		shadowColor: "rgba(0, 0, 0, 0.5)",
		shadowRadius: 4,
		shadowOpacity: 1,
		flex: 1,
		width: null,
		marginLeft: 49,
		marginRight: 49,
		marginTop: 49,
		marginBottom: 49,
	},
	pleaseDisableDoNoText: {
		color: "rgb(252, 102, 129)",
		fontSize: 36,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		width: 319,
		marginBottom: 10,
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
		backgroundColor: "rgb(135, 199, 255)",
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
	nextbuttonButtonAnimated: {
		width: 75,
		height: 75,
	},
})

export default styles
