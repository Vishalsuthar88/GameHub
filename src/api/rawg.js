import React from 'react'
import axios from 'axios'
const API_KEY=process.env.REACT_APP_RAWG_API_KEY;
const BASE_URL="https://api.rawg.io/api";

export const fetchGames = async (params={})=>{
    try{
    const response = await axios.get(`${BASE_URL}/games`,{
        params:{
            key: API_KEY,
            
            ...params,
        },
    })
    console.log(response.data)
    return response.data;
} catch(error){
    console.error("Error fetching games: ", error);
    return null;
}
}