import axios from "axios";

const api = axios.create({
    baseURL: "https://wise-payments-microservice.onrender.com",
});

export default api;
