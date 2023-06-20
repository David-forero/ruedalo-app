import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { post, upload } from "../common/functions/http";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user2, setUser] = useState(null);
  const [coordenates, setCoordenates] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function init() {
      let coordenatesByUser = await AsyncStorage.getItem('coordenates');
      setCoordenates(JSON.parse(coordenatesByUser));
      console.log(JSON.parse(coordenatesByUser));
    }

    init();
  }, [])
  

  const updateUserFn = useCallback( async (form, token, setLoading, setUser, navigation) => {

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('lastname', form.lastname);
    formData.append('phone', form.phone);
    if (form.image) {
      formData.append('files', form.image);
    }
    console.log('lo que envio -> ',formData);
    const {data} = await upload('/update_user', formData, token);
    console.log('lo que recibo ->', data);
    if (data.status === 400) {
      return;
    }

    setUser(data.data);
    if (data.status === 200 || data.status === true) {
      navigation.navigate("MainLayout");
    }
    setLoading(false);

  },[]);

  const getUserFn = useCallback( async (data, token, setLoading) => {
    const myUser = await post('', form, token)
    setLoading(false);
  },[])

    
  return (
    <UserContext.Provider value={{
      //Variables
      coordenates,
      setCoordenates,
      //Functions
      updateUserFn,
      getUserFn
    }}>
        {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
export const useUserContext = () => useContext(UserContext);
