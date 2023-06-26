import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../common/components";
import { COLORS, SAFEAREAVIEW } from "../../common/constants";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AddVehicle } from "../components/MyDocuments";
import { useState } from "react";
const MyDocuments = () => {
  const navigation = useNavigation();
  const [showModalFormVehicle, setShowModalFormVehicle] = useState(false);


  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Mis documentos" onPress={() => navigation.goBack()} />

      <AddVehicle showModal={showModalFormVehicle} setShowModal={setShowModalFormVehicle} />
      
      <View className="flex-1 items-center justify-center">
        <View className="px-5 mb-10">
          <View className="flex-row justify-center mb-3">
            <Ionicons name="document-text-outline" size={80} color="black" />
          </View>
          <Text className="text-lg text-orange-600 text-center font-bold mb-3">
            No hay documentos en este momento
          </Text>
          <Text className="text-sm text-gray-800 text-center">
            Agregar un documento para brindarte más funcionalidad a tus compras
          </Text>
        </View>
      </View>

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
