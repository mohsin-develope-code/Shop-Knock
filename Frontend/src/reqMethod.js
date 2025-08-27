import axios from "axios";


 const BASE_URL = "https://shop-knock.onrender.com/api"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

