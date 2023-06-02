import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeOne from "./Home";
import OrderHistory from './OrderHistory'
import Profile from "../screens/Profile";
import AutoServices from "./AutoServices";
import { CurvedBottomBar } from "react-native-utils-navigation-bar";

export default function MainLayout() {
    const navigation = useNavigation();

    const [type, setType] = useState('down');

    const onClickButton = () => {
        navigation.navigate('MyCars')
    }

    const _renderIcon = (routeName, selectTab) => {
        let icon = '';

        switch (routeName) {
        case 'title1':
            icon = 'ios-home-outline';
            break;
        case 'title2':
            icon = 'construct-outline';
            break;
        case 'title3':
            icon = 'file-tray-full-outline';
            break;
        case 'title4':
            icon = 'person-outline';
            break;
        }

        return (
            <Ionicons name={icon} size={23} color={routeName === selectTab ? '#FF3030' : 'gray'} />
        );
    };

    return (

        
        <View style={{ flex: 1 }}>
            <CurvedBottomBar.Navigator
                style={[type === 'down' && { opacity: 40 }]}
                type={type}
                height={60}
                circleWidth={55}
                bgColor="#2d2d2d"
                borderTopLeftRight={true}
                initialRouteName="title1"
                renderCircle={() => (
                    <TouchableOpacity
                        style={[type === 'down' ? styles.btnCircle : styles.btnCircleUp]} onPress={onClickButton}
                    >
                        <Ionicons name="ios-car-outline" size={30} color={'white'} />
                    </TouchableOpacity>
                )}
                tabBar={({ routeName, selectTab, navigation }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation(routeName)}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        >
                            {_renderIcon(routeName, selectTab)}
                        </TouchableOpacity>
                    );
                }}>
                <CurvedBottomBar.Screen
                    name="title1"
                    position="left"
                    component={() => <HomeOne />}
                />
                <CurvedBottomBar.Screen
                    name="title2"
                    component={() => <AutoServices />}
                    position="left"
                />
                <CurvedBottomBar.Screen
                    name="title3"
                    component={() => <OrderHistory />}
                    position="right"
                />
                <CurvedBottomBar.Screen
                    name="title4"
                    component={() => <Profile />}
                    position="right"
                />
            </CurvedBottomBar.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
  
    btnCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F97316',
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 1,
        bottom: 28
    },
    btnCircleUp: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF3030',
       
    },
    imgCircle: {
        width: 30,
        height: 30,
        tintColor: '#fff',
        color: 'white'
    },
    img: {
        width: 30,
        height: 30,
    }
});






