import { useEffect } from "react";

export const useAuth = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        return true;
    } else {
        return false
    }
};

export const refreshToken = () => {

    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const TOKEN = import.meta.env.VITE_TOKEN;
    const refreshToken = localStorage.getItem("refreshToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetch(`${DB_ADDRESS}${TOKEN}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        refreshToken
                    })
                })
                    .then(response => response.json())
                    .then(data => localStorage.setItem("accessToken", data.accessToken));

            } catch (error) {
                console.error('Error pinging server:', error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 15 * 1000);

        return () => clearInterval(intervalId);
    }, []);
};
