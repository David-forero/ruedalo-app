import Axios from "../../config/axiosConfig";
// import {ERROR_UNKNOWN} from '../constants/messages';

const get = async (url, token = '') => {
    try {
        return await Axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    } catch (error) {
        console.error('❌ Error ->', error);
       return {
            data: {
                status: error.response.data.status, message: error.response.data.message, data: false
            }
        }
        // return {data: {status: 500, message: ERROR_UNKNOWN, data: false}}
    }
}

const post = async (url, data, token = '') => {
    try {
        return await Axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    } catch (error) {
        console.error('❌ Error ->', error);
        return {
            data: {
                status: error.response.data.status, message: error.response.data.message, data: false
            }
        }
        // return {data: {status: 500, message: ERROR_UNKNOWN, data: false}}
    }
}

const put = async (url, data) => {
    try {
        return await Axios.get(url, data);

    } catch (error) {
        console.error('❌ Error ->', error);
       return {
            data: {
                status: error.response.data.status, message: error.response.data.message, data: false
            }
        }
        // return {data: {status: 500, message: ERROR_UNKNOWN, data: false}}
    }
}

const patch = async (url, data) => {
    try {
        return await Axios.patch(url, data);

    } catch (error) {
        console.error('❌ Error ->', error);
       return {
            data: {
                status: error.response.data.status, message: error.response.data.message, data: false
            }
        }
        // return {data: {status: 500, message: ERROR_UNKNOWN, data: false}}
    }
}

const delet = async (url, data) => {
    try {
        return await Axios.delete(url, data);

    } catch (error) {
        console.error('❌ Error ->', error);
       return {
            data: {
                status: error.response.data.status, message: error.response.data.message, data: false
            }
        }
        // return {data: {status: 500, message: ERROR_UNKNOWN, data: false}}
    }
}

const upload = async (url, data, token) => {
    try {
        return await Axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });

    } catch (error) {
       return {
        data: {
            status: error.response.data.status, message: error.response.data.message, data: false
        }
        }
        // return {data: {status: 500, message: ERROR_UNKNOWN, data: false}}
    }
}

function timeoutCustom(ms, promise) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Promise timed out!"));
      }, ms);
  
      promise
        .then((value) => {
          clearTimeout(timer);
          resolve(value);
        })
        .catch((reason) => {
          clearTimeout(timer);
          reject(reason);
        });
    });
  }


export {
    get,
    post,
    put,
    patch,
    delet,
    upload,
    timeoutCustom
}