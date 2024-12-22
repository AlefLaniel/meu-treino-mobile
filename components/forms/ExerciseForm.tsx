import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Exercise } from '~/types/workout';
import { Text } from '../ui/text';
import { Input } from '../ui/input';

interface Props {
  exercise?: Exercise | null | undefined;
  onSubmit: (data: Omit<Exercise, 'id'>) => void;
  onCancel: () => void;
}

export default function ExerciseForm({ exercise, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(exercise?.name ?? '');
  const [sets, setSets] = useState(exercise?.sets ?? 3);
  const [reps, setReps] = useState(exercise?.reps ?? 12);
  const [weight, setWeight] = useState(exercise?.weight ?? 0);
  const [notes, setNotes] = useState(exercise?.notes ?? '');

  const handleSubmit = () => {
    onSubmit({ name, sets, reps, weight, notes });
  };

  return (
    <ScrollView className="p-4 bg-white">
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Nome do Exercício</Text>
        <Input
          className="border border-gray-300 rounded-md p-2 text-base"
          value={name}
          onChangeText={setName}
          placeholder="Digite o nome do exercício"
        />
      </View>

      <View className="flex flex-row justify-between mb-4">
        <View className="flex-1 mr-2">
          <Text className="text-sm font-medium text-gray-700 mb-2">Séries</Text>
          <Input
            className="border border-gray-300 rounded-md p-2 text-base"
            value={String(sets)}
            onChangeText={(text) => setSets(Number(text))}
            keyboardType="numeric"
          />
        </View>

        <View className="flex-1 mx-2">
          <Text className="text-sm font-medium text-gray-700 mb-2">Repetições</Text>
          <Input
            className="border border-gray-300 rounded-md p-2 text-base"
            value={String(reps)}
            onChangeText={(text) => setReps(Number(text))}
            keyboardType="numeric"
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-sm font-medium text-gray-700 mb-2">Peso (kg)</Text>
          <Input
            className="border border-gray-300 rounded-md p-2 text-base"
            value={String(weight)}
            onChangeText={(text) => setWeight(Number(text))}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Observações</Text>
        <Input
          className="border border-gray-300 rounded-md p-2 text-base"
          value={notes}
          onChangeText={setNotes}
          placeholder="Digite observações (opcional)"
          multiline
          numberOfLines={4}
        />
      </View>

      <View className="flex flex-row justify-end space-x-4 gap-2">
        <TouchableOpacity
          onPress={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
        >
          <Text className="text-gray-700">Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          className="px-4 py-2 bg-indigo-600 rounded-md"
        >
          <Text className="text-white">
            {exercise ? 'Atualizar' : 'Criar'} Exercício
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
