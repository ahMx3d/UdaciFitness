import React, { useState } from "react"
import { View, Text } from "react-native"
import { getMetricMetaInfo } from "../utils/helpers"
import Slider from "./Slider"
import Stepper from "./Stepper"
import Header from './Header'

const Entry = () => {
	const [ state, setState ] = useState({
		run   : 0,
		bike  : 0,
		swim  : 0,
		sleep : 0,
		eat   : 0,
	})

	const increment = (metric) => {
		const { max, step } = getMetricMetaInfo(metric)

		setState((state) => {
			const count = state[metric] + step

			return {
				...state,
				[metric] : count > max ? max : count,
			}
		})
	}

	const decrement = (metric) => {
		setState((state) => {
			const count = state[metric] - getMetricMetaInfo(metric).step

			return {
				...state,
				[metric] : count < 0 ? 0 : count,
			}
		})
	}

	const slide = (metric, value) => {
		setState({ [metric]: value })
	}

	const metrics = getMetricMetaInfo()

	return (
		<View>
			<Header date={(new Date()).toLocaleDateString()} />
			{Object.entries(metrics).map(([ metric, info ]) => {
				const { getIcon, type, ...rest } = info,
					value = state[metric]

				return (
					<View key={metric}>
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
		</View>
	)
}

export default Entry
