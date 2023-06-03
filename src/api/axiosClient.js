import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://opentdb.com/',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("Error response axios", error.response);
    const { config, status, data } = error.response
    if (config.url === '/auth/local/register' && status === 400) {
        const errorList = data.data || []
        const firstError = errorList.length > 0 ? errorList[0] : {}
        const messageList = firstError.messages || []
        const fistMassage = messageList.length > 0 ? messageList[0] : {}
        console.log("first massage", fistMassage.message);
        throw new Error(fistMassage.message)
    }
    return Promise.reject(error);
});
export default axiosClient