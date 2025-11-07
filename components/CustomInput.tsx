import cn from 'clsx';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const CustomInput = ({
  placeholder = 'Enter Text',
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = 'email-address',
}: CustomInputProps) => {

    const [isFocus, setIsFocus] = useState(false)

  return (
    <View className="w-full">
      <Text className="label">{label}</Text>

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholder={placeholder}
        placeholderTextColor='#888'
        className={cn('input', isFocus ? 'border-primary' : 'border-gray-300')}
      />
    </View>
  );
};

export default CustomInput;
