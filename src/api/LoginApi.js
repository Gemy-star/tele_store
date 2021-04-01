import axiosInstance, {API_URL} from "../axios/axiosInstance";


export const login = (body) =>   {
    return axiosInstance.post(`${API_URL}/login`, body )
}

export const register = (body) =>   {
    console.log("register",body);
    return axiosInstance.post(`${API_URL}/register`, body )
}