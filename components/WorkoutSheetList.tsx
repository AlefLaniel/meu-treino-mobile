import React, { useContext } from "react";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { View, Text, TouchableOpacity, FlatList, Alert, useColorScheme } from "react-native";
import { WorkoutSheet } from "../types/workout";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { SheetsContext } from "~/contexts/context";
import { SheetsContextType } from "~/contexts/types";
import WorkoutSheetForm from "./forms/WorkoutSheetForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { showMessage } from "react-native-flash-message";
import CustomTextRoboto from "./CustomTextRoboto";
import CustomText from "./CustomTextQuicksand";

interface Props {
  sheets: WorkoutSheet[];
  onSelect: (sheet: WorkoutSheet) => void;
  onAdd: () => void;
  onEdit: (sheet: WorkoutSheet) => void;
  onDelete: (id: string) => void;
  onReorder: (newSheets: WorkoutSheet[]) => void;
}

export default function WorkoutSheetList({
  sheets,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
  onReorder,
}: Props) {
  const {
    isSheetModalOpen,
    setIsSheetModalOpen,
    editingSheet,
    setEditingSheet,
    handleEditSheet,
    handleAddSheet,
  } = useContext(SheetsContext) as SheetsContextType;

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const HeaderList = () => {
    return (
      <View className="flex justify-between mb-4">
        <CustomTextRoboto className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Fichas de Treino
        </CustomTextRoboto>
        <Dialog
          open={isSheetModalOpen}
          onOpenChange={setIsSheetModalOpen}
          className="dark:bg-gray-800"
        >
          <DialogTrigger asChild>
            <Button className="flex flex-row bg-indigo-600">
              <MaterialIcons name="add" size={20} color="#fff" />
              <CustomText className="text-white">Nova Ficha</CustomText>
            </Button>
          </DialogTrigger>

          <DialogContent className="dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle>
                {editingSheet ? "Editar Ficha" : "Nova Ficha"}
              </DialogTitle>
            </DialogHeader>
            <WorkoutSheetForm
              sheet={editingSheet}
              onSubmit={
                editingSheet
                  ? (data) => handleEditSheet({ ...editingSheet, ...data })
                  : (data) =>
                      handleAddSheet(
                        data as Omit<WorkoutSheet, "id" | "plans" | "createdAt">
                      )
              }
              onCancel={() => {
                setIsSheetModalOpen(false);
                setEditingSheet(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </View>
    );
  };

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<WorkoutSheet>) => (
    <Card
      key={item.id}
      className={`mb-4 dark:border dark:border-gray-200 ${isActive ? "bg-gray-300" : isDarkMode ? "bg-gray-800" : "bg-white"}`}
      style={{
        opacity: isActive ? 0.8 : 1,
      }}
    >
      <CardHeader className="flex-row justify-between items-start">
        <CustomTextRoboto
          className={`font-bold text-xl ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {item.name}
        </CustomTextRoboto>
        <View className="flex-row gap-2 -mt-3">
          <TouchableOpacity
            onPress={() => onEdit(item)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <MaterialIcons name="edit" size={20} color="#3ad625" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <MaterialIcons name="delete" size={20} color="#EF4444" />
          </TouchableOpacity>
          <TouchableOpacity
            onLongPress={drag} // Inicia o drag and drop ao pressionar
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <MaterialIcons name="drag-handle" size={20} color={isDarkMode ? "#fff": "#464A45FF"} />
          </TouchableOpacity>
        </View>
      </CardHeader>
      <CardContent>
        <CustomText
          className={`mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {item.description}
        </CustomText>
        <CustomText
          className={`text-sm mb-4 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {item.plans.length} planos de treino
        </CustomText>
        <CustomText
          className={`text-sm self-end mb-4 ${
            isDarkMode ? "text-gray-500" : "text-gray-500"
          }`}
        >
          {new Date(item.createdAt).toLocaleDateString()}
        </CustomText>
      </CardContent>
      <CardFooter>
        <TouchableOpacity
          onPress={() => onSelect(item)}
          className={`w-full px-4 py-2 border rounded-lg hover:bg-indigo-50 ${
            isDarkMode
              ? "text-indigo-400 border-indigo-400"
              : "text-indigo-600 border-indigo-600"
          }`}
        >
          <CustomText
            className={isDarkMode ? "text-indigo-400" : "text-indigo-600"}
          >
            Ver Detalhes
          </CustomText>
        </TouchableOpacity>
      </CardFooter>
    </Card>
  );

  return (
    <View >
      <DraggableFlatList
        data={sheets}
        renderItem={renderItem}
        ListHeaderComponent={ <HeaderList /> }
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => onReorder(data)} // Atualiza a ordem ao soltar
      />
    </View>
  );
}
