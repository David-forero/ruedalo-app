import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { useUserContext } from "../../context/UserContext";
import { useAuthContext } from "../../context/AuthContext";

export default function Notifications() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { notifications, getListNotifFn } = useUserContext();
  const { user } = useAuthContext();

  useEffect(() => {
    getListNotifFn(setLoading, user?.token);
  }, []);

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Notificaciones" onPress={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          flexGrow: 1,
          paddingTop: 37,
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={async () => {
              setLoading(true);
              getTransactionsAppFn(setLoading, user?.token);
            }}
          />
        }
      >
        {notifications ? (
          notifications.map((item) => (
            <NotificationCategory
              title=""
              subtitle={item.description}
              icon={<Accept />}
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center mb-24">
            <Text>De momento no hay notificaciones</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
