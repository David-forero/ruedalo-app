import { useContext, createContext, useState, useCallback } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { post, upload, get } from "../common/functions/http";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sentry from "sentry-expo";
import { getNotificationInbox, getIndieNotificationInbox } from "native-notify";
import { useAuthContext } from "./AuthContext";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [coordenates, setCoordenates] = useState(null);
  const [documentsVehicles, setDocumentsVehicles] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const stripe = useStripe();

  const [transactions, setTransactions] = useState(null);

  const forgotPasswordFn = useCallback(async (form, setLoading) => {
    const { data } = await post("/forgot-pass", form);
    if (data.status === 400 || !data) {
      return;
    }

    setLoading(false);
  }, []);

  const updateUserFn = useCallback(
    async (form, token, setLoading, setUser, navigation) => {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("lastname", form.lastname);
      formData.append("phone", form.phone);
      if (form.image) {
        formData.append("files", form.image);
      }
      const { data } = await upload("/update_user", formData, token);
      if (data.status === 400 || !data) {
        return;
      }

       setUser(data.data);
       let dataString = JSON.stringify(data.data);

       await AsyncStorage.setItem("user", dataString);
      if (data.status === 200 || data.status === true) {
        navigation.navigate("MainLayout");
      }
      setLoading(false);
    },
    []
  );

  const getBannersFn = useCallback(async (type, token) => {
    try {
      const { data } = await post(
        "/list_campaign",
        {
          limit: 10,
          offset: 0,
        },
        token
      );

      let rows = data.body.data.rows;
      let res = rows.filter((item) => item.type === type);
      return res;
    } catch (error) {
      Sentry.Native.captureException(error);
    }
  }, []);

  const paySubscriptionFn = useCallback(
    async (priceId = "", navigation, setLoading, token, setUser) => {
      const { data } = await post(
        "/create_payment",
        {
          priceId,
        },
        token
      );

      let session = data.session;

      const { error } = await stripe.initPaymentSheet({
        customerId: session.customer.id,
        merchantDisplayName: "Ruédalo",
        defaultShippingDetails: false,
        customerEphemeralKeySecret: session.ephemeralKey.secret,
        googlePay: true,
        primaryButtonLabel: "Pagar",
        paymentIntentClientSecret: session.paymentIntent.client_secret,
        setupIntentClientSecret: session.paymentIntent.client_secret,
      });

      if (error) {
        console.error("⭕️", error);
      } else {
        console.log("Success!!");
      }

      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: session.client_secret.client_secret,
      });

      setLoading(false);

      if (presentSheet.error) {
        console.log('⭕️ Error presentPaymentSheet:');
      } else {
        const { data } = await post(
          "/check_payment",
          {
            paymentId: session.paymentIntent.id,
            customerId: session.customer.id,
            priceId
          },
          token
        );

        if (data.status === true || data.status == 200) {
          setLoading(true);
          setUser(data.data);
          let dataString = JSON.stringify(data.data);

          await AsyncStorage.setItem("user", dataString);

          setLoading(false);
          navigation.navigate("SuccessScreen", {
            screen: "Profile",
            title: "Compra realizada",
            description:
              "Se ha hecho la compra correctamente, disfruta de tus beneficios",
            titleButton: "Aceptar",
          });
        }
      }

      
    },
    []
  );

  const getListDocsFn = useCallback(async (token, setLoading) => {
    const { data } = await get("/list_docs", token);
    setLoading(false);
    setDocumentsVehicles(data.body.data.rows);
  }, []);

  const deleteDocumentVehicleFn = useCallback(async (id, token, setLoading) => {
    setLoading(true);
    await post("/delete_doc", { id }, token);
    getListDocsFn(token, setLoading);
  }, []);

  const saveDocumentVehicleFn = useCallback(
    async (formData, setLoading, token, setShowModal, navigation) => {
      await post("/register_doc", formData, token);
      setLoading(false);
      setShowModal(false);
      navigation.navigate("SuccessScreen", {
        screen: "MainLayout",
        title: "Documento del vehiculo agregado",
        description: "Se ha agregado tu documento correctamente",
        titleButton: "Aceptar",
      });
    },
    []
  );

  const updateDocumentVehicleFn = useCallback(
    async (formData, setLoading, token, setShowModal) => {
      await post("/update_doc", formData, token);

      setLoading(false);
      setShowModal(false);

      showMessage({
        message: "Documento del vehiculo agregado",
        type: "success",
      });
    },
    []
  );

  const getTransactionsAppFn = useCallback(async (setLoading, token) => {
    const { data } = await post(
      "/list_payments",

      {
        limit: 10,
        offset: 0,
      },
      token
    );
    setLoading(false);
    setTransactions(data.data.rows);
  }, []);

  const getListNotifFn = useCallback(async (setLoading, token) => {
    const [notificationsGeneral, notificationsUser] = await Promise.all([
      getNotificationInbox(9483, "bqoXH6eT0xaUSZiecB9LHV"),
      getIndieNotificationInbox(
        `${user?.email}`,
        9483,
        "bqoXH6eT0xaUSZiecB9LHV"
      ),
    ]);

    let totalNotifications = [...notificationsUser, ...notificationsGeneral];
    // totalNotifications.forEach((notification) => {
    //   notification.date = convertToDate(notification.date);
    // });
    totalNotifications.sort((a, b) => b.date - a.date);
    setNotifications(totalNotifications);

    setLoading(false);
    // setNotifications(data.data.rows);
  }, []);

  const unsubscribeFn = async (setLoading, setShowModal, token, setUser, navigation) => {
    const { data } = await get("/down_plan", token);
    setLoading(false);
    setShowModal(false);
    if (data.status === true || data.status == 200) {
      setUser(data.data);
      let dataString = JSON.stringify(data.data);
      await AsyncStorage.setItem("user", dataString);

      
      navigation.navigate("SuccessScreen", {
        screen: "MainLayout",
        title: "Plan Cancelado",
        description: "Se ha cancelado tu membresia sin ningún problema",
        titleButton: "Aceptar",
      });
    } else {
      showMessage({
        message: data.message,
        type: "danger",
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        //Variables
        coordenates,
        documentsVehicles,
        setCoordenates,
        transactions,
        notifications,
        //Functions
        unsubscribeFn,
        updateUserFn,
        getBannersFn,
        paySubscriptionFn,
        getListDocsFn,
        saveDocumentVehicleFn,
        deleteDocumentVehicleFn,
        updateDocumentVehicleFn,
        getTransactionsAppFn,
        forgotPasswordFn,
        getListNotifFn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
export const useUserContext = () => useContext(UserContext);