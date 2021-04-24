import React from "react"
import { Text, TouchableOpacity } from "react-native"

const Submit = ({ onPress, btnStyle, txtStyle }) => (
	<TouchableOpacity onPress={onPress} style={btnStyle}>
		<Text style={txtStyle}>Submit</Text>
	</TouchableOpacity>
)

export default Submit
