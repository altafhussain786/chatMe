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
import sockethelp from "../../utils/sockethelp";
import { io } from "socket.io-client";
import { socket } from "../../utils";

const UsersList = ({ navigation, route }) => {
	const { account, myId } = route?.params;
	const [users, setUsers] = useState(account);
	const [activeUsers, setActiveUsers] = useState([]);


	const setConversations = async (senderId, reveiverId) => {
		let response = await setConversation({
			senderId: senderId,
			reveiverId: reveiverId
		});
		console.log(response, "set Converation log===========>");
	};

	useEffect(() => {
		const filteredArray = account.filter(user => user?._id == myId?._id);
		console.log(filteredArray,"=====>===========>SOCCKET ");
		// console.log(filteredArray,"=====>filteredArray ");

		socket.emit("addUsers",filteredArray);
		socket.on("getUsers",usersData =>{
			console.log("FRONT END USER LIST",usersData);
			setActiveUsers(usersData)

			// console.log(usersData,"FRONT END SIDE");
		})
		
	  }, [socket]);

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
								{data?._id !==myId?._id ?<UserContainer
									onPress={() => {
										setConversations(myId?._id, data?._id),
											navigation.navigate("ChatScreen", {
												userData: data,
												myId: myId,
												activeUsers:activeUsers
											});
									}}
									key={Math.random() * 1000}
									name={data?.userName}
								/> :null}
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
