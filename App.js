import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const App = () => (
	<View style={styles.container}>
		<Text>Open up App.js to start working on your app! ahmed salah</Text>
		<StatusBar style="auto" />
		<Ionicons name="ios-pizza" size={100} color="red" />
	</View>
)

const styles = StyleSheet.create({
	container : {
		flex            : 1,
		backgroundColor : "#fff",
		alignItems      : "center",
		justifyContent  : "center",
	},
})

export default App
