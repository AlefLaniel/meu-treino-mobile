import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "~/components/ui/text";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Exercise, WorkoutPlan, WorkoutSheet } from "~/types/workout";

import { getWorkoutSheets, saveWorkoutSheets } from "~/utils/storage";
import WorkoutSheetList from "~/components/WorkoutSheetList";

import WorkoutPlanList from "~/components/WorkoutPlanList";
import ExerciseList from "~/components/ExerciseList";
import { Button } from "~/components/ui/button";
import ModalComponent from "~/components/Modal";
import WorkoutSheetForm from "~/components/forms/WorkoutSheetForm";
import WorkoutPlanForm from "~/components/forms/WorkoutPlanForm";
import ExerciseForm from "~/components/forms/ExerciseForm";

import { MaterialIcons } from "@expo/vector-icons";
import SheetsProvider from "~/contexts/context";
import Home from "./screens/Home";

export default function Screen() {

  return (
    <SheetsProvider>
      <Home />
    </SheetsProvider>
  );
}
