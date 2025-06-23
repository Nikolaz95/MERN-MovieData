import { useState, useEffect } from 'react';

const TMDB_API_KEY = 'd0e15d3cd703e39934833d9dc348e907';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const useApiFetch = (endpoint, params = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const queryParams = new URLSearchParams({ ...params, api_key: TMDB_API_KEY });

            try {
                const response = await fetch(`${TMDB_BASE_URL}/${endpoint}?${queryParams}`);
                /* if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`); */
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, params]);  // Dependency array bez nepotrebnih varijabli poput data, loading, error

    return { data, loading, error };
};

export default useApiFetch;
