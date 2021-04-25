import React, { useEffect, useState } from "react"
import {
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableOpacity,
} from "react-native"
import AppLoading from "expo-app-loading"
import { connect } from "react-redux"
import { receiveEntries, addEntry } from "../actions"
import { timeToString, getDailyReminderValue } from "../utils/helpers"
import { fetchCalendarResults } from "../utils/api"
import FitnessCalendar from "udacifitness-calendar-fix"
import { white } from "../utils/colors"
import Header from "./Header"
import Card from "./Card"

const History = ({ dispatch, entries, navigation }) => {
	const [ isReady, setIsReady ] = useState(false)

	useEffect(() => {
		fetchCalendarResults()
			.then((entries) => dispatch(receiveEntries(entries)))
			.then(({ entries }) => {
				if (!entries[timeToString()]) {
					dispatch(
						addEntry({
							[timeToString()]: getDailyReminderValue(),
						}),
					)
				}
			})
			.then(() => {
				setIsReady((isReady) => !isReady)
			})
	}, [])

	const renderItem = ({ today, ...metrics }, formattedDate, key) => (
		<View style={styles.item}>
			{today ? (
				<View>
					<Header date={formattedDate} />
					<Text style={styles.noDataText}>{today}</Text>
				</View>
			) : (
				<TouchableOpacity onPress={() => navigation.navigate('Detail', {entryId: key})}>
					<Card date={formattedDate} metrics={metrics} />
				</TouchableOpacity>
			)}
		</View>
	)

	const renderEmptyDate = (formattedDate) => (
		<View style={styles.item}>
			<Header date={formattedDate} />
			<Text style={styles.noDataText}>
				You didn't log any data on this day
			</Text>
		</View>
	)

	return !isReady ? (
		<AppLoading />
	) : (
		<FitnessCalendar
			items={entries}
			renderItem={renderItem}
			renderEmptyDate={renderEmptyDate}
		/>
	)
}

const styles = StyleSheet.create({
	item       : {
		backgroundColor : white,
		borderRadius    : Platform.Os === "ios" ? 16 : 2,
		padding         : 20,
		marginLeft      : 10,
		marginRight     : 10,
		marginTop       : 17,
		justifyContent  : "center",
		shadowRadius    : 3,
		shadowOpacity   : 0.8,
		shadowColor     : "rgba(0,0,0,0.24)",
		shadowOffset    : {
			width  : 0,
			height : 3,
		},
	},
	noDataText : {
		fontSize      : 20,
		paddingTop    : 20,
		paddingBottom : 20,
	},
})

const mapStateToProps = (entries) => ({ entries })

export default connect(mapStateToProps)(History)
