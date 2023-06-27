import { SafeAreaView, Text, View } from "react-native";
import { useUserContext } from "../../context/UserContext";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SAFEAREAVIEW } from "../../common/constants";
import { Button, Header } from "../../common/components";
import Lottie from "lottie-react-native";

const MemberShip = () => {
  const { paySubscriptionFn } = useUserContext();
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Membresia" onPress={() => navigation.goBack()} />
      <View className="flex-1 items-center justify-center">
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
      </View>
    </SafeAreaView>
  );
};

export default MemberShip;
