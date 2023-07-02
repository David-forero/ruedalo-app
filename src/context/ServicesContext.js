import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { post } from "../common/functions/http";

const ServicesContext = createContext({});

const ServicesProvider = ({ children }) => {
  //List products home
  const [populars, setPopulars] = useState(null);
  const [mostSells, setMostSells] = useState(null);
  const [service, setService] = useState(null);
  const [commerce, setCommerce] = useState(null);
  const [catalog, setCatalog] = useState(null)

  const getListServicessFn = async (params, token, setLoading) => {
    const myParams = {
      // title: params.title || "repuesto",
      offset: params.offset || 0,
      limit: params.limit || 10,
      latitude: params.latitude || 28.626137,
      longitude: params.longitude || 28.626137,
      // distance: 15,
    };
    setLoading(false);
    return post("/list_service", myParams, token);
  };

  const getServiceFn = useCallback(async (id, token, setLoading) => {
    const { data } = await post("/get_service", { id }, token);
    setService(data.data);
    setLoading(false);
  }, []);

  const getCommerceFn = useCallback(async (id, token, setLoading) => {
    const { data } = await post("/get_commerce", { id }, token);
    setCommerce(data.data);
    setLoading(false);
  }, []);

  const listServicesCommmerceFn = useCallback(async (id, category = null, token, setLoading) => {
    let prepareBody = {
      offset: 0,
      limit: 20,
      id_commerce: id
    }
    if (category) prepareBody.id_category = category

    console.log('prepare service ->',prepareBody);
    const { data } = await post("/list_service_commerce", prepareBody, token);
    setCatalog(data.data);
    setLoading(false);
  }, []);

  const listProductsCommmerceFn = useCallback(async (id, category = null, token, setLoading) => {
    let prepareBody = {
      offset: 0,
      limit: 20,
      id_commerce: id
    }
    if (category) prepareBody.id_category = category
    const { data } = await post("/list_product_commerce", prepareBody, token);
    setCatalog(data.data.rows);
    setLoading(false);
  }, []);

  return (
    <ServicesContext.Provider
      value={{
        //Variables
        populars,
        mostSells,
        setPopulars,
        setMostSells,
        service,
        commerce,
        catalog,
        //Functions
        getListServicessFn,
        getServiceFn,
        getCommerceFn,
        listServicesCommmerceFn,
        listProductsCommmerceFn
        // checkoutProcessFn,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;

export const useServicesContext = () => useContext(ServicesContext);
