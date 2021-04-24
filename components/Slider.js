import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Slider as NativeSlider } from "react-native-elements"
import { gray } from "../utils/colors"

const Slider = ({ max, unit, step, value, onChange }) => (
	<View style={styles.row}>
		<NativeSlider
			style={{ flex: 1 }}
			thumbTintColor="#343434"
			thumbStyle={{ width: 20, height: 20 }}
			step={step}
			value={value}
			maximumValue={max}
			minimumValue={0}
			onValueChange={onChange}
		/>
		<View style={styles.metricCounter}>
			<Text style={{ fontSize: 24, textAlign: "center" }}>{value}</Text>
			<Text style={{ fontSize: 24, textAlign: "center", color: gray }}>
				{unit}
			</Text>
		</View>
	</View>
)

const styles = StyleSheet.create({
	row           : {
		flex          : 1,
		flexDirection : "row",
		alignItems    : "center",
	},
	metricCounter : {
		width          : 85,
		justifyContent : "center",
		alignItems     : "center",
	},
})

export default Slider
