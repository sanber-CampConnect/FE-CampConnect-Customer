import axios from "axios";
import { get, post, put, patch, delete_request } from "../utils/HttpRequest";

const API_URL = import.meta.env.VITE_API_URL;

/* =================================================== Authentication ========================================================== */
export const authLogin = async (params) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, params);
    console.log(response);
    const token = response.data.authorization;
    localStorage.setItem("token", token);
    return response;
  } catch (error) {
    console.log("Login failed: ", error);
    throw error;
  }
};

export const authRegister = async (params) => {
  try {
    const response = await post(`${API_URL}/auth/register`, params);
    console.log(response);
    return response;
  } catch (error) {
    console.log("Register failed: ", error);
    throw error;
  }
};
