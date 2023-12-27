import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	StyleSheet
} from "react-native";
import sockethelp from "../../utils/sockethelp";
import UserContainer from "../../components/UserContainer/UserContainer";
import { getConversation, getMessages, newMessage } from "../../services/api";

function ChatScreen({ route }) {
	const { userData, myId } = route?.params;
	const [msg, setMessage] = useState("");
  const [convesationMsg,setConversationMsg]=useState([])
	const [data, setData] = useState([]);
  const [conversation,setConversation]=useState({})

	useEffect(() => {
		const getConversationDetails = async () => {
			let data = await getConversation({
				senderId: myId?._id,
				reveiverId: userData?._id,
			});
      // console.log(data,"GET CCONVERRSATIONDATA===>")
      setConversation(data)
		};
		getConversationDetails();
	}, [userData?._id]);


  //get msgs api
  useEffect(() => {
    const getMessageDetails=async ()=>{
      let data=await getMessages(conversation?._id)
      setConversationMsg(data)
      // console.log(data,"====================================================>")
    }
    getMessageDetails()
  }, [conversation,msg])
  

	// useEffect(() => {
	// 	sockethelp.initlizeSocket();

	// 	sockethelp.on("received_message", (msg) => {
	// 		setData((prevData) => [...prevData, msg]);
	// 	});
	// }, []);

	const sendMessage = async() => {
		// sockethelp.emit("send_message", message);
		// setData(message,...message);
		let message = {
			senderId: myId?._id,
			receiverId: userData?._id,
			conversationId:conversation?._id,
      type:"text",
      text:msg

		};
 let res= await newMessage(message)
 console.log(res,"SND MSG SUCESSFULLy");
  setMessage("")
	};

	const renderMessage = ({ item }) => {
    console.log(item,"FLAT LIST RENDER ITEM")
    return(
      <>
		<View style={styles.messageContainer}>
			<Text style={styles.messageText}>{item?.text}</Text>
		</View>
    </>
    )
	};

	return (
		<View style={styles.container}>
			<View>
				<UserContainer
					extraStyle={{
						padding: 15,
						borderBottomWidth: 0.3
					}}
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
				<TextInput
					value={msg}
					placeholder="Enter your message"
					style={styles.inputStyle}
					onChangeText={(txt) => setMessage(txt)}
				/>
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
