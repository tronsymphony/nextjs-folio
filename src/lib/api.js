import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAYLOAD_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.PAYLOAD_API_KEY}`, 
  },
});

export const fetchArticles = async () => {
  try {
    const response = await api.get('/articles?limit=10'); // Adjust the limit as needed
    return response.data.docs; // Payload returns docs in the response
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};
