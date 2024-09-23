import axios from "axios";
import { getHeaders } from "../headers";

export async function updatePost({ title, body, tags, media }) {
  const result = await axios.put(API_SOCIAL_POSTS, { headers: getHeaders() });
  return result.data;
}
