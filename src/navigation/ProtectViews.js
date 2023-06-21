import React, { useEffect, useState } from "react";
import {
  OnBoarding,
  SignIn,
  SignUp,
  MainLayout,
  ForgotPassword,
  OtpCode,
  AccountCreated,
  Selectlocation,
  SignUpWith,
  Home,
  Profile,
  MyList,
  Order,
  RestaurantMenu,
  FoodDetails,
  Notifications,
  OrderHistory,
  AddPaymentMethod,
  EditProfile,
  MyCars,
  FAQ,
  MyPromocodes,
  Category,
  CartIsEmpty,
  OrderSuccessful,
  Filter,
  AddCarForm,
  PaymentMethodOne,
  PaymentMethodTwo,
  PasswordHasBeenReset,
  NewPassword,
  VerifyYourPhoneNumber,
  ConfirmationCode,
  AddNewCard,
  ChangePassword,
  OtpCodeEmail,
  AutoServices,
  CreateCardSuccess,
  ListProducts,
  CreateOrderLoading,
  AddAddress,
  ServicesDetails,
} from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuthContext } from "../context/AuthContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Stack = createStackNavigator();

const ProtectViews = () => {
  const [loading, setLoading] = useState(true);
  const { user, loadingApp, enableBoarding, auth } = useAuthContext();
  let [fontsLoaded] = useFonts({
    Roboto_400Regular: require("../assets/fonts/Roboto-Regular.ttf"),
    Roboto_500Medium: require("../assets/fonts/Roboto-Medium.ttf"),
    Roboto_700Bold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    loadingApp(setLoading, SplashScreen);
  }, []);

  if (loading || !fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShown: false,
        }}
        initialRouteName={`${enableBoarding ? "OnBoarding" : "SignIn"}`}
      >
        {auth && user ? (
          <>
            <Stack.Screen
              name={user?.status !== "pending" ? "MainLayout" : "OtpCodeEmail"}
              component={user?.status !== "pending" ? MainLayout : OtpCodeEmail}
            />
            <Stack.Screen name="RestaurantMenu" component={RestaurantMenu} />
            <Stack.Screen name="MyList" component={MyList} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="FoodDetails" component={FoodDetails} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="MyCars" component={MyCars} />
            <Stack.Screen name="FAQ" component={FAQ} />
            <Stack.Screen name="MyPromocodes" component={MyPromocodes} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="CartIsEmpty" component={CartIsEmpty} />
            <Stack.Screen name="Filter" component={Filter} />
            <Stack.Screen name="AddCarForm" component={AddCarForm} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="AddNewCard" component={AddNewCard} />
            <Stack.Screen name="AutoServices" component={AutoServices} />
            <Stack.Screen name="ServicesDetails" component={ServicesDetails} />
          </>
        ) : (
          <>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignUpWith" component={SignUpWith} />
          </>
        )}

        {/* <Stack.Screen name="OtpCodeEmail" component={OtpCodeEmail} /> */}
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen
          name="CreateOrderLoading"
          component={CreateOrderLoading}
        />
        <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} />
        <Stack.Screen
          name="VerifyYourPhoneNumber"
          component={VerifyYourPhoneNumber}
        />
        <Stack.Screen
          name="PasswordHasBeenReset"
          component={PasswordHasBeenReset}
        />
        <Stack.Screen name="PaymentMethodTwo" component={PaymentMethodTwo} />
        <Stack.Screen name="PaymentMethodOne" component={PaymentMethodOne} />
        <Stack.Screen name="OrderSuccessful" component={OrderSuccessful} />
        <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />

        <Stack.Screen name="Selectlocation" component={Selectlocation} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="AccountCreated" component={AccountCreated} />
        <Stack.Screen name="OtpCode" component={OtpCode} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CreateCardSuccess" component={CreateCardSuccess} />
        <Stack.Screen name="ListProducts" component={ListProducts} />
      </Stack.Navigator>
    );
  }
};

export default ProtectViews;
