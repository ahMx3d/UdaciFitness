import React from "react"
import { View, StatusBar as NativeStatusBar } from "react-native"
import Constants from "expo-constants"

const StatusBar = ({ backgroundColor, ...props }) => (
	<View style={{ height: Constants.statusBarHeight }}>
		<NativeStatusBar
			translucent
			backgroundColor={backgroundColor}
			{...props}
		/>
	</View>
)

export default StatusBar
