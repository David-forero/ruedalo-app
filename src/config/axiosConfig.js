import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://repuestosya.cobrex.com.ve/api',
    // timeout: 5000,
    // headers: {
    //     Authorization: `Bearer ${getToken()}` 
    // }
})

export default Axios;