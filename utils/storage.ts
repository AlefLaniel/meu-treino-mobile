import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorkoutSheet } from '../types/workout';

export const STORAGE_KEY = 'workout-sheets';

// Função para obter as fichas de treino
export const getWorkoutSheets = async (): Promise<WorkoutSheet[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao obter fichas de treino:', error);
    return [];
  }
};

// Função para salvar as fichas de treino
export const saveWorkoutSheets = async (sheets: WorkoutSheet[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sheets));
  } catch (error) {
    console.error('Erro ao salvar fichas de treino:', error);
  }
};
