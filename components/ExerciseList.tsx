import React, { useContext } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { Plus } from "~/lib/icons/Plus";
import { Exercise } from "../types/workout";
import { Checkbox } from "./ui/checkbox";

import { MaterialIcons } from "@expo/vector-icons";
import { SheetsContext } from "~/contexts/context";
import { SheetsContextType } from "~/contexts/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import ExerciseForm from "./forms/ExerciseForm";

interface Props {
  exercises: Exercise[];
  onAdd: () => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
  onToggleCompletion: (id: string) => void;
}

export default function ExerciseList({
  exercises,
  onAdd,
  onEdit,
  onDelete,
  onToggleCompletion,
}: Props) {
  const renderExercise = ({ item }: { item: Exercise }) => (
    <View className="shadow-sm p-4 bg-white rounded-lg mb-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <TouchableOpacity
            onPress={() => onToggleCompletion(item.id)}
            className="flex-row items-center mb-2"
          >
            <Checkbox
              checked={item.completed || false}
              onCheckedChange={() => onToggleCompletion(item.id)}
            />
            <Text
              className={`ml-2 text-lg font-semibold ${
                item.completed ? "text-gray-400 line-through" : "text-gray-800"
              }`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>

          <View className="grid grid-cols-3 gap-2">
            <Text className="text-sm text-gray-600">
              <Text className="font-medium">Séries:</Text> {item.sets}
            </Text>
            <Text className="text-sm text-gray-600">
              <Text className="font-medium">Repetições:</Text> {item.reps}
            </Text>
            <Text className="text-sm text-gray-600">
              <Text className="font-medium">Peso:</Text> {item.weight}kg
            </Text>
          </View>

          {item.notes && (
            <Text className="mt-2 text-sm text-gray-500">{item.notes}</Text>
          )}
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => onEdit(item)}
            className="p-2 rounded-full bg-gray-200"
          >
            <MaterialIcons name="edit" size={20} color="#4F46E5" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Deletar Exercício",
                "Tem certeza que deseja deletar este exercício?",
                [
                  { text: "Cancelar", style: "cancel" },
                  {
                    text: "Deletar",
                    onPress: () => onDelete(item.id),
                    style: "destructive",
                  },
                ]
              );
            }}
            className="p-2 rounded-full bg-gray-200"
          >
            <Text>
              <MaterialIcons name="delete" size={20} color="#EF4444" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const {
    isExerciseModalOpen,
    setIsExerciseModalOpen,
    editingExercise,
    setEditingExercise,
    handleAddExercise,
    handleEditExercise,
  } = useContext(SheetsContext) as SheetsContextType;

  return (
    <View className="p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">Exercícios</Text>
        <Dialog
          open={isExerciseModalOpen}
          onOpenChange={setIsExerciseModalOpen}
        >
          <DialogTrigger asChild>
            <Button className="flex flex-row gap-2 bg-indigo-600 rounded-lg">
            <Plus size={20} color="white" />
            <Text className="text-white font-medium">Novo Exercício</Text>
            </Button>
          </DialogTrigger>
          <DialogContent className="h-auto w-96">
            <DialogHeader>
              <DialogTitle>{editingExercise ? "Editar Exercício" : "Novo Exercício"}</DialogTitle>
            </DialogHeader>
            <ExerciseForm
              exercise={editingExercise}
              onSubmit={editingExercise ? (data) => handleEditExercise({ ...editingExercise, ...data }) : handleAddExercise}
              onCancel={() => {
                setIsExerciseModalOpen(false);
                setEditingExercise(null);
              }}
              />
          </DialogContent>
        </Dialog>
      </View>

      {exercises.length > 0 ? (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={renderExercise}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View className="py-6">
          <Text className="text-center text-gray-500">
            Nenhum exercício cadastrado neste plano.
          </Text>
        </View>
      )}
    </View>
  );
}
