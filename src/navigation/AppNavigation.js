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
import MyCarsProvider from "../context/MyCarsContext";

import { StripeProvider } from "@stripe/stripe-react-native";
import { useNavigationCustom } from "../common/hooks";


export default function Navigation() {
  return (
    <NavigationContainer ref={useNavigationCustom}>
      <StripeProvider publishableKey={'pk_test_51MLqmDGFUPnOrSP52erb66PXqhBdGZDJxnXZP6udhH5kIwuvuvgNQfgTSEHqXcVaSIkfe1sCbpq7ur76JlIIW1TA00zSDRDBUD'}>
      <AuthProvider>
        <UserProvider>
          <MyCarsProvider>
            <StoreProvider>
              <ServicesProvider>
                <OrdersProvider>
                  <StatusBar
                    translucent={false}
                    backgroundColor={COLORS.orange}
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
