import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";

import AuthProvider from "../context/AuthContext";
import ProtectViews from "./ProtectViews";
import { StatusBar } from "react-native";
import { COLORS } from "../common/constants";
import StoreProvider from "../context/StoreContext";
import OrdersProvider from "../context/OrdersContext";
import UserProvider from "../context/UserContext";
import ServicesProvider from "../context/ServicesContext";

export default function Navigation() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <UserProvider>
          <StoreProvider>
            <ServicesProvider>
            <OrdersProvider>
              <StatusBar
                translucent={true}
                backgroundColor={COLORS.orange}
                barStyle={"light-content"}
              />
              <ProtectViews />
            </OrdersProvider>
            </ServicesProvider>
          </StoreProvider>
        </UserProvider>
      </AuthProvider>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
