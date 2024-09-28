import axios from "axios";
import { getHeaders } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";

export async function updatePost(id, { title, body, tags, media }) {
  const result = await axios.put(
    `${API_SOCIAL_POSTS}/${id}`,
    {
      title: title,
      body: body,
      tags: tags,
      media: media,
    },
    { headers: getHeaders() }
  );
  return result.data;
}
