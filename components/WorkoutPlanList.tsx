import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, useColorScheme } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { WorkoutPlan } from "../types/workout";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SheetsContextType } from "~/contexts/types";
import { SheetsContext } from "~/contexts/context";
import { Button } from "./ui/button";
import WorkoutPlanForm from "./forms/WorkoutPlanForm";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import CustomTextRoboto from "./CustomTextRoboto";
import CustomText from "./CustomTextQuicksand";
import { Checkbox } from "./ui/checkbox";

interface Props {
  plans: WorkoutPlan[];
  onSelect: (plan: WorkoutPlan) => void;
  onAdd: () => void;
  onEdit: (plan: WorkoutPlan) => void;
  onDelete: (id: string) => void;
  resetDone: () => void;
  onReorder: (newPlans: WorkoutPlan[]) => void;
}

export default function WorkoutPlanList({
  plans,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
  resetDone,
  onReorder
}: Props) {
  const {
    isPlanModalOpen,
    setIsPlanModalOpen,
    editingPlan,
    setEditingPlan,
    handleEditPlan,
    handleAddPlan,
  } = useContext(SheetsContext) as SheetsContextType;
  const [newPlans, setNewPlans] = useState<WorkoutPlan[]>(plans);

  useEffect(() => {
    setNewPlans(plans);
  }, [plans]);

   const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";


  const HeaderList = () => {
    return (
      <View className="flex justify-between mb-4">
        <CustomTextRoboto className="text-2xl text-gray-900 dark:text-white mb-3">
          Planos de Treino
        </CustomTextRoboto>
        <View className="flex flex-row justify-between">
        <Dialog open={isPlanModalOpen} onOpenChange={setIsPlanModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex flex-row bg-indigo-600">
              <MaterialIcons name="add" size={20} color="#fff" />
              <CustomText className="text-white">Novo Plano</CustomText>
            </Button>
          </DialogTrigger>
          <DialogContent className="dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle>
                {editingPlan ? "Editar Plano" : "Novo Plano"}
              </DialogTitle>
            </DialogHeader>
            <WorkoutPlanForm
              plan={editingPlan}
              onSubmit={
                editingPlan
                  ? (data) => handleEditPlan({ ...editingPlan, ...data })
                  : handleAddPlan
              }
              onCancel={() => {
                setIsPlanModalOpen(false);
                setEditingPlan(null);
              }}
            />
          </DialogContent>
        </Dialog>
        <TouchableOpacity
          onPress={resetDone}
          className="flex-row items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <CustomText className="text-white">Resetar</CustomText>
        </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderItem = ({ item: plan, drag, isActive }: RenderItemParams<WorkoutPlan>) => (
    <Card
      key={plan.id}
      className={`mb-3 mt-3 dark:bg-gray-800 dark:border dark:border-gray-200 ${isActive ? "bg-gray-300" : "bg-white"}`}
      style={{
        opacity: isActive ? 0.8 : 1,
      }}
    >
      <CardHeader className="flex-row justify-between items-start mb-2">
        <View className="flex flex-row items-center gap-2">
        <Checkbox
                  checked={plan?.done ?? false}
                  onCheckedChange={() => onSelect(plan)}
                  disabled={true}
                />
          <CustomTextRoboto className="text-lg font-semibold text-gray-800 dark:text-white w-44">
            {plan.name}
          </CustomTextRoboto>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => onEdit(plan)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <MaterialIcons name="edit" size={20} color="#3ad625" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(plan.id)}
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
      </CardHeader>
      <CardContent>
        <CustomText className="text-sm text-gray-600 mb-4">
          {plan.exercises.length} exercícios
        </CustomText>
      </CardContent>
      <CardFooter>
        <TouchableOpacity
          onPress={() => onSelect(plan)}
          className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
        >
          <CustomText className="text-indigo-600">Ver Exercícios</CustomText>
        </TouchableOpacity>
      </CardFooter>
    </Card>
  );

  return (
    <View className="space-y-4">
   <DraggableFlatList
        data={plans}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => onReorder(data)} // Atualiza a ordem ao soltar
        ListHeaderComponent={() => <HeaderList />}
        ListEmptyComponent={() => (
          <View className="text-center py-6 text-gray-500">
            <CustomText className="dark:text-white">
              Nenhum plano de treino cadastrado nesta ficha.
            </CustomText>
          </View>
        )}
      />

      
    </View>
  );
}
