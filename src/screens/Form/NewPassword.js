import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Header,
  InputField,
  Button,
  InputPassword,
} from "../../common/components";
import { FONTS, SAFEAREAVIEW, SIZES } from "../../common/constants";
import { showMessage } from "react-native-flash-message";
import { post } from "../../common/functions/http";
import { Formik } from "formik";
import * as Yup from "yup";

export default function NewPassword() {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const { email, otp } = route.params;
  const [showPasswords, setShowPasswords] = useState(false);

  const NewPasswordFormSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Tu contraseña debe ser más de 6 caracteres.")
      .matches(
        /^(?=.*[A-Z])(?=.*\W).+$/,
        "Debe contener al menos un carácter especial y una letra en mayúscula"
      )
      .required("Campo requerido"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Confirmación de contraseña requerida"),
  });

  function renderContent() {
    return (
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={async (values) => {
          setLoading(true);

          const { data } = await post("/forgot-pass", {
            email,
            otp,
            password: values.password,
          });

          if (data.status === 400) {
            setLoading(false);
            return showMessage({
              message: "Error",
              description: "Algo ha ocurrido... intente más tarde",
              type: "danger",
            });
          }
          setLoading(false);

          navigation.navigate("PasswordHasBeenReset");
        }}
        validationSchema={NewPasswordFormSchema}
        validateOnMoun={true}
        validateOnBlur={{ email: true, password: true, confirmPassword: true }}
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
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 30,
              alignItems: "center",
              paddingVertical: SIZES.paddingVertical,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={{ ...FONTS.H2, marginBottom: 15 }}>
              Ahora escribe tu nueva contraseña...
            </Text>

            <InputPassword
              placeholder="Nueva Contraseña"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={touched.password ? errors.password : false}
              touched={touched.password}
              contaynerStyle={{ marginBottom: 20 }}
              icon={true}
              showPasswords={showPasswords}
              setShowPasswords={setShowPasswords}
            />
            <InputPassword
              placeholder="Confirmar Contraseña"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              error={touched.confirmPassword ? errors.confirmPassword : false}
              touched={touched.confirmPassword}
              contaynerStyle={{ marginBottom: 10 }}
              icon={true}
              setShowPasswords={setShowPasswords}
              showPasswords={showPasswords}
            />

            <Button
              valid={isValid}
              loading={loading}
              title="Actualizar"
              onPress={handleSubmit}
            />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    );
  }

  return (
    <View style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Resetear Contraseña" onPress={() => navigation.goBack()} />
      {renderContent()}
    </View>
  );
}
