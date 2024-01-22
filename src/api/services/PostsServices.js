import axios from "axios";

export const getPostsService = (skip = 0) => {
  return axios.get(`https://dummyjson.com/posts?limit=14&skip=${skip}&select`);
};
