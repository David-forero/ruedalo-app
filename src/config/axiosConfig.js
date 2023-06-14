import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://ruedalo.app/api',
    // timeout: 5000,
    // headers: {
    //     Authorization: `Bearer ${getToken()}` 
    // }
})

export default Axios;