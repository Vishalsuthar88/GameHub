
import axios from 'axios'
const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";


export const fetchGames = async (params = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}/games`, {
            params: {
                key: API_KEY,

                ...params,
            },
        })
        return response.data;
    } catch (error) {
        console.error("Error fetching games: ", error);
        return null;
    }
}
export const fetchGameDetail = async (id, params = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}/games/${id}`, {
            params: {
                key: API_KEY,
                ...params,
            },
        })
        return response.data;
    } catch (error) {
        console.error("Error fetching game detail: ", error);
        return null;
    }
}

export const fetchGenres = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/genres`, {
            params: {
                key: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching genres: ", error);
        return null;
    }
};