import axios from "axios";

const axiosInstance = axios.create();

export const get = (url, config) => {
  return axiosInstance.get(url, config);
};

export const post = (url, data, config) => {
  return axiosInstance.post(url, data, config);
};

export const put = (url, data) => {
  return axios.put(url, data);
};

export const patch = (url, data) => {
  return axios.patch(url, data);
};

export const delete_request = (url, config) => {
  return axiosInstance.delete(url, config);
};
