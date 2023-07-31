import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useMyCarsContext } from "../../../context/MyCarsContext";
const OilForm = () => {
  const { getOilsFn, oils, setSelectAceite, selectAceite } = useMyCarsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    getOilsFn(user?.token);
  }, []);

  return (
    <View>
      <Text className="font-bold text-2xl mb-6 text-gray-700 mt-5 text-center">
        Tipo de Aceite
      </Text>

      <View className="justify-between items-center ">
        <FlatList
          className=""
          data={oils}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                console.log(item.id);
                setSelectAceite(item.id);
              }}
              className={`w-32 h-32 items-center m-5 justify-center shadow-sm ${
                selectAceite === item.id ? "bg-orange-600" : "bg-gray-800"
              } rounded-md`}
            >
              {/* <MaterialIcons name="local-gas-station" size={35} color="white" /> */}
              <Text className="text-white font-bold text-center mt-2">
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default OilForm;
