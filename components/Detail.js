import React, { useState, Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { connect } from "react-redux"
import { white } from "../utils/colors"
import Card from "./Card"
import { addEntry } from "../actions"
import { removeEntry } from "../utils/api"
import { timeToString, getDailyReminderValue } from "../utils/helpers"
import TextButton from "./buttons/TextButton"

class Detail extends Component {
	reset = () => {
		const { remove, goBack, entryId } = this.props
		remove()
		goBack()
		removeEntry(entryId)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.metrics !== null && !nextProps.metrics.today
	}

	render = () => (
        <View style={styles.container}>
			<Card metrics={this.props.metrics} />
			<TextButton onPress={this.reset} style={{ margin: 20 }}>
				Reset
			</TextButton>
		</View>
	)
}

const styles = StyleSheet.create({
	container : {
		flex            : 1,
		backgroundColor : white,
		padding         : 15,
	},
})

const mapStateToProps = (state, props) => {
	const { entryId } = props.route.params

	return {
		entryId,
		metrics : state[entryId],
	}
}

const mapDispatchToProps = (dispatch, props) => {
	const { entryId } = props.route.params
	return {
		remove : () =>
			dispatch(
				addEntry({
					[entryId] :
						entryId === timeToString()
							? getDailyReminderValue()
							: null,
				}),
			),
		goBack : () => props.navigation.goBack(),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
