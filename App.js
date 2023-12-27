import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	StatusBar
} from "react-native";
import { getusers } from "./src/services/api";
import UsersList from "./src/Screens/users/UsersList";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigations/StackNavigator";

export default function App() {
	return (
		<>
		<NavigationContainer>
			<StackNavigator />
		</NavigationContainer>
			{/* <StatusBar />
			<UsersList /> */}
		</>
	);
}

const styles = StyleSheet.create({});
