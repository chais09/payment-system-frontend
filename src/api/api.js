import axios from "axios";

const api = axios.create({
    baseURL: "https://wise-payments-microservice.onrender.com",
});

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,   // just return response normally
    (error) => {
        if (error.response && error.response.status === 503) {
            // 🔥 Handle 503 here
            console.warn("Service unavailable — free tier may be exhausted.");

            // Example options:
            // 1️⃣ Show a UI toast / alert
            alert("⚠️ Service unavailable — free tier resource may be exhausted. Please try again later.");

            // 2️⃣ Or redirect to a fallback page
            // window.location.href = "/service-unavailable";

            // 3️⃣ Or attach a custom flag
            error.isServiceUnavailable = true;
        }

        return Promise.reject(error);
    }
);


export default api;
