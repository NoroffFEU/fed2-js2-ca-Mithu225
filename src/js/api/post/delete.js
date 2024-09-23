import axios from "axios";
import { getHeaders } from "../headers";

export async function deletePost(id) {
  const result = await axios.delete(
    API_SOCIAL_POSTS,
    {
      id: id,
    },
    { headers: getHeaders() }
  );
  return result.data;
}
