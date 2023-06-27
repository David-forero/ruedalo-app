import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../../common/components";
import { COLORS, SAFEAREAVIEW } from "../../common/constants";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AddVehicle } from "../components/MyDocuments";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useAuthContext } from "../../context/AuthContext";
import dayjs from "dayjs";
const MyDocuments = () => {
  const navigation = useNavigation();
  const [showModalFormVehicle, setShowModalFormVehicle] = useState(false);
  const { getListDocsFn, documentsVehicles, deleteDocumentVehicleFn } =
    useUserContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getListDocsFn(user?.token, setLoading);
  }, []);

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Mis documentos" onPress={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          flexGrow: 1,
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              getListDocsFn(user?.token, setLoading);
            }}
          />
        }
      >
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={"large"} color={COLORS.orange} />
          </View>
        ) : (
          <>
            {documentsVehicles?.length > 0 ? (
              documentsVehicles.map((item, index) => (
                <View key={index} className="flex-row  justify-center mt-3">
                  <View className="bg-[#2d2d2d] p-5 w-4/5 rounded-md">
                    <View className="flex-row item-center space-x-3 justify-center">
                      <Text className="text-md text-orange-600 font-bold">
                        Tipo de documento:
                      </Text>
                      <Text className="text-white text-sm">{item.type}</Text>
                    </View>

                    <View className="flex-row mt-5">
                      <Text className="text-md text-orange-600 font-bold">
                        F. Expedición:
                      </Text>
                      <Text className="text-white ml-4 text-sm">
                        {dayjs(item.emission_date).format("DD/MM/YYYY")}
                      </Text>
                    </View>

                    <View className="flex-row">
                      <Text className="text-md text-orange-600 font-bold">
                        F. Vencimiento:
                      </Text>
                      <Text className="text-white ml-4 text-sm">
                        {dayjs(item.expiration_date).format("DD/MM/YYYY")}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        deleteDocumentVehicleFn(
                          item.id,
                          user?.token,
                          setLoading
                        )
                      }
                      className="bg-orange-600 py-2 px-4 mt-5 rounded-md"
                    >
                      <Text className="text-white font-bold text-center">
                        Eliminar Documento
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View className="flex-1 items-center justify-center">
                <View className="px-5 mb-10">
                  <View className="flex-row justify-center mb-3">
                    <Ionicons
                      name="document-text-outline"
                      size={80}
                      color="black"
                    />
                  </View>
                  <Text className="text-lg text-orange-600 text-center font-bold mb-3">
                    No hay documentos en este momento
                  </Text>
                  <Text className="text-sm text-gray-800 text-center">
                    Agregar un documento para brindarte más funcionalidad a tus
                    compras
                  </Text>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>

      <AddVehicle
        showModal={showModalFormVehicle}
        setShowModal={setShowModalFormVehicle}
      />

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          backgroundColor: COLORS.orange,
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          position: "absolute",
          bottom: 50,
          right: 20,
          borderRadius: 100,
        }}
        onPress={() => setShowModalFormVehicle(true)}
      >
        <Text className="text-white text-3xl ">+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyDocuments;
