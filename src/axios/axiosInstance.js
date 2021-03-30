import axios from 'axios';

export const baseURL = "https://localhost:44368/";

export default axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json;charset=UTF-8'  },
});
