import React, { useContext } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
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
  onReorder
}: Props) {
  const {
    isSheetModalOpen,
    setIsSheetModalOpen,
    editingSheet,
    setEditingSheet,
    handleEditSheet,
    handleAddSheet,
  } = useContext(SheetsContext) as SheetsContextType;

  const moveUp = (index: number) => {
    if (index <= 0) {
      showMessage({
        message: 'Aviso',
        description: 'A ficha já está na primeira posição.',
        type: 'info',
        icon: 'info',
        duration: 3000,
      })
      return;
    }
    const newSheets = [...sheets];
    [newSheets[index - 1], newSheets[index]] = [newSheets[index], newSheets[index - 1]];
    onReorder(newSheets);
  };

  const moveDown = (index: number) => {
    if (index >= sheets.length - 1) {
      showMessage({
        message: 'Aviso',
        description: 'A ficha já está na última posição.',
        type: 'info',
        icon: 'info',
        duration: 3000,
      })
      return;
    }
    const newSheets = [...sheets];
    [newSheets[index + 1], newSheets[index]] = [newSheets[index], newSheets[index + 1]];
    onReorder(newSheets);
  };


  const HeaderList = () => {

    return (
      <View className="flex justify-between mb-4">
        <CustomTextRoboto className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Fichas de Treino
        </CustomTextRoboto>
        <Dialog open={isSheetModalOpen} onOpenChange={setIsSheetModalOpen} className="dark:bg-gray-800">
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
                        data as Omit<
                          WorkoutSheet,
                          "id" | "plans" | "createdAt"
                        >
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
    )
  }

  return (
    <View className="space-y-4">
      <FlatList
        data={sheets}
        style={{ marginBottom: 50 }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <HeaderList />}
        renderItem={({ item: sheet }) => (
          <Card key={sheet.id} className="mb-4">
            <CardHeader className="flex-row justify-between items-start">
              <CustomTextRoboto className="font-bold text-xl">{sheet.name}</CustomTextRoboto>
              <View className="flex-row gap-2 -mt-3">
                <TouchableOpacity
                  onPress={() => onEdit(sheet)}
                  className="p-2 rounded-full bg-gray-200"
                >
                  <MaterialIcons name="edit" size={20} color="#3ad625" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onDelete(sheet.id)}
                  className="p-2 rounded-full bg-gray-200"
                >
                  <MaterialIcons name="delete" size={20} color="#EF4444" />
                </TouchableOpacity>
                <TouchableOpacity  className="p-2 rounded-full bg-gray-200">
                  <MaterialIcons name="arrow-upward" size={20} color="#464A45FF" onPress={() => moveUp(sheets.indexOf(sheet))} />
                </TouchableOpacity>
                <TouchableOpacity  className="p-2 rounded-full bg-gray-200">
                  <MaterialIcons name="arrow-downward" size={20} color="#464A45FF" onPress={() => moveDown(sheets.indexOf(sheet))} />
                </TouchableOpacity>
              </View>
            </CardHeader>
            <CardContent className="flex">
              <CustomText className="text-gray-600 mb-4">{sheet.description}</CustomText>

              <CustomText className="text-sm text-gray-600 mb-4">
                {sheet.plans.length} planos de treino
              </CustomText>
              <CustomText className="text-sm text-gray-500 self-end mb-4">
                {new Date(sheet.createdAt).toLocaleDateString()}
              </CustomText>
            </CardContent>
            <CardFooter>
              <TouchableOpacity
                onPress={() => onSelect(sheet)}
                className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
              >
                <CustomText className="text-indigo-600">Ver Detalhes</CustomText>
              </TouchableOpacity>
            </CardFooter>
          </Card>
        )}
        ListEmptyComponent={() => (
          <View className="text-center py-8 text-gray-500">
            <CustomText className="dark:text-white">
              Nenhuma ficha de treino cadastrada. Crie uma nova ficha para
              começar!
            </CustomText>
          </View>
        )}
      />
    </View>
  );
}
