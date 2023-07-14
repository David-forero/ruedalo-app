import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SIZES,
  COLORS,
  FONTS,
  SAFEAREAVIEW,
  onboarding,
} from "../common/constants";
import {
  Button,
} from "../common/components";

import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";

const slides = [
  {
    key: "somethun",
    title: "Busca tus repuestos más rápido",
    description:
      "Podrás conseguir repuestos más facil sin necesidad de salir de casa",
    icon: "ios-images-outline",
    colors: ["#63E2FF", "#B066FE"],
    image: require("../assets/images/onboarding/01.png"),
  },
  {
    key: "somethun1",
    title: "Servicios para tu vehículo",
    description:
      "Con nuestra app podrás conseguir servicios cercanos para tu vehículo",
    icon: "ios-options-outline",
    colors: ["#A3A1FF", "#3A3897"],
    image: require("../assets/images/onboarding/02.png"),
  },
  {
    key: "somethun2",
    title: "Reparaciones rápidas y eficientes en tu hogar",
    description:
      "Nuestro equipo de profesionales realizará las reparaciones necesarias en la comodidad de tu hogar",
    icon: "ios-beer-outline",
    colors: ["#29ABE2", "#4F00BC"],
    image: require("../assets/images/onboarding/03.png"),
  },
];

export default function OnBoarding() {
  const sliderRef = useRef(null); 
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const onSlideChange = (index) => { // Cuando el slide cambia, actualizar el estado
    setCurrentSlideIndex(index);
  };

  const onDone = async () => {
    await AsyncStorage.setItem("onboarding", JSON.stringify(false));
    navigation.navigate("SignIn");
  };

  const onNextButtonClick = () => {
    const nextSlideIndex = currentSlideIndex + 1; // Calcula el índice del próximo slide
    if (nextSlideIndex < slides.length) { // Si el próximo slide existe
      sliderRef.current?.goToSlide(nextSlideIndex); // Ve al próximo slide
      setCurrentSlideIndex(nextSlideIndex); // Actualiza el índice del slide actual
    }
  };

  const RenderItem = ({ item }) => {
    return (
      <View className="flex-1">
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={item.image}
            style={{
              width: SIZES.width - 20,
              height: SIZES.height / 2.3,
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            ...SIZES.width,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            overflow: "hidden",
            backgroundColor: COLORS.black2,
            paddingTop: SIZES.height / 20,
            paddingBottom: SIZES.height / 30,
            paddingHorizontal: 40,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              color: COLORS.orange,
              marginBottom: SIZES.height / 50,
              textTransform: "capitalize",
              ...FONTS.Roboto_700Bold,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              marginBottom: 100,
              textAlign: "center",
              fontSize: 14,
              color: COLORS.white,
              paddingHorizontal: 10,
              ...FONTS.Roboto_400Regular,
            }}
          >
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
    <AppIntroSlider
      data={slides}
      renderItem={RenderItem}
      bottomButton
      onSlideChange={onSlideChange} 
      ref={sliderRef}
      renderDoneButton={() => 
        <Button
          title="¡Empecemos!"
          containerStyle={{
            backgroundColor: COLORS.orange,
          }}
          onPress={onDone}
        />
      }
      renderNextButton={() =>   
      <Button
        title="Siguiente"
        containerStyle={{
          backgroundColor: COLORS.orange,
        }}
        onPress={onNextButtonClick}
      />}
    />

{/* <Button title="Siguiente" onPress={onButtonClick} /> */}
    </>
  );
}
