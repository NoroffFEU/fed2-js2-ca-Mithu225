import axios from "axios";
import { API_SOCIAL_POSTS } from "../constants";
import { getHeaders } from "../headers";

export async function createPost({ title, body, tags, media }) {
  const result = await axios.post(
    API_SOCIAL_POSTS,
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
