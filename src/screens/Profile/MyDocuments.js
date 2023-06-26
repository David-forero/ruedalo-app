import { SafeAreaView, Text, View } from "react-native";
import { Header } from "../../common/components";
import { SAFEAREAVIEW } from "../../common/constants";
import { useNavigation } from "@react-navigation/native";

const MyDocuments = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Mis documentos" onPress={() => navigation.goBack()} />
      <View className="flex-1 items-center justify-center">
        <Text>Mis documentos</Text>
      </View>
    </SafeAreaView>
  );
};

export default MyDocuments;
