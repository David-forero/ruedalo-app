import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { post } from "../common/functions/http";

const OrdersContext = createContext({});

const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(null);
  const [order, setOrder] = useState(null);

  const getOrders = useCallback(async (token, setLoading) => {
    const { data } = await post(
      "/list_order",
      {
        limit: 10,
        offset: 0,
      },
      token
    );
    setLoading(false);
    console.log(data);
    setOrders(data.data);
  }, []);

  const getOneOrder = useCallback(async (id, token, setLoading) => {
    const { data } = await post(
      "/get_order",
      {
        id,
      },
      token
    );
    setLoading(false);
    console.log("Get order ->", data);
    setOrder(data.data);
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        //Variables
        order,
        orders,
        //Functions
        getOrders,
        getOneOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;

export const useOrdersContext = () => useContext(OrdersContext);
