import React, { useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
// import Carousel from 'react-native-snap-carousel-v4'
import { useNavigation } from "@react-navigation/native";
import { Header, InputField } from "../../common/components";
import { COLORS, FONTS, SIZES } from "../../common/constants";
import Modal from "react-native-modal";
import * as Yup from "yup";
import Wizard from "react-native-wizard";
import {
  BoxForm,
  FuelForm,
  CarForm,
  InfoAboutCar,
  OilForm,
} from "../components/Cars";
import { Formik } from "formik";
import { useMyCarsContext } from "../../context/MyCarsContext";
import { useAuthContext } from "../../context/AuthContext";

export default function AddCarForm() {
  const wizard = useRef(null);
  const {addVehicleFn} = useMyCarsContext();
  const {user} = useAuthContext();

  const [fullData, setFullData] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [myYear, setMyYear] = useState(null);
  const [myMakes, setMyMakes] = useState(null);
  const [myModels, setMyModels] = useState(null);
  const [myTrims, setMyTrims] = useState(null);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedTrim, setSelectedTrim] = useState(null);

  const [kilometraje, setKilometraje] = useState(null);
  const [dateAceite, setDateAceite] = useState(null);
  const [dateCauchos, setDateCauchos] = useState(null);
  

  const DetailsCarFormSchema = Yup.object().shape({
    aceite: Yup.string().required("Campo requerido"),
    neumaticos: Yup.string().required("Campo requerido"),
    bateria: Yup.string().required("Campo requerido"),
    kilometraje: Yup.string().required("Campo requerido"),
  });

  const navigation = useNavigation();
  const stepList = [
    {
      content: (
        <CarForm
        setMyYear={setMyYear}
        setMyMakes={setMyMakes}
        setMyModels={setMyModels}
        setMyTrims={setMyTrims}
          setSelectedYear={setSelectedYear}
          setSelectedModel={setSelectedModel}
          setSelectedBrand={setSelectedBrand}
          selectedYear={selectedYear}
          selectedModel={selectedModel}
          selectedBrand={selectedBrand}
          selectedTrim={selectedTrim}
          setSelectedTrim={setSelectedTrim}
        />
      ),
    },
    {
      content: <FuelForm />,
    },
    {
      content: <BoxForm />,
    },
    {
      content: <OilForm />,
    },
    {
      content: (
        <Formik
          initialValues={{ aceite: new Date(), neumaticos: new Date(), bateria: new Date(), kilometraje: "" }}
          onSubmit={(values) => {}}
          validationSchema={DetailsCarFormSchema}
          validateOnMount
        >
          {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, setFieldValue }) => (
            <InfoAboutCar
              values={values}
              setFullData={setFullData}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isValid={isValid}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
            />
          )}
        </Formik>
      ),
    },
  ];

  function ConfimModal() {
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
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Roboto_700Bold,
              fontSize: 16,
              marginBottom: 19,
            }}
          >
            Diagnóstico del Vehículo
          </Text>

          <Text
            style={{
              textAlign: "center",
              ...FONTS.Roboto_400Regular,
              fontSize: 12,
              marginBottom: 30,
            }}
          >
            ¿Desea recibir notificaciones y sugerencias sobre el funcionamiento
            de tu vehículo?
          </Text>
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
              onPress={() => {
                setShowModal(false);
                navigation.navigate("CreateCardSuccess");
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Roboto_700Bold,
                  fontSize: 16,
                  color: COLORS.red,
                }}
              >
                Quizás luego
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 130,
                height: 40,
                backgroundColor: COLORS.black2,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 7.5,
              }}
              onPress={() => {
                setShowModal(false);
                navigation.navigate("CreateCardSuccess");
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Roboto_700Bold,
                  fontSize: 16,
                }}
              >
                Seguro
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        justifyContent: "space-around",
        paddingVertical: 40,
        height: "100%",
      }}
    >
      {<ConfimModal />}

      <Wizard
        ref={wizard}
        steps={stepList}
        isFirstStep={(val) => setIsFirstStep(val)}
        isLastStep={(val) => setIsLastStep(val)}
        onNext={() => {}}
        onPrev={() => {}}
        currentStep={({ currentStep, isLastStep, isFirstStep }) => {
          setCurrentStep(currentStep);
        }}
      />

      <View className="mt-6">
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            // disabled={isFirstStep}
            onPress={() => {
              if (currentStep == 0) return navigation.goBack()
              wizard.current.prev()
            }}
            style={{
              width: 100,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.orange,
              zIndex: 1,
            }}
            className="rounded-r-full"
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                color: COLORS.white,
                textTransform: "capitalize",
                ...FONTS.Roboto_500Medium,
              }}
            >
             {currentStep == 0 ? "Salir" : "Atrás"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            // disabled={isLastStep}
            onPress={() => {
              if (currentStep == 4) {
                addVehicleFn(fullData, {myYear, myMakes, myModels, myTrims},navigation, user?.token)
                // setShowModal(true);
              }
              wizard.current.next();
            }}
            className="rounded-l-full"
            style={{
              width: 100,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.orange,
              zIndex: 1,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                color: COLORS.white,
                textTransform: "capitalize",
                ...FONTS.Roboto_500Medium,
              }}
            >
              {" "}
              {currentStep == 4 ? "Agregar vehículo" : "Siguiente"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
