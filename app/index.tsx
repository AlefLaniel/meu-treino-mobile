import React, { useEffect, useState, useRef } from "react";
import "react-native-get-random-values";


import Toast from 'react-native-toast-message';
import SheetsProvider from "~/contexts/context";
import Home from "./screens/Home";

export default function Screen() {



  return (
    <SheetsProvider>
      <Home />
    </SheetsProvider>
  );
}
