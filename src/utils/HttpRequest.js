import axios from "axios";

export const get = (url) => {
  return axios.get(url);
};

export const post = (url, data) => {
  return axios.post(url, data);
};

export const put = (url, data) => {
  return axios.put(url, data);
};

export const patch = (url, data) => {
  return axios.patch(url, data);
};

export const delete_request = (url) => {
  return axios.delete(url);
};
