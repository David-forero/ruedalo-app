import { SafeAreaView, Animated, BackHandler, ActivityIndicator } from "react-native";
import Lottie from "lottie-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { COLORS } from "../../common/constants";
import { useAuthContext } from "../../context/AuthContext";
import { useStoreContext } from "../../context/StoreContext";

const CreateOrderLoading = () => {
  const {user} = useAuthContext();
  const {checkoutProcessFn} = useStoreContext();

  const scaleValue = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const route = useRoute();
  const { amount, product, unit, id_paycommerce, id_shipping } = route.params;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; // Evita el comportamiento predeterminado de retroceso
    });

    async function init() {
      const res = await checkoutProcessFn({id_product: product?.id, id_commerce: product?.commerce.id, unit, id_paycommerce, id_shipping}, user?.token)
      if (res.status === 200 || res.status === 201) {
        navigation.navigate("OrderSuccessful")
      }else{
        navigation.goBack()
      }
    }
    init();

    return () => backHandler.remove();
  }, [product, amount]);

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Lottie
        style={{
          width: 250,
          height: 250,
        }}
        autoPlay
        loop
        source={require("../../assets/animations/delivery-loading.json")}
      />

      <Animated.Text
        style={{
          transform: [{ scale: scaleValue }],
        }}
        className="font-bold text-md text-gray-800 text-center animate-pulse my-5"
      >
        Creando el pedido, espere un momento...
      </Animated.Text>
      <ActivityIndicator size="small" color={COLORS.orange} />
    </SafeAreaView>
  );
};

export default CreateOrderLoading;
