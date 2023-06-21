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

  // const checkoutProcessFn = useCallback(async (params, token) => {
  //   const res = await post("/create_order", params, token);
  //   return res
  // }, []);

  return (
    <ServicesContext.Provider
      value={{
        //Variables
        populars,
        mostSells,
        setPopulars,
        setMostSells,
        service,
        //Functions
        getListServicessFn,
        getServiceFn,
        // checkoutProcessFn,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;

export const useServicesContext = () => useContext(ServicesContext);
