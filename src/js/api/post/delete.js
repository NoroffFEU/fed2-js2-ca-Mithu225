import axios from "axios";
import { getHeaders } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";

export async function deletePost(id) {
  try {
    await axios.delete(`${API_SOCIAL_POSTS}/${id}`, {
      headers: getHeaders(),
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
