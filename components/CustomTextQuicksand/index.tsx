import React from 'react';
import {  TextProps, StyleSheet } from 'react-native';
import { useFonts, Quicksand_400Regular, Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';
import { Text } from '../ui/text';

const CustomText: React.FC<TextProps> = ({ style, ...props }) => {
  const [fontsLoaded] = useFonts({
    Quicksand_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Text style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Quicksand_600SemiBold',
  },
});

export default CustomText;