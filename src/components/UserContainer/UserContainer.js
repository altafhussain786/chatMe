import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const UserContainer = ({ name ,onPress,extraStyle,status}) => {
	return (
		<>
			<TouchableOpacity onPress={onPress} style={[style.container,extraStyle]}>
				<View style={style.nameContainer}>
					<Text>A</Text>
				</View>
				<View style={style.nameMsg}>
					<Text>{name}</Text>
					{/* <Text>kia hal ha</Text> */}
				{/* {status &&	<View style={{height:10,width:10,backgroundColor:status =="online" ?"green": "lightgray",borderRadius:30}} />} */}
					{status && <Text style={{color:status=="online" ?"green": "lightgray",fontWeight:"bold"}}>{status}</Text>}

				</View>
			</TouchableOpacity>
		</>
	);
};

const style = StyleSheet.create({
	container: {
    padding: 25,
    borderBottomWidth: 0.5,
flexDirection:"row",
alignItems:"center",
	},
  nameContainer:{
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"gray",padding:10,
    height:50,width:50,
    borderRadius:30
  },
  nameMsg:{
	// alignItems:"center",
	// justifyContent:"space-between",
	// flexDirection:"row",
    left:20
  }
});

export default UserContainer;
