import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { post } from "../common/functions/http";

const StoreContext = createContext({});

const StoreProvider = ({ children }) => {
  //List products home
  const [forMyCar, setForMyCar] = useState(null);
  const [mostSells, setMostSells] = useState(null);

  const [product, setProduct] = useState(null);

  const getListProductsFn = async (params, token, setLoading) => {
    const myParams = {
      // title: params.title || "repuesto",
      offset: params.offset || 0,
      limit: params.limit || 10,
      latitude: params.latitude || 28.626137,
      longitude: params.longitude || 28.626137,
      // distance: 5,
    };
    setLoading(false);
    return post("/list_product", myParams, token);
  };

  const getProductFn = useCallback( async (id, token, setLoading) => {
    const {data} = await post("/get_product", {id}, token);
    setProduct(data.data);
    setLoading(false);
  }, []);

  const checkoutProcessFn = useCallback(async (params, token) => {
    const res = await post("/create_order", params, token);
    console.log(res);
    return res
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
        //Functions
        getListProductsFn,
        getProductFn,
        checkoutProcessFn,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

export const useStoreContext = () => useContext(StoreContext);
