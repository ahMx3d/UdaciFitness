import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Header from "./Header"
import { getMetricMetaInfo } from "../utils/helpers"
import { gray } from "../utils/colors"

const Card = ({ date, metrics }) => (
	<View>
		{date && <Header date={date} />}
		{Object.keys(metrics).map((metric) => {
			const {
				getIcon,
				displayName,
				unit,
			} = getMetricMetaInfo(metric)

			return (
				<View key={metric} style={styles.metric}>
					{getIcon()}
					<View>
						<Text style={{ fontSize: 20 }}>{displayName}</Text>
						<Text style={{ fontSize: 16, color: gray }}>
							{metrics[metric]} {unit}
						</Text>
					</View>
				</View>
			)
		})}
	</View>
)

const styles = StyleSheet.create({
	metric : {
		flexDirection : "row",
		marginTop     : 12,
	},
})

export default Card
