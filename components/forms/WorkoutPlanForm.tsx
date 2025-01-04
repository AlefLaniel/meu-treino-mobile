import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { WorkoutPlan } from '~/types/workout';
import { Text } from '../ui/text';
import { Input } from '../ui/input';

interface Props {
  plan?: WorkoutPlan | null | undefined;
  onSubmit: (data: Pick<WorkoutPlan, 'name'>) => void;
  onCancel: () => void;
  initialData?: string
}

export default function WorkoutPlanForm({ plan, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(plan?.name ?? '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('O nome do plano é obrigatório.');
      return;
    }

    setError(null); // Limpa qualquer erro anterior
    onSubmit({ name });
  };

  return (
    <View className="p-4 bg-white dark:bg-gray-800 text-white">
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2 text-white">Nome do Plano</Text>
        <Input
          className="border border-gray-300 rounded-md p-2 text-base dark:text-white"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setError(null); // Limpa o erro ao digitar
          }}
          placeholder="Digite o nome do plano"
          aria-labelledby='inputLabel'
          aria-errormessage={error || ''}
        />
        {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
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
          <Text className="text-white">{plan ? 'Atualizar' : 'Criar'} Plano</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
