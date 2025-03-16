import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, Modal } from "react-native";
import { Plus } from "~/lib/icons/Plus";
import { Exercise } from "../types/workout";
import { Checkbox } from "./ui/checkbox";

import { MaterialIcons } from "@expo/vector-icons";
import { SheetsContext } from "~/contexts/context";
import { SheetsContextType } from "~/contexts/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import ExerciseForm from "./forms/ExerciseForm";
import { Card, CardContent, CardHeader } from "./ui/card";
import { showMessage } from "react-native-flash-message";
import CustomTextRoboto from "./CustomTextRoboto";
import CustomText from "./CustomTextQuicksand";

interface Props {
  exercises: Exercise[];
  onAdd: () => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
  onToggleCompletion: (id: string) => void;
  onReorder: (newExercises: Exercise[]) => void;
  handleToggleCompletion: (id: string, completed: boolean) => void;
}

export default function ExerciseList({
  exercises,
  onAdd,
  onEdit,
  onDelete,
  onToggleCompletion,
  onReorder,
  handleToggleCompletion
}: Props) {

  const [newExercises, setNewExercises] = useState<Exercise[]>(exercises);

  useEffect(() => {
    setNewExercises(exercises);
  }, [exercises]);

  const moveUp = (index: number) => {
    if (index <= 0) {
      showMessage({
        message: 'Aviso',
        description: 'O exercício já está na primeira posição.',
        type: 'info',
        icon: 'info',
        duration: 3000,
      })
      return;
    }

    const updatedExercises = [...newExercises];
    [updatedExercises[index], updatedExercises[index - 1]] = [updatedExercises[index - 1], updatedExercises[index]];
    setNewExercises(updatedExercises);
    onReorder(updatedExercises);
  };

  const moveDown = (index: number) => {
    if (index >= newExercises.length - 1) {
      showMessage({
        message: 'Aviso',
        description: 'O exercício já está na última posição.',
        type: 'info',
        icon: 'info',
        duration: 3000,
      })
      return;
    }

    const updatedExercises = [...newExercises];
    [updatedExercises[index], updatedExercises[index + 1]] = [updatedExercises[index + 1], updatedExercises[index]];
    setNewExercises(updatedExercises);
    onReorder(updatedExercises);
  };

  const renderExercise = ({ item, index }: { item: Exercise, index: number }) => (
    <Card className="py-4 mb-4">
      <CardContent className="flex-row justify-between items-start">
      <View className="flex-1">
          <TouchableOpacity
             onPress={() => handleToggleCompletion(item.id, item.completed || false)}
            className="flex-row items-center mb-2"
          >
            <Checkbox
              checked={item.completed || false}
              onCheckedChange={() => handleToggleCompletion(item.id, item.completed || false)}
            />
            <CustomTextRoboto
              className={`ml-2 text-lg font-semibold w-32 ${
                item.completed ? "text-gray-400 line-through" : "text-gray-800 dark:text-white"
              }`}
            >
              {item.name}
            </CustomTextRoboto>
          </TouchableOpacity>

          <View className="grid grid-cols-3 gap-2">
            <CustomText className="text-sm text-gray-600">
              <CustomText className="font-medium">Séries:</CustomText> {item.sets}
            </CustomText>
            <CustomText className="text-sm text-gray-600">
              <CustomText className="font-medium">Repetições:</CustomText> {item.reps}
            </CustomText>
            <CustomText className="text-sm text-gray-600">
              <CustomText className="font-medium">Peso:</CustomText> {item.weight}kg
            </CustomText>
          </View>

          {item.notes && (
            <CustomText className="mt-2 text-sm text-gray-500">{item.notes}</CustomText>
          )}
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => onEdit(item)}
            className="p-2 rounded-full bg-gray-200"
          >
            <MaterialIcons name="edit" size={20} color="#3ad625" />
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
            <CustomText>
              <MaterialIcons name="delete" size={20} color="#EF4444" />
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => moveUp(index)}
            className="p-2 rounded-full bg-gray-200"
          >
            <MaterialIcons name="arrow-upward" size={20} color="#464A45FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => moveDown(index)}
            className="p-2 rounded-full bg-gray-200"
          >
            <MaterialIcons name="arrow-downward" size={20} color="#464A45FF" />
          </TouchableOpacity>
        </View>

      </CardContent>
    </Card>
  );

  const {
    isExerciseModalOpen,
    setIsExerciseModalOpen,
    editingExercise,
    setEditingExercise,
    handleAddExercise,
    handleEditExercise,
  } = useContext(SheetsContext) as SheetsContextType;

  const HeaderList = () => {

    return (
      <View className="flex justify-between mb-4">
      <CustomTextRoboto className="text-2xl text-gray-900 dark:text-white mb-3">Exercícios</CustomTextRoboto>
      <Dialog
        open={isExerciseModalOpen}
        onOpenChange={setIsExerciseModalOpen}
      >
        <DialogTrigger asChild>
          <Button className="flex flex-row gap-2 bg-indigo-600 rounded-lg">
          <Plus size={20} color="white" />
          <CustomText className="text-white font-medium">Novo Exercício</CustomText>
          </Button>
        </DialogTrigger>
        <DialogContent className="h-auto w-96 dark:bg-gray-800">
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
    )
  }

  return (
    <View className="p-4">
     {exercises.length === 0 && (
      <HeaderList />
     )}

      {exercises.length > 0 && (
        <FlatList
          className="space-y-4"
          data={newExercises}
          keyExtractor={(item) => item.id}
          renderItem={renderExercise}
          keyboardShouldPersistTaps="handled" 
          contentContainerStyle={{ paddingBottom: 10 }}
          ListHeaderComponent={() => <HeaderList />}
          ListEmptyComponent={() => (
            <View className="py-6">
              <CustomText className="text-center text-gray-500 dark:text-white">
                Nenhum exercício cadastrado neste plano.
              </CustomText>
            </View>
          )}
        />
      )}


    </View>
  );
}
