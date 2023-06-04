import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";


import AuthProvider from "../context/AuthContext";
import ProtectViews from "./ProtectViews";
import { StatusBar } from "react-native";
import { COLORS } from "../common/constants";

export default function Navigation() {
    return (
        <NavigationContainer>
            <AuthProvider>
                    <StatusBar translucent backgroundColor={COLORS.orange} barStyle={"light-content"} />
                  <ProtectViews/>
            </AuthProvider>
            <FlashMessage position="top" />
        </NavigationContainer>
    );
}
