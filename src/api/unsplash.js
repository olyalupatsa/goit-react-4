
import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com';
const ACCESS_KEY = '5puV4pinE_ARFGWbVkTRPFfY9ejW2AERXnS3Dj6uWvc'; 

export const fetchImages = async (query, page) => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
      query,
      page,
      per_page: 12,
      orientation: 'landscape', 
      client_id: ACCESS_KEY,
    },
  });
  return response.data;
};