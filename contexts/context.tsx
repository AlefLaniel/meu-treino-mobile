import { createContext } from "react";
import { SheetsContextType } from "./types";
import { SheetsState } from "./state";

export const SheetsContext = createContext<SheetsContextType>({} as SheetsContextType);

interface Props {
    children: React.ReactNode;
}

const SheetsProvider = ({ children }: Props) => {

    const { sheets,
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
        resetDone, } = SheetsState()


    return (
        <SheetsContext.Provider value={{ sheets,
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
            resetDone, }}>{children}</SheetsContext.Provider>
    );
}

export default SheetsProvider;