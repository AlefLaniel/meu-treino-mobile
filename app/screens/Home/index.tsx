import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { SafeAreaView, ScrollView, useColorScheme, View } from "react-native";
import ExerciseList from "~/components/ExerciseList";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import WorkoutPlanList from "~/components/WorkoutPlanList";
import WorkoutSheetList from "~/components/WorkoutSheetList";
import { SheetsContext } from "~/contexts/context";
import { SheetsContextType } from "~/contexts/types";
import { Exercise, WorkoutPlan, WorkoutSheet } from "~/types/workout";

// import { Container } from './styles';

const Home = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const {
    resetCompleted,
    handleToggleExerciseCompletion,
    handleDeleteExercise,
    setEditingExercise,
    setIsExerciseModalOpen,
    resetDone,
    handleDeletePlan,
    setEditingPlan,
    setIsPlanModalOpen,
    setSelectedPlan,
    selectedPlan,
    sheets,
    setSheets,
    selectedSheet,
    setSelectedSheet,
    setIsSheetModalOpen,
    setEditingSheet,
    handleDeleteSheet,
  } = useContext(SheetsContext) as SheetsContextType;

  const handleReorder = (newSheets: WorkoutSheet[]) => {
    setSheets(newSheets);
  };

  const handleReorderPlans = (newPlans: WorkoutPlan[]) => {
    if (!selectedSheet) return;
    const newSheets = sheets.map((sheet) => {
      if (sheet.id === selectedSheet.id) {
        return { ...sheet, plans: newPlans };
      }
      return sheet;
    });
    setSheets(newSheets);
  }
  
  const handleReorderExercises = (newExercises: Exercise[]) => {
    if (!selectedPlan) return;
    const newPlans = selectedSheet?.plans.map((plan) => {
      if (plan.id === selectedPlan.id) {
        return { ...plan, exercises: newExercises };
      }
      return plan;
    }) || [];
    const newSheets = sheets.map((sheet) => {
      if (sheet.id === selectedSheet?.id) {
        return { ...sheet, plans: newPlans };
      }
      return sheet;
    });
    setSheets(newSheets);
  };

  return (
    <SafeAreaView className="min-h-screen bg-gray-100 dark:bg-gray-800">
        
        <View className="px-4 py-8 flex-1">
          {!selectedSheet ? (
            <WorkoutSheetList
              sheets={sheets}
              onSelect={setSelectedSheet}
              onAdd={() => setIsSheetModalOpen(true)}
              onEdit={(sheet) => {
                setEditingSheet(sheet);
                setIsSheetModalOpen(true);
              }}
              onDelete={handleDeleteSheet}
              onReorder={handleReorder}
            />
          ) : !selectedPlan ? (
            <View className="space-y-6">
              <View className="flex flex-row items-center gap-2">
                <Button
                  variant="link"
                  size="icon"
                  onPress={() => setSelectedSheet(null)}
                  className="action-button flex flex-row items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <MaterialIcons
                    name="arrow-back"
                    size={28}
                    color={isDarkMode ? "#FFFFFF" : "#151618FF"}
                  />
                </Button>
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedSheet.name}
                </Text>
              </View>
              <WorkoutPlanList
                plans={selectedSheet.plans}
                onSelect={setSelectedPlan}
                onAdd={() => setIsPlanModalOpen(true)}
                onEdit={(plan) => {
                  setEditingPlan(plan);
                  setIsPlanModalOpen(true);
                }}
                onDelete={handleDeletePlan}
                resetDone={resetDone}
                onReorder={handleReorderPlans}
              />
            </View>
          ) : 
          selectedPlan?.exercises ? (
            <View className="space-y-6 mb-72">
            <View className="flex flex-row items-center gap-2">
              <Button
                variant="link"
                onPress={() => setSelectedPlan(null)}
                className="flex flex-row items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-white"
              >
                <MaterialIcons
                  className="-mb-2"
                  name="arrow-back"
                  size={28}
                  color={isDarkMode ? "#FFFFFF" : "#151618FF"}
                />
              </Button>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedPlan?.name}
              </Text>
            </View>
            <ExerciseList
              exercises={selectedPlan?.exercises}
              onAdd={() => setIsExerciseModalOpen(true)}
              onEdit={(exercise) => {
                setEditingExercise(exercise);
                setIsExerciseModalOpen(true);
              }}
              onDelete={handleDeleteExercise}
              onToggleCompletion={handleToggleExerciseCompletion}
              onReorder={handleReorderExercises}
            />
            <View className="flex justify-between">
              {/* Botão de reset */}
              <Button
                onPress={resetCompleted}
                className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <Text className="dark:text-white">Finalizar Exercícios</Text>
              </Button>
            </View>
          </View>
          )
          : null}
        </View>
    </SafeAreaView>
  );
};

export default Home;
