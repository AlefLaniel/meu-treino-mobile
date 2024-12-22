import { useEffect, useState } from "react";
import { Exercise, WorkoutPlan, WorkoutSheet } from "~/types/workout";
import { getWorkoutSheets, saveWorkoutSheets } from "~/utils/storage";
import { v4 as uuidv4 } from "uuid";

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
  };

  const handleDeleteSheet = (id: string) => {
    setSheets(sheets.filter((sheet) => sheet.id !== id));
    if (selectedSheet?.id === id) setSelectedSheet(null);
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
    setIsPlanModalOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (id: string) => {
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
    if (selectedPlan?.id === id) setSelectedPlan(null);
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
    setIsExerciseModalOpen(false);
    setEditingExercise(null);
  };

  const handleDeleteExercise = (id: string) => {
    if (
      !selectedSheet ||
      !selectedPlan
    )
      return;
    const updatedPlans = selectedSheet.plans.map((plan) =>
      plan.id === selectedPlan.id
        ? {
            ...plan,
            exercises: plan.exercises.filter((exercise) => exercise.id !== id),
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
