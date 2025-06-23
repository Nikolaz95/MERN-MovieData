


export const getApiUrl = (endpoint, additionalQuery = '') => {
    const apiKey = 'd0e15d3cd703e39934833d9dc348e907';
    return `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}${additionalQuery}`;
};

export default getApiUrl;