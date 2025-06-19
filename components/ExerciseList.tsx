import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, FlatList, Alert, Modal, useColorScheme, Image, ScrollView } from "react-native";
import { Plus } from "~/lib/icons/Plus";
import { Exercise } from "../types/workout";
import { Checkbox } from "./ui/checkbox";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { MaterialIcons } from "@expo/vector-icons";
import { SheetsContext } from "~/contexts/context";
import { SheetsContextType } from "~/contexts/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import ExerciseForm from "./forms/ExerciseForm";
import { Card, CardContent, CardHeader } from "./ui/card";
import CustomTextRoboto from "./CustomTextRoboto";
import CustomText from "./CustomTextQuicksand";
import ExerciceModal from "./modais/ExerciceModal";

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

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleOpenModal = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const handleCloseModal = () => {
    setSelectedExercise(null);
  };


  useEffect(() => {
    setNewExercises(exercises);
  }, [exercises]);

     const colorScheme = useColorScheme();
      const isDarkMode = colorScheme === "dark";
  

  const renderExercise = ({ item, drag, isActive }: RenderItemParams<Exercise>) => (
    <Card
      className={`py-4 mb-4 dark:border-gray-200 ${isActive ? "bg-gray-300" : "bg-white dark:bg-gray-800"}`}
      style={{
        opacity: isActive ? 0.8 : 1,
      }}
    >
      <TouchableOpacity
        onPress={() => handleOpenModal(item)}
        className={`flex-row justify-between items-start ${isActive ? "bg-gray-300" : "bg-white dark:bg-gray-800"}`}
        activeOpacity={0.8}
      >
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
            <ScrollView className="h-28">
              <CustomText className="mt-2 text-sm text-gray-500">{item.notes.substring(0, 90) + '...'}</CustomText>
            </ScrollView>
          )}
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => onEdit(item)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
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
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <MaterialIcons name="delete" size={20} color="#EF4444" />
          </TouchableOpacity>
          <TouchableOpacity
            onLongPress={drag} // Inicia o drag and drop ao pressionar
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <MaterialIcons name="drag-handle" size={20} color={isDarkMode ? "#fff" : "#464A45FF"} />
          </TouchableOpacity>
        </View>
      </CardContent>
      </TouchableOpacity>
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
    <DraggableFlatList
        className="space-y-4"
        data={newExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => {
          setNewExercises(data);
          onReorder(data); // Atualiza a ordem ao soltar
        }}
        ListHeaderComponent={() => <HeaderList />}
        ListEmptyComponent={() => (
          <View className="py-6">
            <CustomText className="text-center text-gray-500 dark:text-white">
              Nenhum exercício cadastrado neste plano.
            </CustomText>
          </View>
        )}
      />

<Modal
        visible={!!selectedExercise}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        {selectedExercise && (
          <ExerciceModal exercise={selectedExercise} onClose={handleCloseModal} />
        )}
      </Modal>
    </View>
  );
}
