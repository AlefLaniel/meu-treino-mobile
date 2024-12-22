import React, { useContext } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Plus } from "~/lib/icons/Plus";
import { Trash2 } from "~/lib/icons/Trash2";
import { Edit } from "~/lib/icons/Edit";
import { WorkoutPlan } from "../types/workout";
import { Checkbox } from "./ui/checkbox";
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

interface Props {
  plans: WorkoutPlan[];
  onSelect: (plan: WorkoutPlan) => void;
  onAdd: () => void;
  onEdit: (plan: WorkoutPlan) => void;
  onDelete: (id: string) => void;
  resetDone: () => void;
}

export default function WorkoutPlanList({
  plans,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
  resetDone,
}: Props) {
  const {
    isPlanModalOpen,
    setIsPlanModalOpen,
    editingPlan,
    setEditingPlan,
    handleEditPlan,
    handleAddPlan,
  } = useContext(SheetsContext) as SheetsContextType;

  return (
    <View className="space-y-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold text-gray-900">
          Planos de Treino
        </Text>
        <View className="flex-row gap-3">
          <Dialog open={isPlanModalOpen} onOpenChange={setIsPlanModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex flex-row bg-indigo-600">
                <MaterialIcons name="add" size={20} color="#fff" />
                <Text className="text-white">Novo Plano</Text>
              </Button>
            </DialogTrigger>
            <DialogContent>
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
          {/* <TouchableOpacity
            onPress={onAdd}
            className="flex-row items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <MaterialIcons name="add" size={20} color="#fff" />
            <Text className="text-white">Novo Plano</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={resetDone}
            className="flex-row items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Text className="text-white">Resetar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={plans}
        keyExtractor={(item) => item.id}
        renderItem={({ item: plan }) => (
          <View className="mt-4 shadow-sm p-4 bg-white rounded-lg  transition-shadow mb-4">
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex flex-row items-center gap-2">
                <Checkbox
                  checked={plan?.done ?? false}
                  onCheckedChange={() => onSelect(plan)}
                />
                <Text className="text-lg font-semibold text-gray-800">
                  {plan.name}
                </Text>
              </View>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => onEdit(plan)}
                  className="p-1 text-gray-600 hover:text-indigo-600"
                >
                  <MaterialIcons name="edit" size={20} color="#4A5568" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onDelete(plan.id)}
                  className="p-1 text-gray-600 hover:text-red-600"
                >
                  <MaterialIcons name="delete" size={20} color="#4A5568" />
                </TouchableOpacity>
              </View>
            </View>

            <Text className="text-sm text-gray-600 mb-4">
              {plan.exercises.length} exercícios
            </Text>

            <TouchableOpacity
              onPress={() => onSelect(plan)}
              className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              <Text className="text-indigo-600">Ver Exercícios</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="text-center py-6 text-gray-500">
            <Text>Nenhum plano de treino cadastrado nesta ficha.</Text>
          </View>
        )}
      />
    </View>
  );
}