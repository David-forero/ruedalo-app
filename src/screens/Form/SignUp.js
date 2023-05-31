import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Header, InputField, Button } from "../../common/components";
import { COLORS, FONTS, SAFEAREAVIEW, SIZES } from "../../common/constants";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../../context/AuthContext";

export default function SignUp() {
    const navigation = useNavigation();
    const {signUpFn} = useAuthContext();
    const [loading, setLoading] = useState(false);

    const SignUpFormSchema = Yup.object().shape({
        name: Yup.string().required('Campo requerido'),
        lastname: Yup.string().required('Campo requerido'),
        email: Yup.string().email('Correo inválido').required("Campo requerido"),
        password: Yup.string().min(
            6,
            "Tu contraseña debe ser más de 6 caracteres."
        )   .matches(/^(?=.*[A-Z])(?=.*\W).+$/, 'Debe contener al menos un carácter especial y una letra en mayúscula').required('Campo requerido'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
            .required('Confirmación de contraseña requerida')
    });
    

    function renderContent() {
        return (
            <Formik
                initialValues={{ name: '', lastname: '', email: "", password: "", confirmPassword: "" }}
                onSubmit={(values) => {
                    setLoading(true)
                    delete values.confirmPassword
                    console.log(values);
                    signUpFn(values, navigation, setLoading)
                }}
                validationSchema={SignUpFormSchema}
                validateOnMount
            >
                {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                }) => (
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            flexGrow: 1,
                            alignItems: "center",
                            paddingHorizontal: 30,
                            paddingVertical: SIZES.paddingVertical,
                        }}
                    >

                        <InputField
                            placeholder="Nombre"
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            value={values.name}
                            error={errors.name}
                        />

                        <InputField
                            placeholder="Apellido"
                            onChangeText={handleChange("lastname")}
                            onBlur={handleBlur("lastname")}
                            value={values.lastname}
                            error={errors.lastname}
                        />


                        <InputField
                            placeholder="Correo"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            error={errors.email}
                        />

                        <InputField
                            placeholder="Contraseña"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            textContentType="password"
                            secureTextEntry={true}
                            error={errors.password}

                        />
                        <InputField
                            placeholder="Confirmar Contraseña"
                            onChangeText={handleChange("confirmPassword")}
                            onBlur={handleBlur("confirmPassword")}
                            value={values.confirmPassword}
                            textContentType="password"
                            secureTextEntry={true}
                            error={errors.confirmPassword}
                        />
                        <View
                            style={{
                                width: "100%",
                            }}
                        >
                           
                        </View>

                        <Button
                            title="Crear Cuenta"
                            containerStyle={{
                                backgroundColor: COLORS.black2,
                                marginBottom: 28,
                            }}              
                            onPress={handleSubmit}
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "flex-end",
                                flex: 1,
                                marginBottom: 34,
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.Roboto_400Regular,
                                    fontSize: 16,
                                    color: COLORS.black,
                                }}
                            >
                                ¿Ya tienes cuenta?
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SignIn")}
                            >
                                <Text
                                    style={{
                                        ...FONTS.Roboto_700Bold,
                                        fontSize: 16,
                                        color: COLORS.orange,
                                    }}
                                >
                                    {" "}
                                    ¡Entra aquí!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                )}

            </Formik>
        );
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header title="Registro" onPress={() => navigation.goBack()} />
            <View className="mt-10">
                {renderContent()}
            </View>
        </SafeAreaView>
    );
}
