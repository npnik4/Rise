//
//  LogOutModalStyleSheet.js
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
	logoutmodalView: {
		backgroundColor: "rgba(0, 0, 0, 0.44)",
		flex: 1,
		justifyContent: "flex-end",
	},
	modalView: {
		backgroundColor: "rgb(231, 238, 251)",
		borderRadius: 27,
		shadowColor: "rgba(0, 0, 0, 0.5)",
		shadowRadius: 4,
		shadowOpacity: 1,
		height: 364,
	},
	areYouSureYouWanText: {
		backgroundColor: "transparent",
		color: "rgb(29, 103, 153)",
		// fontFamily: "Rubik-Regular",
		fontSize: 24,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 28,
		marginRight: 28,
		marginTop: 21,
	},
	buttonscontainerView: {
		backgroundColor: "#fff",
		borderRadius: 27,
		shadowColor: "rgba(0, 0, 0, 0.5)",
		shadowRadius: 4,
		shadowOpacity: 1,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 300,
	},
	yesbuttonButton: {
		backgroundColor: "rgb(252, 102, 129)",
		borderRadius: 22,
		shadowColor: "rgba(0, 0, 0, 0.29)",
		shadowRadius: 3,
		shadowOpacity: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 44,
		marginBottom: 34,
	},
	yesbuttonButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
	yesbuttonButtonText: {
		color: "white",
		// fontFamily: "Rubik-Regular",
		fontSize: 24,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	nobuttonButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
	nobuttonButton: {
		backgroundColor: "rgb(135, 199, 255)",
		borderRadius: 16.5,
		shadowColor: "rgba(0, 0, 0, 0.3)",
		shadowRadius: 3,
		shadowOpacity: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 38,
		marginLeft: 29,
		marginRight: 30,
	},
	nobuttonButtonText: {
		color: "white",
		// fontFamily: "Rubik-Regular",
		fontSize: 24,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
})

export default styles
