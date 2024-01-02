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
	Image
} from "react-native";
import sockethelp from "../../utils/sockethelp";
import UserContainer from "../../components/UserContainer/UserContainer";
import {
	getConversation,
	getMessages,
	newMessage,
	uploadFile,
	url
} from "../../services/api";
import * as DocumentPicker from "expo-document-picker";
import { Socket } from "socket.io-client";

function ChatScreen({ route }) {
	const { userData, myId,activeUsers } = route?.params;
	const [msg, setMessage] = useState("");
	const [convesationMsg, setConversationMsg] = useState([]);
	const [data, setData] = useState([]);
	const [conversation, setConversation] = useState({});
	const [pickedDocument, setPickedDocument] = useState(null);
	const [docImg, setDocImg] = useState("");



	

	useEffect(() => {
		const getConversationDetails = async () => {
			let data = await getConversation({
				senderId: myId?._id,
				reveiverId: userData?._id
			});

			setConversation(data);
		};
		getConversationDetails();
	}, [userData?._id]);

	const getFile = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync();
			// console.log(result,"Altaf Document picking ");
			setMessage(result?.assets[0]?.name);
			setDocImg(result?.assets[0].uri);
			setPickedDocument(result?.assets[0]);
			// if (result.type === 'success') {
			//   setPickedDocument(result);
			//   console.log(result,"Document picking ");
			// } else {
			//   console.log('Document picking cancelled');
			// }
		} catch (err) {
			console.error("Error picking document", err);
		}
	};

	useEffect(() => {
		const getMessageDetails = async () => {
			let data = await getMessages(conversation?._id);
			setConversationMsg(data);
		};
		getMessageDetails();
	}, [conversation, msg]);

	const uploadImage = async () => {
		var formdata = new FormData();
		formdata.append("file", pickedDocument);
		formdata.append("name", pickedDocument?.name);

		var requestOptions = {
			method: "POST",
			body: formdata,
			redirect: "follow"
		};

		try {
			const response = await fetch(
				"http://192.168.1.106:8000/file/upload",
				requestOptions
			);
			const result = await response.text();
			console.log(result);
		} catch (error) {
			console.log("error", error);
		}
	};

	const sendMessage = async () => {
		// sockethelp.emit("send_message", message);
		// setData(message,...message);
		let message = {};
		message = {
			senderId: myId?._id,
			receiverId: userData?._id,
			conversationId: conversation?._id,
			type: "text",
			text: msg
		};
		// if (!file) {
		// 	message = {
		// 		senderId: myId?._id,
		// 		receiverId: userData?._id,
		// 		conversationId: conversation?._id,
		// 		type: "text",
		// 		text: msg
		// 	};
		// } else {
		// 	message = {
		// 		senderId: myId?._id,
		// 		receiverId: userData?._id,
		// 		conversationId: conversation?._id,
		// 		type: "file",
		// 		text: image
		// 	};
		// }
		let res = await newMessage(message);
		console.log(res, "SND MSG SUCESSFULLy");
		setMessage("");
	};

	const renderMessage = ({ item }) => {
		// console.log(item, "FLAT LIST RENDER ITEM");
		return (
			<>
				{myId?._id == item?.senderId ? (
					<>
						<View style={styles.senderMessageContainer}>
							<Text style={styles.messageText}>{item?.text}</Text>
						</View>
					</>
				) : (
					<View style={styles.recevirrMessageContainer}>
						<Text style={styles.messageText}>{item?.text}</Text>
					</View>
				)}
			</>
		);
	};

	return (
		<View style={styles.container}>
			<View>
				<UserContainer
					extraStyle={{
						padding: 15,
						borderBottomWidth: 0.3
					}}
					status={activeUsers.some(item => item[0].userName === userData?.userName)?"online":"offline"}
					key={Math.random() * 1000}
					name={userData?.userName + "   " + userData?._id}
				/>
			</View>
			<FlatList
				data={convesationMsg}
				renderItem={renderMessage}
				keyExtractor={(item, index) => index.toString()}
				contentContainerStyle={styles.messagesContainer}
			/>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.inputContainer}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<TouchableOpacity
						onPress={() => getFile()}
						style={{
							height: 30,
							width: 30,
							backgroundColor: "gray",
							borderRadius: 30,
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<Text>A</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => uploadImage()}
						style={{
							height: 30,
							width: 30,
							backgroundColor: "gray",
							borderRadius: 30,
							justifyContent: "center",
							alignItems: "center",
							marginHorizontal: 10
						}}
					>
						<Text>I</Text>
					</TouchableOpacity>
				</View>
				<TextInput
					value={msg}
					placeholder="Enter your message"
					style={styles.inputStyle}
					onChangeText={(txt) => setMessage(txt)}
				/>
				{docImg && (
					<Image
						style={{ height: 10, width: 10, resizeMode: "contain" }}
						source={{ uri: docImg }}
					/>
				)}
				<TouchableOpacity
					onPress={sendMessage}
					style={styles.sendButton}
				>
					<Text style={styles.sendButtonText}>Send</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	messagesContainer: {
		padding: 16
	},
	senderMessageContainer: {
		backgroundColor: "#e0e0e0",
		padding: 8,
		borderRadius: 8,
		marginBottom: 8,
		maxWidth: "50%"

		// alignSelf: "flex-end"
	},
	recevirrMessageContainer: {
		backgroundColor: "red",
		padding: 8,
		borderRadius: 8,
		marginBottom: 8,
		maxWidth: "80%",
		alignSelf: "flex-end"
	},
	messageContainer: {
		backgroundColor: "#e0e0e0",
		padding: 8,
		borderRadius: 8,
		marginBottom: 8,
		maxWidth: "80%",
		alignSelf: "flex-end"
	},
	messageText: {
		fontSize: 16
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8
	},
	inputStyle: {
		flex: 1,
		height: 40,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 8,
		marginRight: 8
	},
	sendButton: {
		backgroundColor: "#4CAF50",
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 16,
		alignItems: "center"
	},
	sendButtonText: {
		color: "#fff",
		fontSize: 16
	}
});
