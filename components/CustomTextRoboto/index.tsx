import React from 'react';
import {  TextProps, StyleSheet } from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Text } from '../ui/text';

const CustomTextRoboto: React.FC<TextProps> = ({ style, ...props }) => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Text style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto_400Regular',
  },
});

export default CustomTextRoboto;