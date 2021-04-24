import React from "react"
import { Text, View } from "react-native"
import { purple } from "../utils/colors"
const Header = ({ date }) => (
	<Text style={{ color: purple, fontSize: 25, marginTop: 25 }}>{date}</Text>
)

export default Header
