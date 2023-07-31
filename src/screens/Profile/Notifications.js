import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header, NotificationCategory, Accept } from "../../common/components";
import { SAFEAREAVIEW } from "../../common/constants";
import { useUserContext } from "../../context/UserContext";
import { useAuthContext } from "../../context/AuthContext";

export default function Notifications() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { notifications, getListNotifFn } = useUserContext();
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);
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
              getListNotifFn(setLoading, user?.token);
            }}
          />
        }
      >
        {!loading ? (
          <>
            {!notifications ? (
              <View className="flex-1 items-center justify-center mb-24">
                <Text>No hay notificaciones por los momentos...</Text>
              </View>
            ) : (
              <>
                {notifications.map((item, i) => (
                  <NotificationCategory
                    title={item.title}
                    subtitle={item.message}
                    icon={<Accept />}
                    createdAt={item.date}
                    key={item.notification_id}
                    id={item.id}
                    objective={item.objective}
                  />
                ))}
              </>
            )}
          </>
        ) : (
          <View className="flex-1 items-center justify-center mb-24">
            <Text>Cargando notificaciones...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
