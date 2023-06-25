import {
  useContext,
  createContext,
  useState,
  useCallback,
} from "react";
import { post } from "../common/functions/http";
// pk_test_51MLqmDGFUPnOrSP52erb66PXqhBdGZDJxnXZP6udhH5kIwuvuvgNQfgTSEHqXcVaSIkfe1sCbpq7ur76JlIIW1TA00zSDRDBUD

const OrdersContext = createContext({});

const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(null);
  const [order, setOrder] = useState(null);

  const sendStarFn = useCallback(async (body, token, setLoading) => {
    const { data } = await post("/rate_order", body, token);

    if (data.status === 200 || data.status === true) {
      const { data } = await post(
        "/get_order",
        {
          id: body.id,
        },
        token
      );
      setOrder(data.data);
    } else {
    }
    setLoading(false);
  }, []);

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
    setOrder(data.data);
    console.log('getOneOrder',data.data);
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
        sendStarFn,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;

export const useOrdersContext = () => useContext(OrdersContext);
