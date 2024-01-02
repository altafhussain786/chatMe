import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { getusers } from '../../services/api';

const LoginScreen = ({navigation}) => {
  // const { setUserName } = useContext(AccountContext);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const[username,setUsername]=useState()
  const [password, setPassword] = useState('');

  const fetchData = async () => {
    try {
      // Assuming getusers is an asynchronous function that fetches user data
      let response = await getusers();

      setUsers(response);
      // setSelectedUserId(response)
    console.log(response);

      // For simplicity, I'm just selecting the first user. You may have a different logic.
      if (response.length > 0) {
        setSelectedUserId(response[0]._id);
        // setSelectedUserId(response)
        console.log(response[0]?._id);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleLogin = () => {
    // Perform your login logic here
    // For simplicity, let's assume the user is authenticated if a user is selected
    if (selectedUserId) {
      console.log(users,"LIIIGIG");
      const selectedUser = users.find((user) => user.userName === username );
      if(selectedUser){
			navigation.navigate("UsersList",{account:users,myId:selectedUser})
			console.log('Login successful');
		}
      else{
        console.log("Invalid");
      }
      // setUserName(selectedUser.username);
      // Add further logic for authentication if needed
      // For example, check the password, make an API call, etc.
      // console.log(selectedUser?._id,"altaf checking lgon");
      // navigation.navigate("UsersList",{account:users,myId:selectedUser})
      // console.log('Login successful');
    } else {
      console.log('No user selected');
      
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text>Username:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <Text>Password:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
