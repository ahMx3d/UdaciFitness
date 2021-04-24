import React from "react"
import { View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { combineReducers, createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./reducers"
import Entry from "./components/Entry"

const App = () => (
	<Provider store={createStore(reducer)}>
		<SafeAreaProvider>
			<View style={{ flex: 1 }}>
				<Entry />
			</View>
		</SafeAreaProvider>
	</Provider>
)

export default App
