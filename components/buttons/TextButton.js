import React from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { purple } from "../../utils/colors"

const TextButton = ({ children, onPress, style = {} }) => (
	<TouchableOpacity style={[ style, { margin: 5 } ]} onPress={onPress}>
		<Text style={styles.reset}>{children}</Text>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	reset : {
		textAlign : "center",
		color     : purple,
	},
})

export default TextButton
