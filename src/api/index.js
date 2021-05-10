import axios from 'axios';

/**
 * For development and debugging, set the baseURL to 'http://localhost:5000'
 */

export const BASE_URL = "https://construyo-express-backend.herokuapp.com/";

export const API = axios.create({
  baseURL: BASE_URL,
});