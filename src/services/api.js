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

export const logOut = () => {
  localStorage.removeItem("token");
};

export const deleteAccount = async (params) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/users/${params}`;
  return await delete_request(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* =================================================== PROFILE ========================================================== */
export const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/profile`;
  return await get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestEmailVerification = async (email) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/auth/requestVerification`;
  const data = new URLSearchParams();
  data.append("email", email);
  return await post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
