import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    return user?.token
}

const Axios = axios.create({
    baseURL: 'https://repuestosya.cobrex.com.ve/api',
    // timeout: 5000,
    headers: {
        Authorization: getToken() 
    }
})

export default Axios;