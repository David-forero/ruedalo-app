import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { post, timeoutCustom } from "../common/functions/http";
import { useAuthContext } from "./AuthContext";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useNavigationCustom } from "../common/hooks";
import { log } from "react-native-reanimated";

const StoreContext = createContext({});

const StoreProvider = ({ children }) => {
  const { coordenatesPermitions } = useAuthContext();
  const navigation = useNavigation();

  //List products home
  const [forMyCar, setForMyCar] = useState(null);
  const [mostSells, setMostSells] = useState(null);
  const [myPlace, setMyPlace] = useState(null);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    initPlaceFn();
  }, []);

  async function initPlaceFn() {
    console.log('se ejecuta initPlace');

    if (!location || !myPlace) {
    console.log('🔎 buscando ubicacion');

      setLoadingLocation(true);
     try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      const placePromise = Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      const place = await timeoutCustom(5000, placePromise);
      setMyPlace(place);
     } catch (error) {
      console.error(error)
     }
      setLoadingLocation(false);
    }
  }

  const getListProductsFn = async (params, token, setLoading) => {
    const myParams = {
      // title: params.title || "repuesto",
      offset: params.offset || 0,
      limit: params.limit || 10,
      latitude: params.latitude || 28.626137,
      longitude: params.longitude || 28.626137,
      // distance: 15,
    };
    setLoading(false);
    return post("/list_product", myParams, token);
  };

  const getProductFn = useCallback(async (id, token, setLoading) => {
    const { data } = await post("/get_product", { id }, token);
    setProduct(data.data);
    setLoading(false);
  }, []);

  const checkoutProcessFn = useCallback(async (params, token) => {
    const res = await post("/create_order", params, token);
    return res;
  }, []);

  return (
    <StoreContext.Provider
      value={{
        //Variables
        forMyCar,
        mostSells,
        setForMyCar,
        setMostSells,
        product,
        myPlace,
        location,
        loadingLocation,
        //Functions
        getListProductsFn,
        getProductFn,
        checkoutProcessFn,
        initPlaceFn
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

export const useStoreContext = () => useContext(StoreContext);
