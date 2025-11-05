import { router } from 'expo-router'
import { Button, Text, View } from 'react-native'

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
       <Button title='Sign Up' onPress={() => router.push('/(auth)/sign-in')}/>
    </View>
  )
}

export default SignUp