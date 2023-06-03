import axiosClient from "./axiosClient"

const questionApi = {
    getAll(params) {
        const url = '/api.php'
        return axiosClient.get(url, {
            params: params
        })
    }
}
export default questionApi