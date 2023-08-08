import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PUBLIC_KEY_STRIPE } from '@env'
import FlashMessage from "react-native-flash-message";

import AuthProvider from "../context/AuthContext";
import ProtectViews from "./ProtectViews";
import { StatusBar } from "react-native";
import { COLORS } from "../common/constants";
import StoreProvider from "../context/StoreContext";
import OrdersProvider from "../context/OrdersContext";
import UserProvider from "../context/UserContext";
import ServicesProvider from "../context/ServicesContext";
import MyCarsProvider from "../context/MyCarsContext";

import { StripeProvider } from "@stripe/stripe-react-native";
import { useNavigationCustom } from "../common/hooks";


export default function Navigation() {
  return (
    <NavigationContainer ref={useNavigationCustom}>
      <StripeProvider publishableKey={'pk_test_gM2ZwEHriwHYScvQhIOTkhMX00VdiBXkDX'}>
      <AuthProvider>
        <UserProvider>
          <MyCarsProvider>
            <StoreProvider>
              <ServicesProvider>
                <OrdersProvider>
                  <StatusBar
                    translucent={false}
                    backgroundColor={'#2d2d2d'}
                    barStyle={"light-content"}
                  />
                  <ProtectViews />
                </OrdersProvider>
              </ServicesProvider>
            </StoreProvider>
          </MyCarsProvider>
        </UserProvider>
      </AuthProvider>
      <FlashMessage position="top" />
      </StripeProvider>
    </NavigationContainer>
  );
}
