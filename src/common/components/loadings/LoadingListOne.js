import {  Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Fade, Placeholder, PlaceholderLine } from "rn-placeholder";
import { COLORS } from "../../constants";
import { Shadow } from "react-native-shadow-2";

const LoadingListOne = () => {
  return (
    <Shadow
      viewStyle={{ marginRight: 15 }}
      startColor={COLORS.shadowStartColor}
      finalColor={COLORS.shadowFinalColor}
    >
      <TouchableOpacity
        style={{
          width: 250,
          borderRadius: 10,
        }}
      >
        <View className="h-[144px] w-100 rounded-md bg-gray-300"></View>
        <View
          style={{
            paddingHorizontal: 19,
            paddingTop: 12,
            paddingBottom: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            <View
              style={{
                width: "70%",
              }}
            >
              <Placeholder Animation={Fade}>
                <PlaceholderLine />
              </Placeholder>
            </View>

            <View>
              <Placeholder Animation={Fade}>
                <PlaceholderLine width={20} />
              </Placeholder>
            </View>
          </View>
          
          <Placeholder Animation={Fade}>
                <PlaceholderLine width={80} />
              </Placeholder>


        </View>
      </TouchableOpacity>
    </Shadow>
  );
};

export default LoadingListOne;