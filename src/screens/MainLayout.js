import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Home from './Home';
import MyCars from './MyCars';
import AutoServices from './AutoServices';
import Profile from './Profile';
import OrderHistory from './OrderHistory';

import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { useAuthContext } from "../context/AuthContext";

export default function MainLayout() {
  const navigation = useNavigation();
  const { coordenatesPermitions } = useAuthContext();

  useEffect(() => {
    if (!coordenatesPermitions) {
      navigation.navigate("Selectlocation");
    }
  }, []);

  const _renderIcon = (routeName, selectTab) => {
    let icon = "";
    switch (routeName) {
      case "title1":
        icon = "ios-home-outline";
        break;
      case "title2":
        icon = "construct-outline";
        break;
      case "title3":
        icon = "file-tray-full-outline";
        break;
      case "title4":
        icon = "person-outline";
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={23}
        color={routeName === selectTab ? "#FF3030" : "gray"}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CurvedBottomBarExpo.Navigator
        style={{ opacity: 40 }}
        type={"DOWN"}
        height={60}
        screenOptions={{headerShown: false}}
        circleWidth={55}
        bgColor="#2d2d2d"
        borderTopLeftRight={true}
        initialRouteName="title1"
        renderCircle={({ navigate }) => (
          <TouchableOpacity style={styles.btnCircle} onPress={() => navigate('title5')}>
            <Ionicons name="ios-car-outline" size={30} color={"white"} />
          </TouchableOpacity>
        )}
        tabBar={({ routeName, selectedTab, navigate }) => {
          return (
            <TouchableOpacity
              onPress={() => navigate(routeName)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
          );
        }}
      >
        <CurvedBottomBarExpo.Screen
          name="title1"
          position="LEFT"
          component={() => <Home />}
        />

        <CurvedBottomBarExpo.Screen
          name="title2"
          component={() => <AutoServices />}
          position="LEFT"
        />

        <CurvedBottomBarExpo.Screen
          name="title5"
          component={() => <MyCars />}
          position="CIRCLE"
        />

        <CurvedBottomBarExpo.Screen
          name="title3"
          component={() => <OrderHistory />}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
          name="title4"
          component={() => <Profile />}
          position="RIGHT"
        />
      </CurvedBottomBarExpo.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F97316",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 28,
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3030",
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "#fff",
    color: "white",
  },
  img: {
    width: 30,
    height: 30,
  },
});
