import { StatusBar } from "expo-status-bar"
import React from "react"
import { View, sStyleSheet } from "react-native"
import Entry from "./components/Entry"
import { getMetricMetaInfo } from "./utils/helpers";

const App = () => (
	<View>
    <Entry/>
	</View>
)

export default App
