import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Exercise } from "~/types/workout";
import { Text } from "../ui/text";
import { Input } from "../ui/input";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../ui/button";
import CustomText from "../CustomTextQuicksand";
import { Image } from "expo-image";
import * as FileSystem from 'expo-file-system';
import { Picker } from '@react-native-picker/picker';
import { presetExercises } from "~/data/presetExercises";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Animated, { FadeIn } from "react-native-reanimated";

interface Props {
  exercise?: Exercise | null | undefined;
  onSubmit: (data: Omit<Exercise, "id">) => void;
  onCancel: () => void;
}

export default function ExerciseForm({ exercise, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(exercise?.name ?? "");
  const [sets, setSets] = useState(exercise?.sets ?? 3);
  const [reps, setReps] = useState(exercise?.reps ?? 12);
  const [weight, setWeight] = useState(exercise?.weight ?? 0);
  const [notes, setNotes] = useState(exercise?.notes ?? "");
  const [image, setImage] = useState<string | null>(exercise?.gifUrl ?? null);



  const handlePickGif = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      quality: 1,
    });
    if (result.assets && result.assets[0]) {
      const sourceUri = result.assets[0].uri;
      const fileName = sourceUri.split('/').pop();
      const destPath = FileSystem.documentDirectory + 'gifs/' + fileName;


    // Cria a pasta se não existir
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'gifs/', { intermediates: true });

    // Copia o arquivo para a pasta persistente
    await FileSystem.copyAsync({ from: sourceUri, to: destPath });

    // Salve destPath no exercício
    setImage(destPath);
  }
};

const grouped = presetExercises.reduce((acc, ex) => {
  if (!acc[ex.category]) acc[ex.category] = [];
  acc[ex.category].push(ex);
  return acc;
}, {} as Record<string, typeof presetExercises>);


  const handleSubmit = () => {
    onSubmit({
      name,
      sets,
      reps,
      weight,
      notes,
      gifUrl: image || exercise?.gifUrl,
    });
  };

  return (
    <ScrollView className="p-4 bg-white dark:bg-gray-800 text-white">
      <View className="mb-4" style={{ flexDirection: "column", alignItems: "center", gap: 2, justifyContent: "space-between" }}>
        <Text className="text-sm font-medium text-gray-700 mb-2 dark:text-white">
          GIF do Exercício
        </Text>
        <TouchableOpacity onPress={handlePickGif} className="mb-2">
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
              className="rounded-md"
            />
          ) : (
            <Button variant="outline" className="w-full" onPress={handlePickGif}>
              <CustomText className="text-gray-700">Escolher GIF</CustomText>
            </Button>
          )}
        </TouchableOpacity>
        {image && (
          <TouchableOpacity onPress={() => setImage(null)} className="mt-2">
            <Text className="text-red-500">Remover GIF</Text>
          </TouchableOpacity>
        )}
      </View>

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant='outline'>
      <Text>
        {name ? name : "Selecione um exercício pré-definido"}
      </Text>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className='w-64 native:w-72'>
    <DropdownMenuLabel>Categorias de Exercícios</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
       {/* Opção para limpar seleção */}
      <DropdownMenuItem
        onPress={() => {
          setName("");
          setSets(3);
          setReps(12);
          setWeight(0);
          setNotes("");
          setImage(null);
        }}
      >
        <Text style={{ color: "#888" }}>Nenhum (limpar seleção)</Text>
      </DropdownMenuItem>
      {Object.entries(grouped).map(([category, exercises]) => (
        <DropdownMenuSub key={category}>
          <DropdownMenuSubTrigger>
            <Text>{category}</Text>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <Animated.View entering={FadeIn.duration(200)}>
              {exercises.map((item) => (
                <DropdownMenuItem
                  key={item.name}
                  onPress={() => {
                    setName(item.name);
                    setSets(item.sets);
                    setReps(item.reps);
                    setWeight(item.weight);
                    setNotes(item.notes || "");
                    setImage(item.gifUrl || null);
                  }}
                >
                  <Text>{item.name}</Text>
                </DropdownMenuItem>
              ))}
            </Animated.View>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      ))}
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>

      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2 dark:text-white">
          Nome do Exercício
        </Text>
        <Input
          className="border border-gray-300 rounded-md p-2 text-base dark:text-white"
          value={name}
          onChangeText={setName}
          placeholder="Digite o nome do exercício"
        />
      </View>

      <View className="flex flex-row justify-between mb-4">
        <View className="flex-1 mr-2">
          <Text className="text-sm font-medium text-gray-700 mb-2 dark:text-white">
            Séries
          </Text>
          <Input
            className="border border-gray-300 rounded-md p-2 text-base dark:text-white"
            value={String(sets)}
            onChangeText={(text) => setSets(Number(text))}
            keyboardType="numeric"
          />
        </View>

        <View className="flex-1 mx-2">
          <Text className="text-sm font-medium text-gray-700 mb-2 dark:text-white">
            Repetições
          </Text>
          <Input
            className="border border-gray-300 rounded-md p-2 text-base dark:text-white"
            value={String(reps)}
            onChangeText={(text) => setReps(Number(text))}
            keyboardType="numeric"
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-sm font-medium text-gray-700 mb-2 dark:text-white">
            Peso (kg)
          </Text>
          <Input
            className="border border-gray-300 rounded-md p-2 text-base dark:text-white"
            value={String(weight)}
            onChangeText={(text) => setWeight(Number(text))}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2 dark:text-white">
          Observações
        </Text>
        <Input
          className="border border-gray-300 rounded-md p-2 text-base dark:text-white"
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
            {exercise ? "Atualizar" : "Criar"} Exercício
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
