import {
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import {
  EditProfileCategory,
  Header,
  Button,
  InputField,
} from "../common/components";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES } from "../common/constants";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useUserContext } from "../context/UserContexr";

export default function EditProfile() {
  const navigation = useNavigation();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false)
  const {user, setUser} = useAuthContext();
  const { updateUserFn } = useUserContext();

  useEffect(() => {
    setImage(null);
  }, [])
  

  // Función para seleccionar una imagen del dispositivo
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permisos denegados");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      let img = {
        uri: result.assets[0].uri,
        type: "image/jpeg", // Asegúrate de usar el tipo de imagen correcto
        name: "profileImage.jpg", // Nombre del archivo de imagen
      };
      setImage(img);
    }
  };

  const EditUserFormSchema = Yup.object().shape({
    name: Yup.string().required("Campo requerido"),
    lastname: Yup.string().required("Campo requerido"),
    phone: Yup.string().required("Campo requerido"),
  });

  function renderContent() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          flexGrow: 1,
          paddingVertical: SIZES.paddingVertical,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={{ name: "", lastname: "", phone: "" }}
          onSubmit={async (values) => {
            setLoading(true);
            if (image) {
              values.image = image.uri
            }
            updateUserFn(values, user?.token, setLoading, setUser, navigation);
          }}
          validationSchema={EditUserFormSchema}
          validateOnMount
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <>
              <InputField
                contaynerStyle={{ marginBottom: 15 }}
                placeholder="Nombre"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                error={touched.name ? errors.name : false}
                touched={touched.name}
                value={values.name}
              />
              <InputField
                contaynerStyle={{ marginBottom: 15 }}
                placeholder="Apellido"
                onChangeText={handleChange("lastname")}
                onBlur={handleBlur("lastname")}
                error={touched.lastname ? errors.lastname : false}
                touched={touched.lastname}
                value={values.lastname}
              />

              <InputField
                contaynerStyle={{ marginBottom: 15 }}
                placeholder="Teléfono"
                onChangeText={handleChange("phone")}
                error={touched.phone ? errors.phone : false}
                touched={touched.phone}
                keyboardType="numeric"
                onBlur={handleBlur("phone")}
                value={values.phone}
              />

              <View style={{ width: "100%", marginBottom: 45 }}>
                <TouchableOpacity
                  onPress={pickImage}
                  style={{
                    width: "100%",
                    height: 44,
                    backgroundColor: COLORS.lightGray,
                    borderRadius: 10,
                    paddingHorizontal: 18,
                    justifyContent: "center",
                    borderStyle: "dashed",
                    borderWidth: 1,
                    borderColor: COLORS.gray2,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.Roboto_400Regular,
                      fontSize: 14,
                      color: COLORS.gray2,
                    }}
                  >
                    Subir una foto
                  </Text>
                </TouchableOpacity>
               
                {
                  image?.uri ? (
                    <>
                    <Text className="font-bold font-md my-3">Vista previa:</Text>
                    <Image
                      source={{uri: image?.uri}}
                      className="rounded-md w-100 h-[300px]"
                    />
                    </>
                  ) : null
                }
              </View>
              <Button
                valid={isValid}
                loading={loading}
                title="Actualizar datos"
                containerStyle={{
                  backgroundColor: COLORS.black2,
                  marginBottom: 20,
                }}
                onPress={handleSubmit}
              />
              <TouchableOpacity
                
                onPress={() => navigation.navigate("ChangePassword")}
              >
                <Text
                  style={{
                    ...FONTS.Roboto_400Regular,
                    fontSize: 16,
                    textAlign: "center",
                    color: COLORS.black2,
                  }}
                >
                  Cambiar contraseña
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Actualizar Perfil" onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}
