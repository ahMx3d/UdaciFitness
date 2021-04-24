import React from "react"
import { View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
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
import Detail from './components/Detail'

const Tab = createBottomTabNavigator()

const App = () => (
	<Provider store={createStore(reducer)}>
		<SafeAreaProvider>
			<NavigationContainer>
				<View style={{ flex: 1 }}>
					<StatusBar
						barStyle="light-content"
						backgroundColor={purple}
					/>
					<Tab.Navigator
						screenOptions={({ route }) => ({
							tabBarIcon : ({ focused, color, size }) => {
								let iconName

								if (route.name === "Add Entry") {
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
								}
							},
						})}
						tabBarOptions={{
							activeTintColor   : purple,
							inactiveTintColor : gray,
						}}
					>
						<Tab.Screen name="Add Entry" component={Entry} />
						<Tab.Screen name="History" component={History} />
					</Tab.Navigator>
				</View>
			</NavigationContainer>
		</SafeAreaProvider>
	</Provider>
)

export default App
