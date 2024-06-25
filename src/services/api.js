import axios from "axios";
import {
  get,
  post,
  put,
  patch,
  patch_no_data,
  delete_request,
} from "../utils/HttpRequest";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

/* =================================================== Authentication ========================================================== */
export const authLogin = async (params) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, params);
    const token = response.data.authorization;
    const userData = response.data.data;
    localStorage.setItem("user", JSON.stringify(userData));
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

export const verifyAccount = async (tokenEmail) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/auth/verifyAccount?token=${tokenEmail}`;
  return await get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editProfile = async (params) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/profile/edit`;
  return await put(url, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = async (params) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/profile/changePassword`;
  return await put(url, params, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const forgotPassword = async (params) => {
  const url = `${API_URL}/auth/forgotPassword`;
  return await api.post(url, params);
};

export const resetPassword = async (token, params) => {
  const url = `${API_URL}/auth/resetPassword?token=${token}`;
  return await api.post(url, params);
};

/* =================================================== Catalogue ========================================================== */

export const getAllProduct = async () => {
  const url = `${API_URL}/products`;
  return await get(url);
};

export const getProductCategories = async () => {
  const url = `${API_URL}/categories`;
  return await get(url);
};

export const getDetailProduct = async (id) => {
  const url = `${API_URL}/products/${id}`;
  return await get(url);
};

export const addToCart = async (params) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/cartItems`;
  return await post(url, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* =================================================== GET MEDIA IMAGE ========================================================== */
export const getMediaUser = (media) => {
  return `${API_URL}/assets/${media}`;
};

export const getMediaProduct = async (media) => {
  const url = `${API_URL}/assets/${media}`;
  try {
    const response = await axios.get(url, {
      responseType: "blob",
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

/* =================================================== CART ========================================================== */
export const getCartItems = async (cartId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/carts/${cartId}`;
  return await get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCartItems = async (cartItemsId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/cartItems/${cartItemsId}`;
  return await delete_request(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postCheckout = async (params) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/orders`;
  return await post(url, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* =================================================== Order ========================================================== */
export const getMyOrders = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/orders/my`;
  return await get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProductOrder = async (orderId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/orders/${orderId}`;
  return await get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cancelOrder = async (orderId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/orders/${orderId}/cancel`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await patch_no_data(url, config);
};

/* =================================================== Payment ========================================================== */

export const submitTransactionEvidence = async (transactionId, file) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_URL}/transactions/${transactionId}/upload`;
  return await patch(url, file, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
