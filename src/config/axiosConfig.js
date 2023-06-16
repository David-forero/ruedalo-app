import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://backend.ruedalo.app/api',
    // timeout: 5000,
    // headers: {
    //     Authorization: `Bearer ${getToken()}` 
    // }
})

export default Axios;