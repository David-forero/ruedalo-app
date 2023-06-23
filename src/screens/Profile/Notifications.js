import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
    Header,
    Cancel,
    NotificationCategory,
    Wallet,
    Promo,
    Accept,
} from "../../common/components";
import { SAFEAREAVIEW } from "../../common/constants";

export default function Notifications() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header title="Notificaciones" onPress={() => navigation.goBack()} />
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 30,
                    flexGrow: 1,
                    paddingTop: 37,
                }}
            >
                {/* <NotificationCategory
                    title="Your Order Cancel"
                    subtitle="Order #107 has been cancelled"
                    icon={<Cancel />}
                />
                <NotificationCategory
                    title="Payment"
                    subtitle="Thank you! Your transaction is com..."
                    icon={<Wallet />}
                />
                <NotificationCategory
                    title="Promotion"
                    subtitle="Invite friends - Get 1 coupons"
                    icon={<Promo />}
                /> */}
                <NotificationCategory
                    title="Compra aprobada"
                    subtitle="Haz comprado un kit de motor"
                    icon={<Accept />}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
