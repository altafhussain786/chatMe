import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ChatScreen from '../Screens/chatScreen/ChatScreen'
import UsersList from '../Screens/users/UsersList'
import LoginScreen from '../Screens/login/LoginScreen'

const StackNavigator = () => {
    const Stack=createStackNavigator()
  return (
  <>
  <StatusBar />
  {/* <Stack.Navigator screenOptions={{headerShown:false}}> */}
  <Stack.Navigator >
  <Stack.Screen options={{
    headerShown:false
  }} name='LoginScreen' component={LoginScreen}/>

    <Stack.Screen name='UsersList' component={UsersList}/>
    <Stack.Screen options={{
    headerShown:false
  }} name='ChatScreen' component={ChatScreen}/>

  </Stack.Navigator>
  </>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})