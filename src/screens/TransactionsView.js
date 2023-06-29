import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { SAFEAREAVIEW } from "../common/constants";
import { Header, NotificationCategory, Wallet } from "../common/components";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

export default function TransactionsView() {
  const navigation = useNavigation();
  const { getTransactionsAppFn } = useUserContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    getTransactionsAppFn(setLoading, user?.token);
  }, []);

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Transacciones" onPress={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          flexGrow: 1,
          paddingTop: 37,
          paddingBottom: 80,
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
        <NotificationCategory
          title="Payment"
          subtitle="Thank you! Your transaction is com..."
          icon={<Wallet />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
