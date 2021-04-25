import React, { Component } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { purple } from "../utils/colors"

class Live extends Component {
	state = {
		coords    : null,
		status    : null,
		direction : "",
	}

	render() {
		const { coords, status, direction } = this.state
		let children
		switch (status) {
			case null:
				children = <ActivityIndicator size="large" color={purple} style={{ marginTop: 30 }} />
				break
			case "denied":
				children = <Text>Denied</Text>
				break
			case "undetermined":
				children = <Text>Undetermined</Text>
				break

			default:
				children = <Text>Live - {JSON.stringify(this.state)}</Text>
				break
		}

		return (
			<View
				style={{
					flex           : 1,
					justifyContent : "center",
					alignItems     : "center",
				}}
			>
				{children}
			</View>
		)
	}
}

export default Live
