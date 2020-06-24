//
//  BlankScreenStyleSheet.js
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
	blankscreenView: {
		backgroundColor: '#DEE9FD', //"rgb(231, 238, 251)",
		flex: 1,
	},
	backbuttonbarView: {
		backgroundColor: "transparent",
		height: 58,
		alignItems: "flex-start",
	},
	backbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 39,
		height: 28,
		marginLeft: 11,
		marginTop: 40,
	},
	backbuttonButtonText: {
		color: "black",
		fontFamily: ".AppleSystemUIFont",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	backbuttonButtonImage: {
		resizeMode: "contain",
	},
	rectangleView: {
		backgroundColor: "#fff",
		borderRadius: 41,
		shadowColor: "rgba(0, 0, 0, 0.2)",
		shadowRadius: 10,
		shadowOpacity: 1,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: -50,
	},
	infocardScrollView: {
		backgroundColor: "transparent",
		borderRadius: 21,
		borderWidth: 1,
		borderColor: "rgb(135, 199, 255)",
		borderStyle: "solid",
		position: "absolute",
		left: 14,
		right: 13,
		top: 16,
		bottom: 41,
	},
})

export default styles
