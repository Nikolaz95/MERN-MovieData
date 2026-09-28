


export const getApiUrl = (endpoint, additionalQuery = '') => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    return `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}${additionalQuery}`;
};

export default getApiUrl;