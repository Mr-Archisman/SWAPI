// src/services/countryService.ts
import axios from 'axios';

export const fetchPeopleFromUrl = async (url: string) => {
  const response = await axios.get(url);
  return response.data; // This includes both the array of people and the next URL for pagination
};
