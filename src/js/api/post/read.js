import axios from "axios";
import { API_SOCIAL_POSTS } from "../constants";
import { getHeaders } from "../headers";

export async function readPost(id) {
  const result = await axios.get(`${API_SOCIAL_POSTS}/${id}`, {
    headers: getHeaders(),
  });
  return result.data;
}

export async function readPosts(limit = 12, page = 1, tag) {
  const result = await axios.get(`${API_SOCIAL_POSTS}?_author=true`, {
    headers: getHeaders(),
  });
  return result.data;
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  const result = await axios.get(`${API_SOCIAL_POSTS}/${id}`, {
    header: getHeaders(),
  });
  return result.data;
}

export async function singlePost(id) {
  const result = await axios.get(`${API_SOCIAL_POSTS}/${id}?_author=true`, {
    headers: getHeaders(),
  });
  return result.data;
}
