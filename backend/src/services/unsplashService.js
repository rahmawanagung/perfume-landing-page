import axios from 'axios';
import 'dotenv/config';

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const getPerfumeImage = async (brand, name) => {
  if (!ACCESS_KEY) return 'https://via.placeholder.com/400';
  const query = `${brand} ${name} perfume bottle`;
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: query, per_page: 1, client_id: ACCESS_KEY },
    });
    if (response.data.results.length > 0) {
      return response.data.results[0].urls.regular;
    }
    return 'https://via.placeholder.com/400';
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error.message);
    return 'https://via.placeholder.com/400';
  }
};