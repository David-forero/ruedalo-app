import { SafeAreaView, Text, View } from "react-native";
import { useUserContext } from "../../context/UserContext";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { COLORS, SAFEAREAVIEW } from "../../common/constants";
import { Button, Header } from "../../common/components";
import Lottie from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";

const MemberShip = () => {
  const { paySubscriptionFn } = useUserContext();
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Membresia" onPress={() => navigation.goBack()} />

      <View className="flex-1 justify-between">
        <View>
          <View className="flex-row flex-wrap justify-center items-center space-x-5 mt-10">
            <View className="shadow-md rounded-lg bg-white overflow-hidden">
              <View className="w-100 items-center text-center bg-gray-800 px-6 py-2">
                <Text className="text-gray-100 text-md ">Plan Gratis</Text>
              </View>

              <View className="p-3 py-6 bg-gray-300">
                <Text className="text-center text-orange-600 font-bold">
                  Gratis
                </Text>
              </View>

              <View className="w-100 items-center text-center bg-gray-800 px-5 py-2">
                <Text className="text-gray-100 text-md ">Plan Básico</Text>
              </View>
            </View>

            <View className="shadow-md rounded-md bg-white overflow-hidden">
              <View className="w-100 items-center text-center bg-gray-800 px-5 py-2">
                <Text className="text-gray-100 text-md ">Plan Premium</Text>
              </View>

              <View className="p-3 py-6 bg-gray-300">
                <Text className="text-center text-orange-600 font-bold">
                  5.00$/Mes
                </Text>
              </View>

              <View className="w-100 items-center text-center bg-gray-800 px-5 py-2">
                <Text className="text-gray-100 text-md ">Ahorra 1 mes</Text>
              </View>
            </View>
          </View>

          <View className="space-y-3">
            <Text className="font-bold text-lg pl-10 mt-16">Beneficios:</Text>

            <View className="flex-row items-center justify-around mb-2">
              <Text className="text-orange-600 font-semibold">Beneficio 1</Text>
              <AntDesign name="checksquareo" size={20} color={COLORS.orange} />
            </View>

            <View className="flex-row items-center justify-around mb-2">
              <Text className="text-orange-600 font-semibold">Beneficio 2</Text>
              <AntDesign name="checksquareo" size={20} color={COLORS.orange} />
            </View>

            <View className="flex-row items-center justify-around mb-2">
              <Text className="text-orange-600 font-semibold">Beneficio 3</Text>
              <AntDesign name="checksquareo" size={20} color={COLORS.orange} />
            </View>

            <View className="flex-row items-center justify-around mb-2">
              <Text className="text-orange-600 font-semibold">Beneficio 4</Text>
              <AntDesign name="checksquareo" size={20} color={COLORS.orange} />
            </View>

            <View className="flex-row items-center justify-around mb-2">
              <Text className="text-orange-600 font-semibold">Beneficio 5</Text>
              <AntDesign name="checksquareo" size={20} color={COLORS.orange} />
            </View>
          </View>
        </View>

        <View className="px-5 mt-12 mb-10">
          <Button
            title="Pagar con 5$"
            loading={loading}
            onPress={() => {
              setLoading(true);
              paySubscriptionFn(
                "price_1NLqqLGFUPnOrSP5iiNHqQnP",
                navigation,
                setLoading,
                user?.token,
                setUser
              );
            }}
          />
        </View>
      </View>

      {/* <View className="flex-1 items-center justify-center">
        <Lottie
          style={{
            width: 250,
            height: 250,
          }}
          autoPlay
          loop
          source={require("../../assets/animations/subscription.json")}
        />

        <Text className="text-2xl font-bold text-center mb-3 text-orange-500 capitalize">
          Obten beneficios premium
        </Text>
        <Text className="text-gray-600 mb-5 text-sm ">
          Al subscribirte al plan, podrás crear más de 2 vehículo
        </Text>
        <View className="w-2/4 mb-10">
          <Button
            title="Pagar con 5$"
            loading={loading}
            onPress={() => {
              setLoading(true);
              paySubscriptionFn(
                "price_1NLqqLGFUPnOrSP5iiNHqQnP",
                navigation,
                setLoading,
                user?.token,
                setUser
              );
            }}
          />
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default MemberShip;
