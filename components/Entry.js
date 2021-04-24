import React, { useState } from "react"
import { View, Text, Platform, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { connect } from "react-redux"
import { addEntry } from "../actions"
import {
	getMetricMetaInfo,
	timeToString,
	getDailyReminderValue,
} from "../utils/helpers"
import { removeEntry, submitEntry } from "../utils/api"
import Slider from "./Slider"
import Stepper from "./Stepper"
import Header from "./Header"
import Submit from "./buttons/Submit"
import TextButton from "./buttons/TextButton"
import { purple, white } from "../utils/colors"

const Entry = ({ alreadyLogged, dispatch }) => {
	const [ entry, setEntry ] = useState({
		run   : 0,
		bike  : 0,
		swim  : 0,
		sleep : 0,
		eat   : 0,
	})

	const increment = (metric) => {
		const { max, step } = getMetricMetaInfo(metric)

		setEntry((entry) => {
			const count = entry[metric] + step

			return {
				...entry,
				[metric] : count > max ? max : count,
			}
		})
	}

	const decrement = (metric) => {
		setEntry((entry) => {
			const count = entry[metric] - getMetricMetaInfo(metric).step

			return {
				...entry,
				[metric] : count < 0 ? 0 : count,
			}
		})
	}

	const slide = (metric, value) => {
		setEntry((entry) => ({
			...entry,
			[metric] : value,
		}))
	}

	const submit = () => {
		const key = timeToString()

		// update redux
		dispatch(addEntry({ [key]: entry }))

		// reset state
		setEntry(() => ({
			run   : 0,
			bike  : 0,
			swim  : 0,
			sleep : 0,
			eat   : 0,
		}))

		// todo: navigate to home

		// save to local storage
		submitEntry({ key, entry })

		// todo: clear local notification
	}

	const reset = () => {
		const key = timeToString()

		// update redux
		dispatch(addEntry({ [key]: getDailyReminderValue() }))

		// todo: route to home

		// update local storage
		removeEntry(key)
	}

	const metrics = getMetricMetaInfo()

	return alreadyLogged ? (
		<View style={styles.center}>
			<Ionicons
				name={Platform.OS === "ios" ? "ios-happy-outline" : "md-happy"}
				size={100}
				color={purple}
			/>
			<Text>You already logged your information for today!</Text>
			<TextButton style={{ padding: 10 }} onPress={reset}>
				Reset
			</TextButton>
		</View>
	) : (
		<View style={styles.container}>
			<Header date={new Date().toLocaleDateString()} />
			{Object.entries(metrics).map(([ metric, info ]) => {
				const { getIcon, type, ...rest } = info,
					value = entry[metric]

				return (
					<View key={metric} style={styles.row}>
						{getIcon()}
						{type === "slider" ? (
							<Slider
								value={value}
								onChange={(value) => slide(metric, value)}
								{...rest}
							/>
						) : (
							<Stepper
								value={value}
								onIncrement={() => increment(metric)}
								onDecrement={() => decrement(metric)}
								{...rest}
							/>
						)}
					</View>
				)
			})}
			<Submit
				onPress={submit}
				btnStyle={
					Platform.OS === "ios" ? (
						styles.iosSubmitBtn
					) : (
						styles.androidSubmitBtn
					)
				}
				txtStyle={styles.SubmitBtnTxt}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container        : {
		flex            : 1,
		padding         : 20,
		backgroundColor : white,
	},
	row              : {
		flexDirection : "row",
		flex          : 1,
		alignItems    : "center",
	},
	iosSubmitBtn     : {
		backgroundColor : purple,
		padding         : 10,
		borderRadius    : 7,
		height          : 45,
		marginLeft      : 40,
		marginRight     : 40,
	},
	androidSubmitBtn : {
		backgroundColor : purple,
		padding         : 10,
		paddingLeft     : 30,
		paddingRight    : 30,
		height          : 45,
		borderRadius    : 2,
		alignSelf       : "flex-end",
		justifyContent  : "center",
		alignItems      : "center",
	},
	SubmitBtnTxt     : {
		color     : white,
		fontSize  : 22,
		textAlign : "center",
	},
	center           : {
		flex           : 1,
		justifyContent : "center",
		alignItems     : "center",
		marginLeft     : 30,
		marginRight    : 30,
	},
})

const mapStateToProps = (state) => {
	const key = timeToString()

	return {
		alreadyLogged : state[key] && typeof state[key].today === "undefined",
	}
}

export default connect(mapStateToProps)(Entry)
