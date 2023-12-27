import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const UserContainer = ({ name ,onPress,extraStyle}) => {
	return (
		<>
			<TouchableOpacity onPress={onPress} style={[style.container,extraStyle]}>
				<View style={style.nameContainer}>
					<Text>A</Text>
				</View>
				<View style={style.nameMsg}>
					<Text>{name}</Text>
					<Text>kia hal ha</Text>
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
    left:20
  }
});

export default UserContainer;
