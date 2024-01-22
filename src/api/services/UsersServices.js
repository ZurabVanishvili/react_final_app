import axios from "axios";

export const getUsersServices = (skip = 0) => {
  return axios.get(`https://dummyjson.com/users?limit=8&skip=${skip}&select`);
};

export const addUserService = (user) => {
  return axios.post("https://dummyjson.com/users/add", user);
};

export const editUserService = (id, user) => {
  return axios.put(`https://dummyjson.com/users/${id}`, user);
};

export const deleteUserService = (id) => {
  return axios.delete(`https://dummyjson.com/users/${id}`);
};
