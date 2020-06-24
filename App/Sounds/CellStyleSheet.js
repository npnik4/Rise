//
//  CellStyleSheet.js
//  RiseApp
//
//  Created by Nikhil Patel.
//  Copyright © 2018 Rise. All rights reserved.
//

import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
	cell: {
		backgroundColor: "rgb(231, 238, 251)",
		borderRadius: 10,
		width: "100%",
		height: 45,
		alignItems: "flex-start",
		marginBottom: 5
	},
	labelText: {
		backgroundColor: "transparent",
		color: "black",
		// fontFamily: "Rubik-Regular",
		fontSize: 24,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 144,
		marginLeft: 10,
		marginTop: 10,
	},
})

export default styles
