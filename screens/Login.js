import { View, Text } from 'react-native'
import React from 'react'
import { useUserContext } from '../context/user_context'

export default function Login() {
    const {email, password} = useUserContext();
  return (
    <View>
      <Text>email is : {email}</Text>
      <Text>password is : {password}</Text>
    </View>
  )
}