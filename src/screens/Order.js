import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Rating, AirbnbRating } from "react-native-ratings";


import {
    Header,
} from "../common/components";
import { COLORS, SAFEAREAVIEW, FONTS, SIZES } from "../common/constants";


export default function Order() {
    const navigation = useNavigation();


   

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header title="Detalle de la compra" onPress={() => navigation.goBack()} />
            
        </SafeAreaView>
    );
}
