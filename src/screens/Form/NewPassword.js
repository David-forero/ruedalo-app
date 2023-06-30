import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Header, InputField, Button } from "../../common/components";
import { FONTS, SAFEAREAVIEW, SIZES } from "../../common/constants";
import { showMessage } from "react-native-flash-message";
import { post } from "../../common/functions/http";

export default function NewPassword() {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const { email, otp } = route.params;

  const handleSubmit = async () => {
    setLoading(true);
    if (!password) {
      setLoading(false);
      return showMessage({
        message: "Error del formulario",
        description: "No dejar campos vacios",
        type: "danger",
      });
    }

    if (password !== confirmPassword) {
      setLoading(false);
      return showMessage({
        message: "Error del formulario",
        description: "Las contraseñas no coinciden",
        type: "danger",
      });
    }

    const { data } = await post("/forgot-pass", {
      email,
      otp,
      password
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
  };

  function renderContent() {
    return (
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

        <InputField
          value={password}
          placeholder="Nueva Contraseña"
          contaynerStyle={{ marginBottom: 15 }}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <InputField
          value={confirmPassword}
          placeholder="Confirmar Contraseña"
          contaynerStyle={{ marginBottom: 30 }}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        <Button loading={loading} title="Actualizar" onPress={handleSubmit} />
      </KeyboardAwareScrollView>
    );
  }

  return (
    <View style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Resetear Contraseña" onPress={() => navigation.goBack()} />
      {renderContent()}
    </View>
  );
}
