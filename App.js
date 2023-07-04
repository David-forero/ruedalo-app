import React from "react";
import { useFonts } from "expo-font";
import AppNavigation from "./src/navigation/AppNavigation";
import { LogBox } from 'react-native';

// LogBox.ignoreAllLogs(true);

// import BasketProvider from "./context/BasketContext";
// import OrderProvider from "./context/OrderContext";
// import FurnitureProvider from "./context/FurnitureContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    return (
        <AppNavigation/>
    )
}
