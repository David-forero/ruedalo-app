import {  Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Fade, Placeholder, PlaceholderLine } from "rn-placeholder";

const LoadingListTwo = () => {
  return (
    <TouchableOpacity
      style={{
        height: 100,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
      }}
     
    >
      <View
        style={{
          height: 100,
          width: 100,
          borderRadius: 10,
          marginRight: 20,
        }}
        className="bg-gray-300"
      ></View>
      <View style={{ flex: 1 }}>
        
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 7,
          }}
        >
          <Placeholder Animation={Fade}>
            <PlaceholderLine />
          </Placeholder>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >

          <Placeholder Animation={Fade}>
            <PlaceholderLine width={50} />
          </Placeholder>
        </View>
        <View
       
        >
          <Placeholder Animation={Fade}>
            <PlaceholderLine width={30} />
          </Placeholder>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LoadingListTwo;