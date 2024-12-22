import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function ModalComponent({ isOpen, onClose, title, children }: Props) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isOpen}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className='flex-1 bg-black bg-opacity-25' />
      </TouchableWithoutFeedback>
      
      <View className='flex-1 justify-center items-center p-4'>
        <View className='shadow-xl bg-white rounded-lg max-w-md w-full'>
          <View className='flex-row justify-between items-center p-4 border-b'>
            <Text className='text-lg font-semibold text-gray-900'>{title}</Text>
            <TouchableOpacity onPress={onClose} className='p-2'>
             <MaterialIcons name="close" size={20} color="#4A5568" />
            </TouchableOpacity>
          </View>
          <View className='p-4'>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
}
