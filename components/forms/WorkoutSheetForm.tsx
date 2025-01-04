import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { WorkoutSheet } from '~/types/workout';
import { Text } from '../ui/text';
import { Input } from '../ui/input';

interface Props {
  sheet?: WorkoutSheet | null | undefined;
  onSubmit: (data: Omit<WorkoutSheet, 'id' | 'plans' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function WorkoutSheetForm({ sheet, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(sheet?.name ?? '');
  const [description, setDescription] = useState(sheet?.description ?? '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('O nome da ficha é obrigatório.');
      return;
    }

    setError(null); // Limpa qualquer erro anterior
    onSubmit({ name, description });
  };

  return (
    <View className="p-4 bg-white dark:bg-gray-800 text-white">
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2 dark:text-white">Nome da Ficha</Text>
        <Input
          className={`border rounded-md p-2 text-base dark:text-white ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setError(null); // Limpa o erro ao digitar
          }}
          placeholder="Digite o nome da ficha"
          aria-labelledby="Nome da Ficha"
          aria-errormessage={error || ''}
        />
        {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
      </View>

      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2 dark:text-white">Descrição</Text>
        <Input
          className="border rounded-md p-2 text-base dark:text-white border-gray-300"
          value={description}
          onChangeText={setDescription}
          placeholder="Adicione uma descrição (opcional)"
          multiline
          numberOfLines={3}
          aria-labelledby="Descrição"
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
          <Text className="text-white">{sheet ? 'Atualizar' : 'Criar'} Ficha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
