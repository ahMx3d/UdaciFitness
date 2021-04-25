import React from "react"
import { View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./reducers"
import Entry from "./components/Entry"
import History from "./components/History"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { purple, gray, white } from "./utils/colors"
import StatusBar from "./components/StatusBar"
import Detail from "./components/Detail"
import Live from "./components/Live"

const Tab = createBottomTabNavigator()

const StackEntry = createStackNavigator()
const EntryStack = () => (
	<StackEntry.Navigator
		initialRouteName="Entry"
		screenOptions={{
			headerShown : false,
		}}
	>
		<StackEntry.Screen
			name="Entry"
			component={Entry}
			options={navOptHandler}
		/>
	</StackEntry.Navigator>
)

const StackHistory = createStackNavigator()
const HistoryStack = () => (
	<StackHistory.Navigator
		initialRouteName="History"
		screenOptions={{
			headerTintColor       : white,
			headerStyle           : { backgroundColor: purple },
			headerStatusBarHeight : -15,
			headerTitleAlign      : "center",
		}}
	>
		<StackHistory.Screen
			name="History"
			component={History}
			options={navOptHandler}
		/>
		<StackHistory.Screen
			name="Detail"
			component={Detail}
			options={({ route }) => {
				const { entryId } = route.params
				const [ year, month, day ] = [
					entryId.slice(0, 4),
					entryId.slice(5, 7),
					entryId.slice(8),
				]
				return { title: `${month}/${day}/${year}` }
			}}
		/>
	</StackHistory.Navigator>
)

const navOptHandler = () => ({
	headerTintColor       : white,
	headerStyle           : { backgroundColor: purple },
	headerStatusBarHeight : 0,
	headerTitleAlign      : "center",
})

const App = () => (
	<Provider store={createStore(reducer)}>
		<SafeAreaProvider>
			<View style={{ flex: 1 }}>
				<StatusBar barStyle="light-content" backgroundColor={purple} />
				<NavigationContainer>
					<Tab.Navigator
						
						screenOptions={({ route }) => ({
							tabBarIcon : ({ focused, color, size }) => {
								let iconName

								if (route.name === "Entry") {
									iconName = focused
										? "plus-square"
										: "plus-square-o"
									return (
										<FontAwesome
											name={iconName}
											size={size}
											color={color}
										/>
									)
								} else if (route.name === "History") {
									iconName = focused
										? "ios-bookmarks"
										: "ios-bookmarks-outline"
									return (
										<Ionicons
											name={iconName}
											size={size}
											color={color}
										/>
									)
								} else if (route.name === "Live") {
									iconName = focused
										? "ios-speedometer"
										: "ios-speedometer-outline"
									return (
										<Ionicons
											name={iconName}
											size={size}
											color={color}
										/>
									)
								}
							},
						})}
						tabBarOptions={{
							activeTintColor   : purple,
							inactiveTintColor : gray,
						}}
					>
						<Tab.Screen name="Entry" component={EntryStack} />
						<Tab.Screen name="History" component={HistoryStack} />
						<Tab.Screen name="Live" component={Live}  />
					</Tab.Navigator>
				</NavigationContainer>
			</View>
		</SafeAreaProvider>
	</Provider>
)

export default App
