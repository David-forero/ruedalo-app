import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../../common/constants";
import Modal from "react-native-modal";
import { Check, InputField } from "../../../common/components";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useState } from "react";
import dayjs from "dayjs";
import { Dropdown } from "react-native-element-dropdown";
import { useAuthContext } from "../../../context/AuthContext";
import { useUserContext } from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";

const AddVehicle = ({
  showModal,
  setShowModal,
  isUpdate = false,
  dataEdit,
}) => {
  const [showExpirationDoc, setShowExpirationDoc] = useState(false);
  const [showEmisionDoc, setShowEmisionDoc] = useState(false);
  const [isFocusType, setIsFocusType] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { saveDocumentVehicleFn, getListDocsFn } = useUserContext();
  const [remember, setRemember] = useState(false);

  const AddVehicleSchema = Yup.object().shape({
    emission_date: Yup.string().required("Campo requerido"),
    expiration_date: Yup.string().required("Campo requerido"),
    type: Yup.string().required("Campo requerido"),
  });

  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={setShowModal}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      style={{ margin: 0 }}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <Formik
        initialValues={{
          emission_date: dataEdit?.emission_date || new Date(),
          expiration_date: dataEdit?.expiration_date || new Date(),
          type: dataEdit?.type || "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          if (isUpdate) {
          } else {
            await saveDocumentVehicleFn(
              values,
              setLoading,
              user?.token,
              setShowModal,
              navigation
            );
          }
          getListDocsFn(user?.token, setLoading);
        }}
        validationSchema={AddVehicleSchema}
        validateOnMount
      >
        {({
          handleSubmit,
          setFieldValue,
          errors,
          values,
          touched,
          isValid,
        }) => (
          <View
            style={{
              width: SIZES.width - 60,
              backgroundColor: COLORS.white,
              marginHorizontal: 30,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 34,
            }}
          >
            <Text className="font-bold text-md mb-3 text-left text-gray-700">
              Tipo de documento
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocusType && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={[
                { label: "RCV", value: "RCV" },
                { label: "Lincencia de conducir", value: "License" },
                { label: "Seguro médico", value: "Medic" },
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              disable={isUpdate}
              placeholder={!isFocusType ? "Selecciona" : "..."}
              value={values.type}
              onFocus={() => setIsFocusType(true)}
              onBlur={() => setIsFocusType(false)}
              onChange={(item) => {
                setFieldValue("type", item.value);
                setIsFocusType(false);
              }}
            />

            <TouchableOpacity onPress={() => setShowEmisionDoc(true)}>
              <Text className="font-bold text-md mb-3 text-left text-gray-700">
                Fecha de emisión
              </Text>
              <InputField
                error={touched.emission_date ? errors.emission_date : false}
                touched={touched.emission_date}
                editable={false}
                value={dayjs(values.emission_date).format("DD/MM/YYYY")}
                contaynerStyle={{ marginBottom: 13 }}
              />
            </TouchableOpacity>

            {showEmisionDoc && (
              <DateTimePicker
                mode="date"
                // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                value={values.emission_date}
                maximumDate={new Date(2023, 10, 20)}
                locale="es-ES"
                positiveButton={{ label: "Confirmar", textColor: "black" }}
                negativeButton={{ label: "Cancelar", textColor: COLORS.orange }}
                positiveButtonLabel="Confirmar"
                negativeButtonLabel="Cancelar"
                onChange={(e, selectedValue) => {
                  setShowEmisionDoc(false);
                  setFieldValue("emission_date", selectedValue);
                }}
              />
            )}

            <TouchableOpacity onPress={() => setShowExpirationDoc(true)}>
              <Text className="font-bold text-md mb-3 text-left text-gray-700">
                Fecha de vencimiento
              </Text>
              <InputField
                editable={false}
                value={dayjs(values.expiration_date).format("DD/MM/YYYY")}
                contaynerStyle={{ marginBottom: 13 }}
              />
            </TouchableOpacity>

            {showExpirationDoc && (
              <DateTimePicker
                mode="date"
                // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                value={values.expiration_date}
                maximumDate={new Date(2023, 10, 20)}
                locale="es-ES"
                positiveButton={{ label: "Confirmar", textColor: "black" }}
                negativeButton={{ label: "Cancelar", textColor: COLORS.orange }}
                positiveButtonLabel="Confirmar"
                negativeButtonLabel="Cancelar"
                onChange={(e, selectedValue) => {
                  setShowExpirationDoc(false);
                  setFieldValue("expiration_date", selectedValue);
                }}
              />
            )}

            <View
              style={{
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginBottom: 30,
                  alignItems: "center",
                  marginLeft: 20,
                }}
                onPress={() => setRemember(!remember)}
              >
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: COLORS.green,
                    marginRight: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {remember && <Check />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...FONTS.Roboto_400Regular,
                      fontSize: 12,
                      marginLeft: 3,
                      color: COLORS.gray2,
                      lineHeight: 16 * 1.3,
                      flexDirection: "row",
                    }}
                  >
                    Recordarme con una notificación si está por vencerse este documento
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 130,
                  height: 40,
                  backgroundColor: COLORS.lightRed,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 7.5,
                }}
                onPress={() => setShowModal(false)}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.Roboto_700Bold,
                    fontSize: 16,
                    color: COLORS.red,
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 130,
                  height: 40,
                  backgroundColor: COLORS.black,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 7.5,
                  opacity: isValid ? 1 : 0.5,
                }}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.Roboto_700Bold,
                    fontSize: 16,
                  }}
                >
                  {loading ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                  ) : (
                    "Guardar"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    backgroundColor: "#F4F4F5",
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AddVehicle;
