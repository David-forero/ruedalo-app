import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import AppNavigation from "./src/navigation/AppNavigation";

// import BasketProvider from "./context/BasketContext";
// import OrderProvider from "./context/OrderContext";
// import FurnitureProvider from "./context/FurnitureContext";

export default function App() {
    return <AppNavigation />
}
