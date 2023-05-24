import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import AppNavigation from "./src/navigation/AppNavigation";

//Context 🔎
import AuthProvider from "./src/context/AuthContext";
// import BasketProvider from "./context/BasketContext";
// import OrderProvider from "./context/OrderContext";
// import FurnitureProvider from "./context/FurnitureContext";

export default function App() {
    let [fontsLoaded] = useFonts({
        Roboto_400Regular: require("./src/assets/fonts/Roboto-Regular.ttf"),
        Roboto_500Medium: require("./src/assets/fonts/Roboto-Medium.ttf"),
        Roboto_700Bold: require("./src/assets/fonts/Roboto-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <AuthProvider>
                <AppNavigation />
            </AuthProvider>
        );
    }
}
