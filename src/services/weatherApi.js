import axios from "axios";

// Récupération de la clé API et de l'URL depuis les variables d'environnement
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;

//Configuration d'une instance Axios avec l'URL de base et les paramètres par défaut
const apiClient = axios.create({
    baseURL: BASE_URL,
    params: {
        appid: API_KEY,
        units: "metric", 
        lang: "fr",
    },
});


/**
 * Fonction pour obtenir les données météo par ville
 * @param {string} city - Nom de la ville
 * @returns {Promise<Object>} Données météo
 */
export const getWeatherByCity = async (city) => {
    try {
        const response = await apiClient.get("/weather", {
            params: { q: city },
        });

        return formatWeatherData(response.data)

    } catch (error) {

        if (error.response?.status === 404) {
            throw new Error('Ville non trouvée. Vérifiez l\'orthographe.')
        } else if (error.response?.status === 401) {
            throw new Error('Clé API invalide. Vérifiez votre configuration.')
        } else if (error.code === 'ECONNABORTED') {
            throw new Error('Délai d\'attente dépassé. Vérifiez votre connexion.')
        } else {
            throw new Error('Erreur lors de la récupération des données météo.')
        }
    }
};


/**
 * Formate les données météo de l'API
 * @param {Object} data - Données brutes de l'API
 * @returns {Object} Données formatées
 */
const formatWeatherData = (data) => {
    return {
        id: data.id,
        name: data.name,
        country: data.sys?.country || '',
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind_speed: data.wind.speed,
        visibility: data.visibility,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        timestamp: data.dt,
    }
}

export default {
    getWeatherByCity,
}

