import { Exercise, WorkoutPlan, WorkoutSheet } from "~/types/workout";

export type SheetsContextType = {
    sheets: WorkoutSheet[];
    setSheets: React.Dispatch<React.SetStateAction<WorkoutSheet[]>>;
    selectedSheet: WorkoutSheet | null;
    setSelectedSheet: React.Dispatch<React.SetStateAction<WorkoutSheet | null>>;
    selectedPlan: WorkoutSheet["plans"][0] | null;
    setSelectedPlan: React.Dispatch<React.SetStateAction<WorkoutSheet["plans"][0] | null>>;
    isSheetModalOpen: boolean;
    setIsSheetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isPlanModalOpen: boolean;
    setIsPlanModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isExerciseModalOpen: boolean;
    setIsExerciseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editingSheet: WorkoutSheet | null;
    setEditingSheet: React.Dispatch<React.SetStateAction<WorkoutSheet | null>>;
    editingPlan: WorkoutSheet["plans"][0] | null;
    setEditingPlan: React.Dispatch<React.SetStateAction<WorkoutSheet["plans"][0] | null>>;
    editingExercise: WorkoutSheet["plans"][0]["exercises"][0] | null;
    setEditingExercise: React.Dispatch<React.SetStateAction<WorkoutSheet["plans"][0]["exercises"][0] | null>>;
    handleAddSheet: (data: Omit<WorkoutSheet, "id" | "plans" | "createdAt">) => void;
    handleEditSheet: (sheet: WorkoutSheet) => void;
    handleDeleteSheet: (id: string) => void;
    handleAddPlan: (data: Pick<WorkoutPlan, "name">) => void;
    handleEditPlan: (plan: WorkoutSheet["plans"][0]) => void;
    handleDeletePlan: (id: string) => void;
    handleAddExercise: (data: Omit<Exercise, "id">) => void;
    handleEditExercise: (exercise: WorkoutSheet["plans"][0]["exercises"][0]) => void;
    handleDeleteExercise: (id: string) => void;
    handleToggleExerciseCompletion: (id: string) => void;
    resetCompleted: () => void;
    resetDone: () => void;
}