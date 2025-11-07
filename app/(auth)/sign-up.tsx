import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { createUser } from '@/lib/appwrite';

const SignUp = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [form, setForm] = useState({name: '', email:'', password: ''});

  const submit = async () => {
    const {email, password, name} = form;
    if(!name || !email || !password ) return Alert.alert('Error', 'Please enter valid Name or Email/Password');

    setIsSubmiting(true);

    try {
      await createUser({email, password, name})

      Alert.alert('success', 'User Sign Up Succesfully')
      router.replace('/');

    } catch (error:any) {
      console.log(error)
      Alert.alert('error', error.message)
    } finally {
      setIsSubmiting(false)
    }
  }

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your Full Name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({...prev, name: text}))}
        label="Full name"
      />

      <CustomInput
        placeholder="Enter your Email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
        label="Email"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter your Password"
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
        label="Password"
        secureTextEntry={true}
      />

      <CustomButton title="Sign Up" isLoading={isSubmiting} onPress={submit}/>

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/(auth)/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
}

export default SignUp