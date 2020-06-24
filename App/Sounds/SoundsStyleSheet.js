//
//  SoundsStyleSheet.js
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
	soundsView: {
		backgroundColor: '#DEE9FD', //"rgb(231, 238, 251)",
		flex: 1,
	},
	backbuttonbarView: {
		backgroundColor: "transparent",
		height: 58,
		alignItems: "flex-start",
	},
	backbuttonButtonImage: {
		resizeMode: "contain",
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
	soundsText: {
		color: "rgb(29, 103, 153)",
		// fontFamily: "Rubik-Regular",
		fontSize: 48,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		shadowColor: "rgba(0, 0, 0, 0.1)",
		shadowRadius: 4,
		shadowOpacity: 1,
		alignSelf: "center",
		marginTop: 12,
	},
	rectangleView: {
		backgroundColor: "#fff",
		borderRadius: 41,
		shadowColor: "rgba(0, 0, 0, 0.15)",
		shadowRadius: 5,
		shadowOpacity: 1,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: -50,
	},
	infocardFlatListViewWrapper: {
		width: 360,
		height: 377,
	},
	infocardFlatList: {
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	savebuttonButtonText: {
		color: "rgb(250, 252, 252)",
		// fontFamily: "Poppins-Regular",
		fontSize: 24,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	savebuttonButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
	savebuttonButton: {
		backgroundColor: "rgb(252, 102, 129)",
		borderRadius: 23,
		shadowColor: "rgba(0, 0, 0, 0.25)",
		shadowRadius: 15,
		shadowOpacity: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 234,
		height: 46,
	},
})

export default styles
