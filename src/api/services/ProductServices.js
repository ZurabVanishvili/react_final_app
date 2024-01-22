import axios from "axios";

export const getProductService = (product) => {
  return axios.get(`https://dummyjson.com/products/category/${product}`);
};

export const addProductService = (product) => {
  return axios.post("https://dummyjson.com/products/add", product);
};

export const deleteProductService = (id) => {
  return axios.delete(`https://dummyjson.com/products/${id}`);
};

export const updateProductService = (id, product) => {
  return axios.put(`https://dummyjson.com/products/${id}`, product);
};
