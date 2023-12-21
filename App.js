import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
	Button,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";

// import socketServices from "./src/utils/socketService";

export default function App() {
  const [message,setMessage]=useState("")
  const [data,setData]=useState([])

  // useEffect(() => {
    
  // socketServices.initlizeSocket()
  // }, [])
  
	return (
    <>
			<View style={styles.container}>
        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <View style={{ flex: 0.7,backgroundColor:"red" }}>
						<TextInput
            value={message}
							placeholder="Enteer you message"
							style={styles.inputStyle}
              onChangeText={(txt)=>setMessage(txt)}
						/>
					</View>
          <TouchableOpacity style={{ flex: 0.2,backgroundColor:"red",alignItems:"center",borderColor:"black",borderWidth:1,justifyContent:"center" }}>
						<Text>Send</Text>
					</TouchableOpacity>
        </View>
				{/* <View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
            backgroundColor:"red"
					}}
				>
					<View style={{ flex: 0.8,backgroundColor:"red" }}>
						<TextInput
							placeholder="Enteer you message"
							style={styles.inputStyle}
						/>
					</View>
					<View style={{ flex: 0.2 ,backgroundColor:"blue"}}>
						<Text>Send</Text>
					</View>
				</View> */}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
    backgroundColor:"red"
	},
	inputStyle: {
		height: 42,
		borderWidth: 1,
		borderRadius: 6,
    paddingHorizontal:8
	}
});
