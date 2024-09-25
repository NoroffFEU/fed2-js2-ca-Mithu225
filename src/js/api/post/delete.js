import axios from "axios";
import { getHeaders } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";

export async function deletePost(id) {
  try {
    const result = await axios.delete(`${API_SOCIAL_POSTS}/${id}`, {
      headers: getHeaders(),
    });
    return result.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
