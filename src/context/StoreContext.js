import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { post, timeoutCustom } from "../common/functions/http";
import * as Location from "expo-location";
import { useAuthContext } from "./AuthContext";
import * as Sentry from "sentry-expo";

const StoreContext = createContext({});

const StoreProvider = ({ children }) => {
  //List products home
  const [forMyCar, setForMyCar] = useState(null);
  const [mostSells, setMostSells] = useState(null);
  const [myPlace, setMyPlace] = useState(null);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [product, setProduct] = useState(null);
  const { auth } = useAuthContext();
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    if (auth) {
      initPlaceFn();
    }
  }, [auth]);

  async function initPlaceFn() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted" && auth) {
      if (!location || !myPlace) {
        console.log("🔎 buscando ubicacion");

        setLoadingLocation(true);
        try {
          const locationPromise = Location.getLastKnownPositionAsync({});
          const location = await timeoutCustom(5000, locationPromise);
          setLocation(location.coords);
          if (!location?.coords) {
            return;
          }
          const placePromise = Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          const place = await timeoutCustom(5000, placePromise);
          setMyPlace(place);
        } catch (error) {
          console.error("🔴 Erroooooor --->", error);
          Sentry.Native.captureException(error);
        }
        setLoadingLocation(false);
      }
    }
  }

  const searchFn = async (params, token, setLoading) => { 
    const myParams = {
      title: params.query,
      offset: params.offset || 0,
      limit: params.limit || 10,
      latitude: params.latitude || 28.626137,
      longitude: params.longitude || 28.626137,
      // distance: 15,
    };
    const { data } = await post("/list_product", myParams, token);
    setLoading(false);
    console.log('buscador -->',data);
    setSearchList(data);
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
        searchList,
        //Functions
        getListProductsFn,
        getProductFn,
        checkoutProcessFn,
        initPlaceFn,
        searchFn
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

export const useStoreContext = () => useContext(StoreContext);
