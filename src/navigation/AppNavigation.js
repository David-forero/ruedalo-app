import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";


import AuthProvider from "../context/AuthContext";
import ProtectViews from "./ProtectViews";

export default function Navigation() {
    return (
        <NavigationContainer>
            <AuthProvider>
                  <ProtectViews/>
            </AuthProvider>
            <FlashMessage position="top" />
        </NavigationContainer>
    );
}
