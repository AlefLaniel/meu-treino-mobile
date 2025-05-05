import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
  gifUrl?: string;
}

interface Props {
  exercise: Exercise;
  onClose: () => void;
}

const ExerciceModal = ({ exercise, onClose }: Props) => {
  return (
    <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
      <View className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12">
        <Text className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {exercise.name}
        </Text>
        {exercise.gifUrl && (
          <Image
            source={{ uri: exercise.gifUrl }}
            style={{ width: "100%", height: 200, marginBottom: 16, borderRadius: 10 }}
            contentFit="contain"
            autoplay
          />
        )}

        <Text className="text-base text-gray-700 dark:text-gray-300 mb-2">
          <Text className="font-medium">Séries:</Text> {exercise.sets}
        </Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-2">
          <Text className="font-medium">Repetições:</Text> {exercise.reps}
        </Text>
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-2">
          <Text className="font-medium">Peso:</Text> {exercise.weight} kg
        </Text>
        {exercise.notes && (
          <Text className="text-base text-gray-700 dark:text-gray-300 mb-4">
            <Text className="font-medium">Notas:</Text> {exercise.notes}
          </Text>
        )}
        <TouchableOpacity
          onPress={onClose}
          className="bg-indigo-600 py-2 px-4 rounded-md"
        >
          <Text className="text-white text-center font-medium">Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExerciceModal;
