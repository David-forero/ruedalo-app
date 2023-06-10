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
  
    const getOrders = useCallback(async (token, setLoading) => {
      const {data} = await post("/list_order", {
        limit:10,
        offset: 0
      }, token);
      setLoading(false);
      console.log(data);
      setOrders(data.data)
    },[])
  
  
    return (
      <OrdersContext.Provider
        value={{
          //Variables
         
          orders,
          //Functions
          getOrders,
        }}
      >
        {children}
      </OrdersContext.Provider>
    );
  };
  
  export default OrdersProvider;
  
  export const useOrdersContext = () => useContext(OrdersContext);
  