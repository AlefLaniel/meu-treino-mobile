import { useEffect, useState } from "react";
import { Exercise, WorkoutPlan, WorkoutSheet } from "~/types/workout";
import { getWorkoutSheets, saveWorkoutSheets } from "~/utils/storage";
import { v4 as uuidv4 } from "uuid";
import { Alert } from "react-native";

export const SheetsState = () => {
  const [sheets, setSheets] = useState<WorkoutSheet[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<WorkoutSheet | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);

  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  const [editingSheet, setEditingSheet] = useState<WorkoutSheet | null>(null);
  const [editingPlan, setEditingPlan] = useState<WorkoutPlan | null>(null);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const loadSheets = async () => {
      const loadedSheets = await getWorkoutSheets();
      setSheets(loadedSheets);
    };

    loadSheets();
  }, []);

  // Salva as fichas de treino sempre que a lista de fichas for atualizada
  useEffect(() => {
    const saveSheets = async () => {
      await saveWorkoutSheets(sheets);
    };

    saveSheets();
  }, [sheets]);

  const handleAddSheet = (
    data: Omit<WorkoutSheet, "id" | "plans" | "createdAt">
  ) => {
    console.log("Current sheets:", sheets);

    const newSheet: WorkoutSheet = {
      ...data,
      id: uuidv4(),
      plans: [],
      createdAt: new Date().toISOString(),
    };

    setSheets([...(sheets || []), newSheet]); // Garante que sheets é iterável
    setSelectedSheet(newSheet); // Selecione a nova ficha após a criação
    Alert.alert("Sucesso", "Ficha de treino criada com sucesso!");
    setIsSheetModalOpen(false); // Fechar o modal após adicionar
    setEditingSheet(null); // Resetar o estado de edição
    
  };

  const handleEditSheet = (
    data: Omit<WorkoutSheet, "id" | "plans" | "createdAt">
  ) => {
    if (!editingSheet) return;
    const updatedSheets = sheets.map((sheet) =>
      sheet.id === editingSheet.id ? { ...sheet, ...data } : sheet
    );
    setSheets(updatedSheets);
    setSelectedSheet(
      updatedSheets.find((s) => s.id === editingSheet.id) ?? null
    );
    setIsSheetModalOpen(false);
    setEditingSheet(null);
    Alert.alert("Sucesso", "Ficha de treino editada com sucesso!");
  };

  const handleDeleteSheet = (id: string) => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja deletar esta ficha?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: () => {
            setSheets((prevSheets) => prevSheets.filter((sheet) => sheet.id !== id));
            Alert.alert("Ficha de treino deletada com sucesso!");
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  // Plan operations
  const handleAddPlan = (data: Pick<WorkoutPlan, "name">) => {
    if (!selectedSheet) return;
    const newPlan: WorkoutPlan = {
      ...data,
      id: uuidv4(),
      exercises: [],
    };
    const updatedSheet = {
      ...selectedSheet,
      plans: [...selectedSheet.plans, newPlan],
    };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setSelectedPlan(newPlan);
    Alert.alert("Sucesso", "Plano de treino criado com sucesso!");
    setIsPlanModalOpen(false);
   
  };

  const handleEditPlan = (data: Pick<WorkoutPlan, "name">) => {
    if (!selectedSheet || !editingPlan) return;
    const updatedPlans = selectedSheet.plans.map((plan) =>
      plan.id === editingPlan.id ? { ...plan, ...data } : plan
    );
    const updatedSheet = { ...selectedSheet, plans: updatedPlans };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setSelectedPlan(updatedPlans.find((p) => p.id === editingPlan.id) ?? null);
    Alert.alert("Sucesso", "Plano de treino editado com sucesso!");
    setIsPlanModalOpen(false);
    setEditingPlan(null);
    
  };

  const handleDeletePlan = (id: string) => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja deletar este plano?",
      [{
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Deletar",
        onPress: () => {
          if (!selectedSheet) return;
          const updatedSheet = {
            ...selectedSheet,
            plans: selectedSheet.plans.filter((plan) => plan.id !== id),
          };
          setSheets(
            sheets.map((sheet) =>
              sheet.id === selectedSheet.id ? updatedSheet : sheet
            )
          );
          setSelectedSheet(updatedSheet);
          setSelectedPlan(null);
          Alert.alert("Plano de treino deletado com sucesso!");
        },
        style: "destructive",
      }]
    );
  };

  // Exercise operations
  const handleAddExercise = (data: Omit<Exercise, "id">) => {
    if (!selectedSheet || !selectedPlan) return;
    const newExercise: Exercise = {
      ...data,
      id: uuidv4(),
    };
    const updatedPlans = selectedSheet.plans.map((plan) =>
      plan.id === selectedPlan.id
        ? { ...plan, exercises: [...plan.exercises, newExercise] }
        : plan
    );
    const updatedSheet = { ...selectedSheet, plans: updatedPlans };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setSelectedPlan(updatedPlans.find((p) => p.id === selectedPlan.id) ?? null);
    Alert.alert("Sucesso", "Exercício criado com sucesso!");
    setIsExerciseModalOpen(false);
    
  };

  const handleEditExercise = (data: Omit<Exercise, "id">) => {
    if (!selectedSheet || !selectedPlan || !editingExercise) return;
    const updatedPlans = selectedSheet.plans.map((plan) =>
      plan.id === selectedPlan.id
        ? {
            ...plan,
            exercises: plan.exercises.map((exercise) =>
              exercise.id === editingExercise.id
                ? { ...exercise, ...data }
                : exercise
            ),
          }
        : plan
    );
    const updatedSheet = { ...selectedSheet, plans: updatedPlans };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setSelectedPlan(updatedPlans.find((p) => p.id === selectedPlan.id) ?? null);
    Alert.alert("Sucesso", "Exercício editado com sucesso!");
    setIsExerciseModalOpen(false);
    setEditingExercise(null);
    
  };

  const 
  handleDeleteExercise = (id: string) => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja deletar este exercício?",
      [{
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Deletar",
        onPress: () => {
          if (!selectedSheet || !selectedPlan) return;
          const updatedPlans = selectedSheet.plans.map((plan) =>
            plan.id === selectedPlan.id
              ? {
                  ...plan,
                  exercises: plan.exercises.filter(
                    (exercise) => exercise.id !== id
                  ),
                }
              : plan
          );
          const updatedSheet = { ...selectedSheet, plans: updatedPlans };
          setSheets(
            sheets.map((sheet) =>
              sheet.id === selectedSheet.id ? updatedSheet : sheet
            )
          );
          setSelectedSheet(updatedSheet);
          setSelectedPlan(
            updatedPlans.find((p) => p.id === selectedPlan.id) ?? null
          );
          Alert.alert("Exercício deletado com sucesso!");
        },
        style: "destructive",
      }],
      { cancelable: true }
    );
    if (
      !selectedSheet ||
      !selectedPlan
    )
      return;
  
    Alert.alert("Sucesso", "Exercício deletado com sucesso!");
  };

  const handleToggleExerciseCompletion = (id: string) => {
    if (!selectedSheet || !selectedPlan) return;

    const updatedPlans = selectedSheet.plans.map((plan) =>
      plan.id === selectedPlan.id
        ? {
            ...plan,
            exercises: plan.exercises.map((exercise) =>
              exercise.id === id
                ? { ...exercise, completed: !exercise.completed }
                : exercise
            ),
          }
        : plan
    );

    const updatedSheet = { ...selectedSheet, plans: updatedPlans };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setSelectedPlan(updatedPlans.find((p) => p.id === selectedPlan.id) ?? null);
  };

  const resetCompleted = () => {
    if (!selectedSheet || !selectedPlan) return;

    const updatedPlans = selectedSheet.plans.map((plan) =>
      plan.id === selectedPlan.id
        ? {
            ...plan,
            done: true,
            exercises: plan.exercises.map((exercise) => ({
              ...exercise,
              completed: false, // Reseta o estado
            })),
          }
        : plan
    );

    const updatedSheet = { ...selectedSheet, plans: updatedPlans };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setSelectedPlan(updatedPlans.find((p) => p.id === selectedPlan.id) ?? null);
    setSelectedPlan(null);
  };

  const resetDone = () => {
    if (!selectedSheet) return;

    const updatedPlans = selectedSheet.plans.map((plan) => ({
      ...plan,
      done: false, // Reseta o estado de "done" do plano
      exercises: plan.exercises.map((exercise) => ({
        ...exercise,
        completed: false, // Reseta o estado de "completed" de todos os exercícios
      })),
    }));

    const updatedSheet = { ...selectedSheet, plans: updatedPlans };

    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );

    setSelectedSheet(updatedSheet);
    setSelectedPlan(null); // Remove o plano selecionado para refletir a atualização
  };

  return {
    sheets,
    setSheets,
    selectedSheet,
    setSelectedSheet,
    selectedPlan,
    setSelectedPlan,
    isSheetModalOpen,
    setIsSheetModalOpen,
    isPlanModalOpen,
    setIsPlanModalOpen,
    isExerciseModalOpen,
    setIsExerciseModalOpen,
    editingSheet,
    setEditingSheet,
    editingPlan,
    setEditingPlan,
    editingExercise,
    setEditingExercise,
    handleAddSheet,
    handleEditSheet,
    handleDeleteSheet,
    handleAddPlan,
    handleEditPlan,
    handleDeletePlan,
    handleAddExercise,
    handleEditExercise,
    handleDeleteExercise,
    handleToggleExerciseCompletion,
    resetCompleted,
    resetDone,
  };
};
