import axios from "axios";

const BASE_APP_URL = process.env.REACT_APP_API_URL;

export const getMealService = () => {
  return axios.get(`${BASE_APP_URL}/meals`);
};

export const getMealByIdService = (id) => {
  return axios.get(`${BASE_APP_URL}/meals/${id}`);
};
