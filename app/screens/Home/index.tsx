import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  useColorScheme,
  View,
} from "react-native";
import ExerciseList from "~/components/ExerciseList";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import WorkoutPlanList from "~/components/WorkoutPlanList";
import WorkoutSheetList from "~/components/WorkoutSheetList";
import { SheetsContext } from "~/contexts/context";
import { SheetsContextType } from "~/contexts/types";
import { Exercise, WorkoutPlan, WorkoutSheet } from "~/types/workout";
import FlashMessage, { showMessage } from "react-native-flash-message";
import backupData from "~/utils/backupData";
import restoreData from "~/utils/restoreData";
import { generateHTML } from "~/utils/pdf";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as Updates from "expo-updates";
import { Modal } from "react-native";
import CustomText from "~/components/CustomTextQuicksand";
import CustomTextRoboto from "~/components/CustomTextRoboto";

// import { Container } from './styles';

const Home = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [isRestModalVisible, setIsRestModalVisible] = useState(false);
  const [restTime, setRestTime] = useState(60);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

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

  const startRestTimer = () => {
    setIsRestModalVisible(true);
    setRestTime(120);
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

  const stopRestTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setIsRestModalVisible(false);
  };

const handleToggleCompletion = (id: string, completed: boolean) => {
  handleToggleExerciseCompletion(id);

  const idx = selectedPlan?.exercises.findIndex(e => e.id === id) ?? 0;
  setCurrentExerciseIndex(idx);

  // Só inicia descanso se estiver marcando como concluído (não ao desmarcar)
  if (!completed) {
    if (!areAllExercisesCompleted()) {
      startRestTimer();
    } else {
      stopRestTimer();
    }
  }
};

  const handleGeneratePDF = async () => {
    try {
      const htmlContent = generateHTML(sheets);
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      showMessage({
        message: "PDF Gerado",
        description: `Arquivo PDF criado em: ${uri}`,
        type: "success",
        duration: 3000,
        icon: "success",
      });

      // Se desejar, você pode compartilhar o PDF:
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      showMessage({
        message: "Erro",
        description: "Não foi possível gerar o PDF.",
        type: "danger",
        duration: 3000,
        icon: "danger",
      });
      console.error(error);
    }
  };

  const restaurarBackup = async () => {
    await restoreData();
    setTimeout(async () => {
      await Updates.reloadAsync(); // Recarrega a aplicação
    }, 3000);
    showMessage({
      message: "Backup restaurado com sucesso!",
      type: "success",
      duration: 3000,
      icon: "success",
    });
  };

  const handleReorder = (newSheets: WorkoutSheet[]) => {
    setSheets(newSheets);
  };

  const handleReorderPlans = (newPlans: WorkoutPlan[]) => {
    if (!selectedSheet) return;
  
    // Atualiza os planos do selectedSheet
    const updatedSheet = { ...selectedSheet, plans: newPlans };
  
    // Atualiza a lista de sheets com o selectedSheet atualizado
    const newSheets = sheets.map((sheet) =>
      sheet.id === selectedSheet.id ? updatedSheet : sheet
    );
  
    // Atualiza o estado
    setSheets(newSheets);
  
    // Atualiza o selectedSheet para refletir as mudanças
    setSelectedSheet(updatedSheet);
  };

  const handleReorderExercises = (newExercises: Exercise[]) => {
    if (!selectedPlan) return;
    const newPlans =
      selectedSheet?.plans.map((plan) => {
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


const handleNextExercise = () => {
  if (selectedPlan && selectedPlan.exercises.length > 0) {
    // Sempre pega o primeiro exercício não concluído na ordem
    const indexToMark = selectedPlan.exercises.findIndex((ex) => !ex.completed);

    // Se todos concluídos
    if (indexToMark === -1) {
      showMessage({
        message: "Parabéns!",
        description: "Você concluiu todos os exercícios!",
        type: "success",
        duration: 3000,
        icon: "success",
      });
      stopRestTimer();
      setCurrentExerciseIndex(0);
      return;
    }

    // Marca o exercício encontrado como concluído
    const exerciseToMark = selectedPlan.exercises[indexToMark];
    if (exerciseToMark && !exerciseToMark.completed) {
      handleToggleExerciseCompletion(exerciseToMark.id);
    }

    setCurrentExerciseIndex(indexToMark);

    // Inicia descanso
    startRestTimer();
  }
};

  const areAllExercisesCompleted = () => {
    return selectedPlan?.exercises.every((exercise) => exercise.completed);
  };

  useEffect(() => {
    if (areAllExercisesCompleted()) {
      showMessage({
        message: "Parabéns!",
        description: "Você concluiu todos os exercícios!",
        type: "success",
        duration: 3000,
        icon: "success",})
      stopRestTimer();
    }
  }, [selectedPlan?.exercises]);

  return (
    <SafeAreaView className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <FlashMessage position="top" />
     
      <View className="px-4 pt-4 flex-1">
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
          <View className="space-y-4 pb-20">
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
              <CustomTextRoboto className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedSheet.name}
              </CustomTextRoboto>
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
        ) : selectedPlan?.exercises ? (
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
              <CustomTextRoboto className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedPlan?.name}
              </CustomTextRoboto>
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
              handleToggleCompletion={handleToggleCompletion}
            />
            <View className="flex justify-between">
              {/* Botão de reset */}
              {areAllExercisesCompleted() ? (
                <Button
                  onPress={resetCompleted}
                  className=" px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Text className="dark:text-white">Finalizar Exercícios</Text>
                </Button>
              ) : (
                <>
                  {/* Botão de próximo exercício */}
                  <Button
                    onPress={handleNextExercise}
                    className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <CustomText className="dark:text-white">Próximo Exercício</CustomText>
                  </Button>
                </>
              )}
            </View>
          </View>
        ) : null}
      </View>
      <Modal
        visible={isRestModalVisible}
        transparent={true}
        animationType="slide"
        className="flex-1 justify-center items-center bg-black/80"
      >
        <View className="flex-1 justify-center items-center bg-black/80">
          <View className="bg-white p-6 rounded-lg w-[50%]">
            <CustomText className="text-xl font-bold mb-4 dark:text-blue-950">Tempo de Descanso</CustomText>
            <CustomTextRoboto className="text-2xl font-bold mb-4 dark:text-blue-950">{restTime} segundos</CustomTextRoboto>
            <View className="flex-row justify-between">
              <Button
                className="bg-red-500"
                onPress={() => setRestTime((prev) => Math.max(prev - 5, 0))}
              >
                <CustomText>-5s</CustomText>
              </Button>
              <Button
                className="bg-green-500"
                onPress={() => setRestTime((prev) => prev + 5)}
              >
                <CustomText>+5s</CustomText>
              </Button>
            </View>
            <Button
              className="bg-gray-200 mt-4"
              onPress={() => {
                if (timer) clearInterval(timer);
                setIsRestModalVisible(false);
              }}
            >
              <CustomText className="dark:text-black text-red-600">Cancelar</CustomText>
            </Button>
          </View>
        </View>
      </Modal>
     {!selectedPlan?.exercises && (
       <View className="flex flex-row border-t-1 bg-slate-100 dark:bg-slate-800 items-center justify-around p-4 mb-[14%]">
       <Button
         onPress={() => backupData()}
         className="px-4 py-2 bg-blue-200 text-white rounded hover:bg-blue-300"
       >
        <MaterialIcons name="backup" size={24} color="#1E90FF" />
       </Button>
       <Button
         className="px-4 py-2 bg-red-200 text-white rounded hover:bg-red-400"
         onPress={handleGeneratePDF}
       >
        <MaterialIcons name="picture-as-pdf" size={24} color="#FF4500" />
       </Button>
       <Button
         onPress={() => restaurarBackup()}
         className="px-4 py-2 bg-green-200 text-white rounded hover:bg-green-400"
       >
         <MaterialIcons name="restore" size={24} color="#32CD32" />
       </Button>
     </View>
     )}
    </SafeAreaView>
  );
};

export default Home;
