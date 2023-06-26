import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  useStripe,
} from "@stripe/stripe-react-native";
import { post, upload } from "../common/functions/http";
import { Alert } from "react-native";
const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [coordenates, setCoordenates] = useState(null);
  const [token, setToken] = useState(null);
  const stripe = useStripe();

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
      if (data.status === 200 || data.status === true) {
        navigation.navigate("MainLayout");
      }
      setLoading(false);
    },
    []
  );

  const getBannersFn = useCallback(async (type, token) => {
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
  }, []);

  const paySubscriptionFn = useCallback(
    async (priceId = "", email, navigation, setLoading, token) => {
      const { data } = await post(
        "/create_payment",
        {
          priceId,
          email: "david@gamil.com",
        },
        token
      );

      const { error } = await stripe.initPaymentSheet({
        customerId: data.data.sessionId,
        merchantDisplayName: 'Ruédalo',
        defaultShippingDetails: false,
        googlePay: true,
        primaryButtonLabel: "Pagar",
        setupIntentClientSecret: data.data.client_secret.client_secret
      });

      if (error) {
        console.log(`Error code: ${error.code}, message: ${error.message}`);
      } else {
        console.log("Success!!");
      }

      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.data.client_secret.client_secret,
      });
      if (presentSheet.error) {
        console.log(`Error code: ${presentSheet.code}, message: ${presentSheet.message}`);
      } else {
        console.log("Success presentSheet");

      }

      // await stripe.initPaymentSheet({
      //   customerId: '',
      //   merchantDisplayName: 'Ruédalo',
      //   paymentIntentClientSecret: '',
      //   customerEphemeralKeySecret: '',
      //   setupIntentClientSecret: data.data.client_secret.client_secret
      // });
    },
    []
  );

  return (
    <UserContext.Provider
      value={{
        //Variables
        coordenates,
        setCoordenates,
        //Functions
        updateUserFn,
        getBannersFn,
        paySubscriptionFn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
export const useUserContext = () => useContext(UserContext);
