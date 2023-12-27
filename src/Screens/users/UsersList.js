import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { getusers, setConversation } from "../../services/api";
import UserContainer from "../../components/UserContainer/UserContainer";

const UsersList = ({ navigation, route }) => {
	const { account, myId } = route?.params;
	const [users, setUsers] = useState(account);

	const setConversations = async (senderId, reveiverId) => {
		let response = await setConversation({
			senderId: senderId,
			reveiverId: reveiverId
		});
		console.log(response, "set Converation log===========>");
	};

	return (
		<>
			<View style={styles.container}>
				<View>
					<TextInput
						placeholder="Search user here"
						style={styles.txtInput}
					/>
				</View>
				<ScrollView showsVerticalScrollIndicator={false}>
					{users.map((data, index) => {
						return (
							<>
								<UserContainer
									onPress={() => {
										setConversations(myId?._id, data?._id),
											navigation.navigate("ChatScreen", {
												userData: data,
												myId: myId
											});
									}}
									key={Math.random() * 1000}
									name={data?.userName}
								/>
							</>
						);
					})}
				</ScrollView>
			</View>
		</>
	);
};

export default UsersList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		margin: 10
	},
	txtInput: {
		borderWidth: 1,
		borderRadius: 10,
		padding: 10
	}
});
