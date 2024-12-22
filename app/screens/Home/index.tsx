import { MaterialIcons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { SafeAreaView, View } from 'react-native';
import ExerciseList from '~/components/ExerciseList';
import ExerciseForm from '~/components/forms/ExerciseForm';
import WorkoutPlanForm from '~/components/forms/WorkoutPlanForm';
import WorkoutSheetForm from '~/components/forms/WorkoutSheetForm';
import ModalComponent from '~/components/Modal';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import WorkoutPlanList from '~/components/WorkoutPlanList';
import WorkoutSheetList from '~/components/WorkoutSheetList';
import { SheetsContext } from '~/contexts/context';
import { SheetsContextType } from '~/contexts/types';
import { WorkoutSheet } from '~/types/workout';

// import { Container } from './styles';

const Home = () => {
    const { handleAddExercise, handleEditExercise, editingExercise, isExerciseModalOpen, handleAddPlan, handleEditPlan, editingPlan, isPlanModalOpen, handleAddSheet, handleEditSheet, editingSheet, isSheetModalOpen, resetCompleted, handleToggleExerciseCompletion, handleDeleteExercise, setEditingExercise, setIsExerciseModalOpen, resetDone, handleDeletePlan, setEditingPlan, setIsPlanModalOpen, setSelectedPlan, selectedPlan, sheets, selectedSheet, setSelectedSheet, setIsSheetModalOpen, setEditingSheet, handleDeleteSheet} = useContext(SheetsContext) as SheetsContextType;

  return (
    <SafeAreaView className="min-h-screen bg-gray-100">
    <View className="max-w-7xl mx-auto px-4 py-8">
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
              <MaterialIcons name="arrow-back" size={28} color="#151618FF" />
            </Button>
            <Text className="text-2xl font-bold text-gray-900">
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
          />
        </View>
      ) : (
        <View id="exercise-list" className="space-y-6">
          <View className="flex flex-row items-center gap-2">
            <Button
              variant="link"
              onPress={() => setSelectedPlan(null)}
              className="flex flex-row items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <MaterialIcons
                className="-mb-2"
                name="arrow-back"
                size={28}
                color="#151618FF"
              />
            </Button>
            <Text className="text-2xl font-bold text-gray-900">
              {selectedPlan.name}
            </Text>
          </View>
          <ExerciseList
            exercises={selectedPlan.exercises}
            onAdd={() => setIsExerciseModalOpen(true)}
            onEdit={(exercise) => {
              setEditingExercise(exercise);
              setIsExerciseModalOpen(true);
            }}
            onDelete={handleDeleteExercise}
            onToggleCompletion={handleToggleExerciseCompletion}
          />
          <View className="flex justify-between">
            {/* Botão de reset */}
            <Button
              onPress={resetCompleted}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <Text>Finalizar Exercícios</Text>
            </Button>
          </View>
        </View>
      )}
    </View>
  </SafeAreaView>
    );
}

export default Home;