import axios from "axios";

export async function deletePost(id) {
  const result = await axios.delete(API_SOCIAL_POSTS, {
    id: id,
  });
  return result.data;
}
