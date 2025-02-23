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

interface Props {
  exercises: Exercise[];
  onAdd: () => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
  onToggleCompletion: (id: string) => void;
  onReorder: (newExercises: Exercise[]) => void;
}

export default function ExerciseList({
  exercises,
  onAdd,
  onEdit,
  onDelete,
  onToggleCompletion,
  onReorder,
}: Props) {

  const [newExercises, setNewExercises] = useState<Exercise[]>(exercises);
  const [isRestModalVisible, setIsRestModalVisible] = useState(false);
  const [restTime, setRestTime] = useState(60);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setNewExercises(exercises);
  }, [exercises]);

  const startRestTimer = () => {
    setIsRestModalVisible(true);
    setRestTime(60);
    const interval = setInterval(() => {
      setRestTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsRestModalVisible(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimer(interval);
  };

  const handleToggleCompletion = (id: string, completed: boolean) => {
    onToggleCompletion(id);
    if (!completed) {
      startRestTimer();
    }
  };

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
            <Text
              className={`ml-2 text-lg font-semibold w-32 ${
                item.completed ? "text-gray-400 line-through" : "text-gray-800 dark:text-white"
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
            <Text>
              <MaterialIcons name="delete" size={20} color="#EF4444" />
            </Text>
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
      <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">Exercícios</Text>
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
              <Text className="text-center text-gray-500 dark:text-white">
                Nenhum exercício cadastrado neste plano.
              </Text>
            </View>
          )}
        />
      )}

<Modal
        visible={isRestModalVisible}
        transparent={true}
        animationType="slide"
        className="flex-1 justify-center items-center bg-black/80"
      >
        <View className="flex-1 justify-center items-center bg-black/80">
          <View className="bg-white p-6 rounded-lg w-[50%]">
            <Text className="text-xl font-bold mb-4">Tempo de Descanso</Text>
            <Text className="text-2xl font-bold mb-4">{restTime} segundos</Text>
            <View className="flex-row justify-between">
              <Button
              className="bg-red-500"
              onPress={() => setRestTime((prev) => Math.max(prev - 5, 0))} >
                <Text>-5s</Text>
              </Button>
              <Button 
              className="bg-green-500"
              onPress={() => setRestTime((prev) => prev + 5)}>
                <Text>+5s</Text>
              </Button>
            </View>
            <Button 
            className="bg-gray-200 mt-4"
            onPress={() => {
              if (timer) clearInterval(timer);
              setIsRestModalVisible(false);
            }} >
              <Text>Cancelar</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}
